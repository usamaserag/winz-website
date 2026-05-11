import { useTranslation } from 'react-i18next';
import { Truck, Ship, Clock, PackageCheck, Plane, ShieldCheck } from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();

  const servicesList = [
    { icon: <Truck size={40} />, title: t('services.local_shipping'), desc: "End-to-end inland delivery networks ensuring fast ground transport." },
    { icon: <Ship size={40} />, title: t('services.international_cargo'), desc: "Ocean freight solutions customized for all cargo sizes." },
    { icon: <Plane size={40} />, title: "Air Freight", desc: "Premium air cargo services for urgent global shipments." },
    { icon: <Clock size={40} />, title: t('services.fast_delivery'), desc: "Express options for same-day or next-day logistics." },
    { icon: <PackageCheck size={40} />, title: t('services.warehousing'), desc: "Smart inventory management and secure storage." },
    { icon: <ShieldCheck size={40} />, title: "Customs Clearance", desc: "Expert handling of cross-border customs processes." },
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-6">{t('nav.services')}</h1>
          <p className="text-xl text-gray-600">{t('services.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-20 h-20 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
