import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css';
import ErrorDialog from '../ErrorDialog';

function DownloadButton({ name, token, password, fileName }) {

  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleApi() {
    const validations = [
      { condition: !password, message: 'Please, fill in the password field.' }
    ];

    const validationError = validations.find(validation => validation.condition);
    if (validationError) {
      setErrorMessage(validationError.message);
      setErrorDialogOpen(true);
      return;
    }

    setButtonClicked(true);

    setTimeout(() => {
      setButtonClicked(false);
    }, 50);

    navigate('/decryptprocess', {
      state: {
        password: password, 
        token: token,
        fileName: fileName
      },
    });
  }

  const closeErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  return (
    <div>
      <button className={`button ${buttonClicked ? 'clicked' : ''}`} onClick={handleApi}>
        {name}
      </button>
      <ErrorDialog isOpen={errorDialogOpen} message={errorMessage} onClose={closeErrorDialog} />
    </div>
  );
}

export default DownloadButton;