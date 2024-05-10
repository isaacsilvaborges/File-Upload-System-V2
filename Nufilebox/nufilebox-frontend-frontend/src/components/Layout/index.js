import React from 'react'
import './styles.css'
import Header from '../Header'

export default function Layout({children}) {
  return (
    <div className="Layout">
      <Header/>
      {children} 
      <img src='/images/ComputacaoUfcg.png' alt='Ufcg' className='ComputacaoUfcg'/>
    </div>
  )
}
