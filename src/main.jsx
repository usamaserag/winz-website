import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import PageLoader from './components/common/PageLoader';
import './fonts.css';
import './index.css';
import './translations/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
