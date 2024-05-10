import React from 'react';
import './styles.css';

export default function FileNameField({ fileName, fileSize, onDeleteFile, showDeleteIcon }) {
  
  function handleDeleteFile() {
    onDeleteFile();
  }

  function formatFileSize(bytes) {
    if (bytes === 0) {
      return '0 bytes';
    }
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  const formattedFileSize = formatFileSize(fileSize);
  
  return (
    <div className="file-name-field">
      <div className="file-display-wrapper">
        <img src="/icons/file-icon.png" alt="File-icon" className="file-icon" />
        { showDeleteIcon && (
          <img src="/icons/trash-icon.png" alt="Trash-icon" className="trash-icon" onClick={handleDeleteFile} />
        )}
        <div className="file-details">
          <input type="text" className="file-name" value={fileName} readOnly />
          <div className="file-size" style={{paddingLeft: '8.3%'}}>{formattedFileSize}</div>
        </div>
      </div>
    </div>
  );
}