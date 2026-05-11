import { useTranslation } from 'react-i18next';
import { Search, Package } from 'lucide-react';

const Tracking = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-brand-100 text-brand-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={40} />
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">{t('nav.tracking')}</h1>
          <p className="text-xl text-gray-600">Enter your tracking number to get real-time updates on your shipment.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-brand-500/5 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="e.g. WNZ-123456789"
              className="flex-grow px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 outline-none text-lg transition-all"
            />
            <button className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
              <Search size={24} />
              Track Now
            </button>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-500">
            Need help? Contact our support team with your tracking number.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
