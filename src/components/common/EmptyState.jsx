import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function EmptyState({ title, description, icon: Icon = HelpCircle }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white border border-gray-100 rounded-3xl shadow-sm">
      <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-sm">{description}</p>}
    </div>
  );
}
