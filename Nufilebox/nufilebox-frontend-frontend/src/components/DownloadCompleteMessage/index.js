import React from 'react';
import './styles.css';


export default function DownloadCompleteMessage({func}) {

  return (
    <div className="download-complete-message">
      <label className="download-complete-label">
        <img src="/icons/info-icon.png" alt="Info Icon" className="info-icon" />
        This file it's not available anymore or it doesn't exist.
      </label>
    </div>
  );

}