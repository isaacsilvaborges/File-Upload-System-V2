import React, { useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import './styles.css';

Modal.setAppElement('#root');

function YaraDialog({ isOpen, onClose, onCancel }) {

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose || onCancel} className="yara-dialog" overlayClassName="yara-dialog-overlay">
      <h2>PII detected</h2>
      <p>Proceed upload?</p>
      <button className="proceed-button" onClick={onClose}>Proceed</button>
      <button className="cancel-button" onClick={onCancel}>Cancel</button>
    </Modal>
  );
}

export default YaraDialog;
