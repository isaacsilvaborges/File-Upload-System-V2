import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Box from '../../components/Box';
import FileNameField from '../../components/FileNameField';
import CancelUploadButton from '../../components/CancelUploadButton';
import ErrorDialog from '../../components/ErrorDialog';
import EncryptionMessage from '../../components/EncryptionMessage';
import CryptionFileProgressBar from '../../components/CryptionFileProgressBar';
import { encryptAndUpload, hashPassword, calculateChunksNumber } from '../../services/cryptography';
import { initMultipartUpload, completeMultipartUpload } from '../../services/api';
import './styles.css';

export default function EncryptProcess() {
  const location = useLocation();
  const { fileName, password, selectedFile, days, downloads, jwt } = location.state;
  const navigate = useNavigate();
  const [link, setLink] = useState(null);
  const [error, setError] = useState(null);
  const [uploadController, setUploadController] = useState(null);
  const ERROR_MESSAGE = 'An error occurred. Please, try again.';

  const handleCancelUpload = () => {
    if (uploadController) {
      uploadController.abort();
      navigate('/home', {
        state: {
          jwt: jwt,
        },
      });
    }
  };

  useEffect(() => {
    const encryptAndUploadFile = async () => {
      const controller = new AbortController();
      setUploadController(controller);

      try {
        const chunksNumber = calculateChunksNumber(selectedFile.size);
        const pass = await hashPassword(password);

        const { fileId, presignedUrls } = await initMultipartUpload(fileName, pass, days, downloads, chunksNumber, jwt, controller);
        const eTagsAndChecksums = await encryptAndUpload(selectedFile, password, fileName, presignedUrls, controller);
        
        const eTags = eTagsAndChecksums[0];
        const checksumParts = eTagsAndChecksums[1];
    
        const fileUrl = await completeMultipartUpload(fileId, eTags, checksumParts, jwt, controller);

        setLink(fileUrl);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.log('Error uploading file:', error);
          setError(ERROR_MESSAGE);
        }
      } finally {
        setUploadController(null);
      }
    };
    encryptAndUploadFile();

    return () => {
      if (uploadController) {
        uploadController.abort();
      }
    }
  }, [password, selectedFile, fileName, days, downloads, jwt]);

  useEffect(() => {
    if (link != null) {
      navigate('/uploadcomplete', {
        state: {
          jwt: jwt,
          password: password,
          link: link
        },
      });
    }
  }, [link, navigate, password, jwt]);

  const handleCloseError = () => {
    setError(null);
    navigate('/home');
  };

  return (
    <Layout>
      <div className='box-container'>
        <Box>
          <EncryptionMessage />
          <FileNameField fileName={selectedFile.name} fileSize={selectedFile.size} />
          <CryptionFileProgressBar />
          <CancelUploadButton onCancel={handleCancelUpload} />
        </Box>
      </div>
      {error && <ErrorDialog isOpen={true} message={error} onClose={handleCloseError} />}
    </Layout>
  );
}