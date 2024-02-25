import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/userContext';
import { PageDataProvider } from './context/pageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PageDataProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PageDataProvider>
  </React.StrictMode>
);

reportWebVitals();
