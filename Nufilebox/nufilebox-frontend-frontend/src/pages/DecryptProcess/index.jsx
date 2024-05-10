import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import Layout from '../../components/Layout';
import Box from '../../components/Box';
import DecryptionMessage from '../../components/DecryptionMessage';
import CryptionFileProgressBar from '../../components/CryptionFileProgressBar';
import CancelDownloadButton from '../../components/CancelDownloadButton';
import NewDownloadButton from '../../components/NewDownloadButton';
import ErrorDialog from '../../components/ErrorDialog';
import { downloadAndDecrypt, hashPassword } from '../../services/cryptography';
import { initMultipartDownload } from '../../services/api';

export default function DecryptProcess() {
  const [showCancel, setShowCancel] = useState(true);
  const [showNewDownload, setShowNewDownload] = useState(false);
  const location = useLocation();
  const { password, token, fileName } = location.state;
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [decryptionMessage, setDecryptionMessage] = useState("Decrypting your file.");
  const [downloadController, setDownloadController] = useState(null);
  const ERROR_MESSAGE = 'An error occurred. Please, try again.';

  const handleCancelDownload = () => {
    if (downloadController) {
      downloadController.abort();
      navigate(`/${token}`);
    }
  };

  useEffect(() => {
    const downloadAndDecryptFile = async () => {
      const controller = new AbortController();
      setDownloadController(controller);

      try {
        const fileHandle = await window.showSaveFilePicker({suggestedName: fileName});
        const outputStream = await fileHandle.createWritable();

        const pass = await hashPassword(password);

        const { presignedUrls, checksumParts } = await initMultipartDownload(token, pass, controller);
        await downloadAndDecrypt(presignedUrls, checksumParts, password, outputStream, controller, token);
        
        setShowCancel(false);
        setShowNewDownload(true);
        setDecryptionMessage("File saved successfully.");
      } catch (error) {
        if (!controller.signal.aborted) {
          console.log('Error downloading file:', error);
          setError(ERROR_MESSAGE);
        }
      } finally {
        setDownloadController(null);
      }
    };
    downloadAndDecryptFile();

    return () => {
      if (downloadController) {
        downloadController.abort();
      }
    }
  }, [token, password, fileName]);

  const handleCloseError = () => {
    setError(null);
    navigate(-1);
  };

  return (
    <Layout>
      <div className='box-container'>
        <Box>
          <DecryptionMessage message={decryptionMessage} />
          {showCancel && <CryptionFileProgressBar />}
          {showCancel && <CancelDownloadButton onCancel={handleCancelDownload} />}
          {showNewDownload && <NewDownloadButton name='NEW DOWNLOAD' token={token} />}
        </Box>
      </div>
      {error && <ErrorDialog isOpen={true} message={error} onClose={handleCloseError} />}
    </Layout>
  );
}