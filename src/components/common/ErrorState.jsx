import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function ErrorState({ title, description, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white border border-red-100 rounded-3xl shadow-sm">
      <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title || 'Something went wrong'}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{description || 'We encountered an error while fetching the data. Please try again.'}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-semibold transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
}
