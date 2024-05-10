import React from 'react';
import './styles.css';

function CancelUploadButton({ onCancel }) {

  return (
    <button
      className="cancel-upload-button"
      onClick={onCancel}
    >
      CANCEL
    </button>
  );
}

export default CancelUploadButton;