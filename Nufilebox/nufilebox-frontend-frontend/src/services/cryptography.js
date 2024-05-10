import { putS3, getS3, corruptedSignal } from './api';

const IV_LENGTH = 16;
const CHUNK_SIZE = parseInt(process.env.REACT_APP_CHUNK_SIZE) * 1024 * 1024;
const SALT = process.env.REACT_APP_THE_SALT;

export function calculateChunksNumber(filesize) {
    return Math.ceil(filesize / CHUNK_SIZE);
}

export async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
} 

export async function encryptAndUpload(file, password, fileName, presignedUrls, controller) {
    const inputStream = file.stream();
    const fileType = file.type;
    const key = await getKey(password, SALT);
    const eTagsAndChecksums = await encryptAndUploadStream(inputStream, key, fileName, fileType, presignedUrls, controller);
    
    return eTagsAndChecksums;
}

export async function downloadAndDecrypt(presignedUrls, checksums, password, outputStream, controller, token) {
    const key = await getKey(password, SALT);

    await downloadAndDecryptStream(presignedUrls, checksums, key, outputStream, controller, token);
}

async function encryptAndUploadStream(inputStream, key, fileName, fileType, presignedUrls, controller) {
    let eTags = [];
    let checksums = [];
    let chunksPair = [];
    let count = 0;

    await inputStream
        .pipeThrough(ChunkSizeTransformStream(CHUNK_SIZE))
        .pipeThrough(CalculateChecksumTransformStream(checksums))
        .pipeThrough(EncryptTransformStream(key, IV_LENGTH))
        .pipeTo(new WritableStream({
            write(chunk) {
                chunksPair.push(chunk);

                if (chunksPair.length % 2 === 0) {
                    const encryptedChunkFile = new File(chunksPair, `${fileName}-${count}`, { type: fileType });
                    const eTag = putS3(presignedUrls[count], encryptedChunkFile, controller);
                    eTags.push(eTag);
                    chunksPair = [];
                    count++;
                }
            }
        }));

    const resolvedETags = await Promise.all(eTags);
    
    const eTagsAndChecksums = [resolvedETags, checksums];

    return eTagsAndChecksums;
}

async function downloadAndDecryptStream(presignedUrls, checksums, key, outputStream, controller, token) {
    const chunksNumber = parseInt(process.env.REACT_APP_CHUNKS_NUMBER);
    const iterations = Math.ceil(presignedUrls.length / chunksNumber);

    let chunkIndex = 0;

    for (let i = 0; i < iterations; i++) {
        const startIndex = i * chunksNumber;
        const endIndex = Math.min((i + 1) * chunksNumber, presignedUrls.length);

        const partialPresignedUrls = presignedUrls.slice(startIndex, endIndex); 

        const encryptedChunks = await Promise.all(
            partialPresignedUrls.map(async (partialPresigned) => {
                return await getS3(partialPresigned, controller);   
            })
        );

        for (const encryptedChunk of encryptedChunks) {
            await encryptedChunk
                .pipeThrough(ChunkSizeTransformStream(IV_LENGTH + CHUNK_SIZE + 16))
                .pipeThrough(DecryptTransformStream(key, IV_LENGTH))
                .pipeThrough(CalculateChecksumDecryptedTransformStream(checksums, chunkIndex, token))
                .pipeTo(outputStream, { preventClose: true });
            chunkIndex++;        
        }
    }

    await outputStream.close();
}

function ChunkSizeTransformStream(bufferSize) {
    let internalBuffer;
    let currentBufferIndex;

    return new TransformStream({
        start() {
            internalBuffer = new Uint8Array(bufferSize);
            currentBufferIndex = 0;
        },
        async transform(chunk, controller) {
            if (chunk == null) {
                console.warn("Null chunk");
                if (currentBufferIndex > 0) {
                    console.log("enqueuing internal buffer");
                    controller.enqueue(internalBuffer.slice(0, currentBufferIndex));
                    currentBufferIndex = 0;
                }
                controller.terminate();
            }
            let chunkPosition = 0;

            while (chunkPosition < chunk.byteLength) {
                const pendingChunkSize = chunk.byteLength - chunkPosition;
                const bufferFreeSpace = bufferSize - currentBufferIndex;
                const sliceSize = Math.min(bufferFreeSpace, pendingChunkSize);
                internalBuffer.set(chunk.slice(chunkPosition, chunkPosition + sliceSize), currentBufferIndex);
                chunkPosition += sliceSize;
                currentBufferIndex += sliceSize;

                if (currentBufferIndex === bufferSize) {
                    const submitBuffer = new Uint8Array(internalBuffer);
                    controller.enqueue(submitBuffer);
                    currentBufferIndex = 0;
                }
            }
        },
        flush(controller) {
            if (currentBufferIndex > 0) {
                controller.enqueue(internalBuffer.slice(0, currentBufferIndex));
                currentBufferIndex = 0;
            }
        }
    });
}

 function CalculateChecksumTransformStream(checksums) {
    return new TransformStream({
      async transform(chunk, controller) {
        const buffer = chunk.buffer;
        const digest = await crypto.subtle.digest('SHA-512', buffer);
        const checksum = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
        checksums.push(checksum);
        controller.enqueue(chunk);
      }
    });
  }

  function CalculateChecksumDecryptedTransformStream(checksums, chunkIndex, token) {
    return new TransformStream({
      async transform(chunk, controller) {
        const checksumValue = checksums[chunkIndex];
        const digest = await crypto.subtle.digest('SHA-512', chunk);
        const checksum = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
        if (checksumValue == checksum) {
            controller.enqueue(chunk);
        }
        else {
            await corruptedSignal(token);
            throw new Error('checksums do not match.');
        }
      }
    });
  }
  
function EncryptTransformStream(key, ivLength) {
    return new TransformStream({
        start() { },
        async transform(chunk, controller) {
            if (chunk == null) {
                controller.terminate();
                console.warn("null chunk");
            }
            const iv = window.crypto.getRandomValues(new Uint8Array(ivLength)); 
            const ciphertext = await window.crypto.subtle.encrypt(
                {
                    name: "AES-GCM",
                    iv: iv
                },
                key,
                chunk
            );
            controller.enqueue(iv);  
            controller.enqueue(ciphertext);
        },
        flush() { }
    });
}

function DecryptTransformStream(key, ivLength) {
    return new TransformStream({
        start() { },
        async transform(chunk, controller) {
            const iv = chunk.slice(0, ivLength);
            const ciphertext = chunk.slice(ivLength, chunk.byteLength);
            await window.crypto.subtle.decrypt(
                {
                    name: 'AES-GCM',
                    iv: iv
                },
                key,
                ciphertext
            ).then((val) => {
                controller.enqueue(val)
            })
        },
        flush() { }
    });
}

async function getKey(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
    );

    return await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: enc.encode(salt),
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"],
    );
}