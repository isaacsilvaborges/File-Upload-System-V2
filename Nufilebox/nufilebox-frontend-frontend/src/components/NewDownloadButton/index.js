import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function NewDownloadButton({ name, token }) {
  const navigate = useNavigate();

  const handleNewDownload = async () => {
    try {
      navigate(`/${token}`);
    } catch (error) {
      console.error('Error going to a new download:', error);
    }
  };

  return (
    <button className="new-download-button" onClick={handleNewDownload}>
      {name}
    </button>
  );
}

export default NewDownloadButton;