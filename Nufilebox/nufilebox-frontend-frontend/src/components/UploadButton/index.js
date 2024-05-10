import './styles.css';
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorDialog from '../ErrorDialog';

function UploadButton({ name, selectedFile, password, days, downloads, jwt }) {
  const navigate = useNavigate();
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const path = process.env.REACT_APP_YARA_MODE === 'true' ? '/yaraprocess' : '/encryptprocess';

  const handleApi = useCallback(() => {
    const validations = [
      { condition: !selectedFile, message: 'Please select a file to upload.' },
      { condition: !days, message: 'The days field cannot be empty.' },
      { condition: !downloads, message: 'The downloads field cannot be empty.' },
      { condition: days < 1 || days > 3, message: 'Invalid number of days to expire. (Minimum: 1, Maximum: 3)' },
      { condition: downloads < 1 || downloads > 99, message: 'Invalid number of downloads to expire. (Minimum: 1, Maximum: 99)' },
      { condition: !jwt, message: 'You must login first.'}
    ];

    const validationError = validations.find(validation => validation.condition);

    if (validationError) {
      setErrorMessage(validationError.message);
      setErrorDialogOpen(true);

      return;
    }
    
    const removeAccents = str =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const normalizedFileName = removeAccents(selectedFile.name);
    const intDays = parseInt(days);
    const intDownloads = parseInt(downloads);

    navigate(path, {
      state: {
        fileName: normalizedFileName,
        selectedFile: selectedFile,
        password: password,
        days: intDays,
        downloads: intDownloads,
        jwt: jwt,
      },
    });
  }, [selectedFile, days, downloads, password, jwt, navigate]);


  const closeErrorDialog = () => {
    setErrorDialogOpen(false);
    
    if (!jwt) {
      navigate('/');
    }
  };

  return (
    <div>
      <button className={'button'} onClick={handleApi}>
        {name}
      </button>
      <ErrorDialog isOpen={errorDialogOpen} message={errorMessage} onClose={closeErrorDialog} />
    </div>
  );
}

export default UploadButton;