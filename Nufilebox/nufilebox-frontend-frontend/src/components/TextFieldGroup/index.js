import React from 'react';
import './styles.css';

export default function TextFieldGroup({ days, downloads, onChangeDays, onChangeDownloads }) {
  const handleInputChange = (event) => {
    event.target.value = event.target.value.replace(/\D/g, '');
  };

  return (
    <div className="text-field-group">
      <label className="text-field-label">Expires in</label>
      <div className="text-field">
        <div className="text-input-wrapper">
          <input type="text" className="text-input" value={days} onChange={onChangeDays} onInput={handleInputChange}/>
        </div>
      </div>
      <label className="text-field-label">days or</label>
      <div className="text-field">
        <div className="text-input-wrapper">
          <input type="text" className="text-input" value={downloads} onChange={onChangeDownloads} onInput={handleInputChange}/>
        </div>
      </div>
      <label className="text-field-label">downloads</label>
    </div>
  );
}