import React from "react";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from "./routes/routes";
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';

const clientId = process.env.REACT_APP_CLIENT_ID;
const issuer = process.env.REACT_APP_ISSUER;

const oktaAuth = new OktaAuth({
  issuer: issuer,
  clientId: clientId,
  redirectUri: window.location.origin + '/login/callback',
});

function App() {
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    window.location.href = toRelativeUrl(originalUri || '/home', window.location.origin);
  }

  return (
    <BrowserRouter>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <AppRoutes />
      </Security>
    </BrowserRouter>
  );
}

export default App;