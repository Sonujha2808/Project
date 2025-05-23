

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from '../src/Component/UserContext'; // <-- Import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> {/* <-- Wrap App inside */}
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
