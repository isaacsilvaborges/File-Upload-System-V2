import React, { useEffect, useCallback } from 'react';
import './styles.css';
import { useNavigate } from "react-router-dom";
import { withOktaAuth } from '@okta/okta-react'; 

function LogoutButton(props) {
  const navigate = useNavigate();

  const handleLogout = useCallback(async (event) => {
    await logout();
    if (!props.authState?.isAuthenticated) {
    navigate('/');
    }
  })

  async function logout() {
    await props.oktaAuth.signOut();
  }

  return (
    <button className='logout-button' onClick={() => handleLogout()}>
      sign out
      <img src='/icons/logout-icon.png' alt='logout-icon' className='logout-icon'/>
    </button>
  );
}

export default withOktaAuth(LogoutButton);