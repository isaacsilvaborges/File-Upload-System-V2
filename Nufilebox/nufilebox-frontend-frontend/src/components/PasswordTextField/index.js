import React, { useState } from 'react';
import './styles.css';

export default function PasswordTextField({ password, onClickKey }) {

  const [isClicked, setIsClicked] = useState(false);

  const handleClickKey = () => {
    setIsClicked(true);
    onClickKey();
    
    setTimeout(() => {
      setIsClicked(false);
    }, 100);
  };

  return (
    <div className="password-text-field">
      <div className="password-input-wrapper">
        <img src="/icons/padlock-icon.png" alt="Padlock-icon" className="padlock-icon" />
        <img src="/icons/key.png" alt="Key-icon" className={`key-icon ${isClicked ? 'clicked' : ''}`} onClick={handleClickKey} />
        <input type="text" className="password-input" placeholder="Please, insert password" value={password} readOnly />
      </div>
    </div>
  );
}