import React from 'react';
import './styles.css';


export default function EncryptionMessage({func}) {

  return (
    <div className="encryption-message">
      <label className="encryption-label">
        <img src="/icons/encrypting-icon.png" alt="Encrypting Icon" className="encrypting-icon" />
        Encrypting and uploading.
      </label>
    </div>
  );

}