import React from 'react';
import './styles.css';
export default function SuccessMessage({func}) {
  return (
    <div className="success-message">
      <label className="success-label">
        <img src="/icons/completion-icon.png" alt="Completion Icon" className="completion-icon" />
        Download link and password.
      </label>
    </div>
  );
}