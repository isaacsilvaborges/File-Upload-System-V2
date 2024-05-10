import React , {useState} from 'react';
import './styles.css';
import ClipboardJS from 'clipboard';

export default function PasswordToCopy( { password } ) {

  const [copied, setCopied] = useState(false);

  function handleCopyPassword(e) {
    const clipboard = new ClipboardJS('.copy-button', {
      text: () => password
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
    <div className="password-to-copy">
      <div className="password-input-wrapper">
        <img src="/icons/padlock-icon.png" alt="Padlock-icon" className="padlock-icon" />
        <img src="/icons/copy-icon.png" alt="Copy-icon" className={`copy-icon ${copied? 'clicked' : ''}`}
 onClick = {handleCopyPassword}/>
        <input type="text" className="password" value={password} readOnly />
      </div>
    </div>
  );
}