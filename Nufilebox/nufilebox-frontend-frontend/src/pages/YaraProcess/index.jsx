import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Box from '../../components/Box';
import FileNameField from '../../components/FileNameField';
import CancelUploadButton from '../../components/CancelUploadButton';
import ErrorDialog from '../../components/ErrorDialog';
import YaraDialog from '../../components/YaraDialog';
import EncryptionMessage from '../../components/EncryptionMessage';
import CryptionFileProgressBar from '../../components/CryptionFileProgressBar';
import { yaraCheck } from '../../services/api';
import { verifyFileType } from '../../services/yara';
import './styles.css';

export default function YaraProcess() {
  const location = useLocation();
  const { fileName, password, selectedFile, days, downloads, jwt } = location.state;
  const navigate = useNavigate();
  const [noPii, setnoPii] = useState(null);
  const [error, setError] = useState(null);
  const [yaraController, setYaraController] = useState(null);

  const handleCancelUpload = () => {
    if (yaraController) {
      yaraController.abort();
      navigate('/home', {
        state: {
          jwt: jwt,
        },
      });
    }
  };
  
  useEffect(() => {
    const yaraChecker = async () => {
      const controller = new AbortController();
      setYaraController(controller);
      try {

        const textFile = verifyFileType(selectedFile);
        
        if (textFile) {
            const noPii = await yaraCheck(selectedFile, controller);
            if (noPii) {
                setnoPii(true);
            }
            else {
            setnoPii(false);
            }
        }
        else {
            setnoPii(true);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Error checking yara rules on file:', error);
          setError("YARA FAILED");
        }
      } finally {
        setYaraController(null);
      }
    };
    yaraChecker();

    return () => {
      if (yaraController) {
        yaraController.abort();
      }
    }

  }, [selectedFile]);

  const handleCloseError = () => {
    setError(null);
    navigate(-1);
  };

  const handleCancelYara = () => {
    setnoPii(null);
    navigate(-1);
  };

  const handleProceedYara = () => {
    setnoPii(true);
  };

  useEffect(() => {
    if (noPii) {
    //Timestamp
    setnoPii(null);
    const timestamp = new Date().getTime();
    console.log('Timestamp inicio upload: ', timestamp);
    
        navigate('/encryptprocess', {
            state: {
              fileName: fileName,
              selectedFile: selectedFile,
              password: password,
              days: days,
              downloads: downloads,
              jwt: jwt,
            },
        });
    }
  }, [noPii, selectedFile, days, downloads, password, jwt, navigate]);

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
      {(noPii == false) && <YaraDialog isOpen={true} onClose={handleProceedYara} onCancel={handleCancelYara} />}
    </Layout>
  );
}