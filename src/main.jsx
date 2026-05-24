import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './translations/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-primary-200 border-t-primary-600 animate-spin" aria-hidden="true" />
        <p className="text-sm font-medium text-slate-600">Loading…</p>
      </div>
    }>
      <App />
    </Suspense>
  </React.StrictMode>,
);
