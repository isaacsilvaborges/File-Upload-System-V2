import './styles.css';
import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import Box from '../../components/Box';
import AuthMessage from '../../components/AuthMessage';
import { withOktaAuth } from '@okta/okta-react'; 


function Authentication(props) {
  async function login() {
    await props.oktaAuth.signInWithRedirect();
  }

  login();

  return (
    <div>
      <Layout>
        <div className="background" />
        <div className="box-container-auth">
          <Box className="custom-box-background">
            <div className="center-content">
              <AuthMessage />
            </div>
          </Box>
        </div>
      </Layout>
    </div>
  );
};

export default withOktaAuth(Authentication);