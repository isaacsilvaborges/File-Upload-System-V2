export async function initMultipartUpload(filename, password, days, downloads, partsNumber, jwt, controller) {
  try {
    const data = {
      "filename": filename,
      "password": password,
      "ttl": days,
      "max-downloads": downloads,
      "parts-number": partsNumber
    };
    
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}init-multipart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
  
    if (!response.ok) {
      if (response.status === 401) {
        const error = new Error('Unauthorized.');
        error.isUnauthorizedError = true;
        throw error;
      } else {
        throw new Error('Error uploading file.');
      }
    }
  
    const obj = await response.json();
    const fileId = obj['file-id'];
    const presignedUrls = obj['pre-signed-urls'];
      
    return { fileId, presignedUrls };
  } catch (error) {
    if (!controller.signal.aborted) {
      throw new Error('Error uploading file.');
    }
  }
}

export async function completeMultipartUpload(fileId, eTags, checksumParts, jwt, controller) {
  try {
    const data = {
      "file-id": fileId,
      "etags": eTags,
      "checksum-parts": checksumParts
    };

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}complete-multipart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    if (!response.ok) {
      if (response.status === 401) {
        const error = new Error('Unauthorized.');
        error.isUnauthorizedError = true;
        throw error;
      } else {
        throw new Error('Error uploading file.');
      }
    }

    const obj = await response.json();
    const link = obj['file-url'];

    return link;
  } catch (error) {
    if (!controller.signal.aborted) {
      throw new Error('Error uploading file.');
    }
  }
}

export async function putS3(url, data, controller) {
  try {
    const eTagResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      body: data,
      signal: controller.signal,
    });
  
    const eTag = eTagResponse.headers.get('ETag');
  
    return eTag;
  } catch (error) {
    if (!controller.signal.aborted) {
      throw new Error('Error uploading file.');
    }
  }
}

export async function initMultipartDownload(token, password, controller) {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}download/${token}`, {
      method: 'GET',
      headers: {
        'Authorization': password
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      if (response.status === 401) {
        const error = new Error('Wrong password.');
        error.isUnauthorizedError = true;

        throw error;
      } else {
        throw new Error('Error downloading file.');
      }
    }

    const obj = await response.json();
    const presignedUrls = obj['pre-signed-urls'];
    const checksumParts = obj['checksum-parts'];

    return { presignedUrls, checksumParts };
  } catch (error) {
    if (!controller.signal.aborted) {
      throw new Error('Error downloading file.');
    }
  }
}

export async function getS3(url, controller) {
  try {
    const chunkResponse = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
    });

    const encryptedChunk = chunkResponse.body;
  
    return encryptedChunk;
  } catch (error) {
    if (!controller.signal.aborted) {
      throw new Error('Error downloading file.');
    }
  }
}

export const getFileInfo = async (token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}info/${token}`, {
      method: 'GET',
    });

    if (response.status === 200) {
      const fileInfo = await response.json();
      const fileSize = fileInfo['file-size'];
      const fileName = fileInfo.filename;
      const remainingDownloads = fileInfo['remaining-downloads'];
      const daysToExpire = fileInfo['days-to-expire'];

      return {
        fileSize,
        fileName,
        remainingDownloads,
        daysToExpire
      };

    } else if (response.status === 404) {
      const error = new Error('File Not Found');
      error.isNotFoundError = true;
      throw error;
    } else {
      throw new Error('Error getting file info')
    }
  } catch (error) {
    throw error;
  }
};

export const corruptedSignal = async (token) => {
  try {
    const data = {
      "file-id": token,
      "corrupted-status": true
    }

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}corrupted-file`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw new Error('error sending corrupted signal')
  }
}

export const yaraCheck = async (file, controller) => {
  try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('label', 'nufile-scan');
      formData.append('user-id', '1');

      const response = await fetch(`${process.env.REACT_APP_YARA_URL}/scan?fast=true`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      const postCode = response.headers.get('location');
      const result = getYara(postCode, controller);

      return result;
    } catch (error) {
      if (!controller.signal.aborted) {
        throw error;
      }
    }
}

async function getYara(locationCode, controller) {
  try {
    const response = await fetch(`${process.env.REACT_APP_YARA_URL}${locationCode}`, {
      method: 'GET',
      signal: controller.signal,
    });

    const getResponse = await response.json();

    if (!getResponse || Object.keys(getResponse).length === 0) {
      return true;
    }
    else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};