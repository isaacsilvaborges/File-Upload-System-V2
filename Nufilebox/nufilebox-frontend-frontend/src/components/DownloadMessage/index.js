import React from 'react';
import './styles.css';

export default function DownloadMessage({func}) {
  return (
    <div className="download-message">
      <label className="download-label">
        <img src="/icons/download-icon.png" alt="Download Icon" className="download-icon" />
        Download
      </label>
    </div>
  );
}