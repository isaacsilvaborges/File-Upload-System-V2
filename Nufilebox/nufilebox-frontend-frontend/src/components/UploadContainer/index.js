import React, { useState } from 'react';
import './styles.css';

export default function UploadContainer({ func }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      func(files[0]);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      func(file);
    }
  };

  return (
    <div
      className={`upload-container ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label htmlFor="fileInput" className="upload-label">
        <input
          type="file"
          id="fileInput"
          name="file"
          onChange={handleFileInputChange}
          className="upload-file"
        />
        <img src="/icons/upload-icon.png" alt="Upload Icon" className="upload-icon" />
        Drag & drop files
      </label>
    </div>
  );
}
