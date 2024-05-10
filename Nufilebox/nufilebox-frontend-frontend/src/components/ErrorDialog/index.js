import React, { useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import './styles.css';

Modal.setAppElement('#root');

function ErrorDialog({ isOpen, message, onClose }) {

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="error-dialog" overlayClassName="error-dialog-overlay">
      <h2>Error</h2>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
}

export default ErrorDialog;
