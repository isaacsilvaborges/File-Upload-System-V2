import React, { useEffect, useCallback } from 'react';
import './styles.css';
import { useNavigate } from "react-router-dom";

function HomeButton({ name, jwt }) {
  const navigate = useNavigate();

  const navigateHome = useCallback(() => {
    navigate('/home', {
      state: {
        jwt: jwt,
      },
    });
  }, [navigate, jwt]);

  return (
    <button
      className="home-button"
      onClick={navigateHome}
    >
      {name}
    </button>
  );
}

export default HomeButton;