import './styles.css';
import React from 'react';

export default function DownloadFiles({ fileSize, daysToExpire, downloadsToExpire }) {

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
        <div className="download-file">
            <div className="file-display-wrapper">
                <img src="/icons/file-icon.png" alt="File-icon" className="file-icon" />
                <div className="file-details">
                    <div className="download-expire"> {daysToExpire} days or {downloadsToExpire} downloads to expire </div>
                    <div className="file-size"> {formattedFileSize}</div>
                </div>
            </div>
        </div>
    );
}