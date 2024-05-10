import React, {useState} from 'react';
import './styles.css'
import ClipboardJS from 'clipboard';


export default function LinkToCopy({ link }) {

  const [copied, setCopied] = useState(false);

  function handleCopyLink(e) {
    const clipboard = new ClipboardJS('.copy-button', {
      text: () => link
    });
  
    clipboard.on('success', () => {
      setCopied(true);
  
      setTimeout(() => {
        setCopied(false);
      }, 300);
    });
  
    clipboard.on('error', () => {
      // Handle error if copying fails
    });
  
    clipboard.onClick(e);
  }

  return (
    <div className="link-to-copy">
      <div className="link-wrapper">
        <img src="/icons/link-icon.png" alt="Link-icon" className="link-icon" />
        <img src="/icons/copy-icon.png" alt="Copy-icon" className={`copy-icon ${copied ? 'clicked' : ''}`} onClick = {handleCopyLink} />
        <input type="text" className="link" value={link} readOnly />
      </div>
    </div>
  );
}