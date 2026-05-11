import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-5xl font-black text-gray-900 mb-8">{t('nav.about')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              WINZ is a leading global logistics and transportation company. We specialize in providing lightning-fast, reliable, and secure delivery services worldwide.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to connect businesses across borders with seamless supply chain solutions, leveraging modern technology and a dedicated professional team.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop" 
              alt="About WINZ" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
