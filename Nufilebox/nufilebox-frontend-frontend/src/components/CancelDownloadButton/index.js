import React from 'react';
import './styles.css';

function CancelDownloadButton({ onCancel }) {

  return (
    <button className="cancel-download-button" onClick={onCancel}>
      CANCEL
    </button>
  );

}

export default CancelDownloadButton;