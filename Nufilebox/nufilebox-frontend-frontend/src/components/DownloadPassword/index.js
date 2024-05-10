import React from 'react';
import './styles.css';

export default function DownloadPassword({ value, onChange, clearPassword }) {

  return (
    <div className="download-password">
      <div className="password-input-wrapper">
        <img src="/icons/padlock-icon.png" alt="Padlock-icon" className="padlock-icon" />
        <input type="text" className="password-input" placeholder="Please, insert password" value={value} 
        onChange={onChange}/>
      </div>
    </div>
  );
}