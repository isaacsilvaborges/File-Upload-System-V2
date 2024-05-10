import React from 'react';
import './styles.css';

export default function Box({children}) {
  return (
    <div className='box'>
      {children}
    </div>
  );
}