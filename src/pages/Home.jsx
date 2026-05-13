import Hero from '../components/home/Hero';
import { useTranslation } from 'react-i18next';
import { Truck, Ship, Clock, PackageCheck } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();

  const services = [
    { icon: <Truck size={32} />, title: t('services.local_shipping'), desc: "Fast and reliable inland transportation for your cargo." },
    { icon: <Ship size={32} />, title: t('services.international_cargo'), desc: "Global shipping solutions connecting continents seamlessly." },
    { icon: <Clock size={32} />, title: t('services.fast_delivery'), desc: "Express delivery for time-critical shipments." },
    { icon: <PackageCheck size={32} />, title: t('services.warehousing'), desc: "Secure and modern storage facilities for your inventory." },
  ];

  return (
    <div>
      <Hero />
      
      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary-500 font-bold tracking-wider uppercase text-sm mb-2">{t('services.title')}</h2>
            <h3 className="text-4xl font-black text-gray-900 mb-6">{t('services.subtitle')}</h3>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-300 group border border-gray-100">
                <div className="w-16 h-16 bg-primary-50 text-primary-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-black mb-2">15+</div>
              <div className="text-primary-100 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">50k</div>
              <div className="text-primary-100 font-medium">Delivered Packages</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">200</div>
              <div className="text-primary-100 font-medium">Countries Covered</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">99%</div>
              <div className="text-primary-100 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
