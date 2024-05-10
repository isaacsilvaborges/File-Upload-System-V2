import React from 'react';
import './styles.css';

export default function DecryptionMessage({ message }) {
  return (
    <div className="decryption-message">
      <label className="decryption-label">
        <img src="/icons/decrypting-icon.png" alt="Decrypting Icon" className="decrypting-icon" />
        {message}
      </label>
    </div>
  );
}