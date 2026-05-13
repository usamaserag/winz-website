import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-6">{t('nav.contact')}</h1>
          <p className="text-xl text-gray-600">We're here to help and answer any question you might have.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Info */}
          <div className="md:col-span-1 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Headquarters</h4>
                <p className="text-gray-600">123 Logistics St<br/>Global City, GC 10000</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Phone</h4>
                <p className="text-gray-600" dir="ltr">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Email</h4>
                <p className="text-gray-600">info@winz-logistics.com</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea rows="5" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"></textarea>
              </div>
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg w-full transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
