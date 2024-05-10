import React from 'react';
import './style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import { withOktaAuth } from '@okta/okta-react'; 

function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState } = props;
  let logged = false;
  let userName = '';

  const authPath = location.pathname=='/';

  if (authState?.isAuthenticated) {
    logged = true;
    userName = authState.idToken.claims.name.split(" ", 1)[0];
  }

  return (
    <div className='header-container'>
      <header className='NuCoperation'>
        <img src='/images/NuFuturo.png' alt='NuFuturo' />
      </header>
      <header className='NuFileBox'>
        <img src='/images/NuFileBox.png' alt='NuFileBox' onClick={() => navigate('/')} />
      </header>
      {!authPath && logged && <header className='info-user'>
        <span className='logged-user'>{userName}</span>
        <LogoutButton />
      </header>}
    </div>
  )
}

export default withOktaAuth(Header);