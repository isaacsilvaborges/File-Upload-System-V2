import React from 'react';
import './styles.css';

export default function AuthMessage() {
  return (
    <div className="auth-message">
      <label className="login-label">
        <img className="NuFuturoLogo" src='../../images/logo.png' alt='NuFuturoLogo' />
        <span className="welcome-text">Welcome!</span>
        <span className="authentication-text">Signing in NuFileBox...</span>
        <span className="circular-progress"></span>
      </label>
    </div>
  );
}