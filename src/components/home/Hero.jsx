import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Play, PackageSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gray-50 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent z-10" dir="ltr" />
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=2070&auto=format&fit=crop" 
          alt="Logistics Background" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-500/20 text-primary-400 font-semibold text-sm mb-6 border border-primary-500/30 backdrop-blur-sm">
              WINZ Logistics Solutions
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              {t('hero.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                {t('hero.highlight')}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link to="/contact" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-primary-500/30 flex items-center gap-2">
                {t('hero.cta_primary')}
                <ArrowRight className={isRtl ? 'rotate-180' : ''} size={20} />
              </Link>
              
              <Link to="/tracking" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2">
                <PackageSearch size={20} />
                {t('hero.cta_secondary')}
              </Link>
            </div>
            
            <div className="mt-16 flex items-center gap-6">
              <div className="flex -space-x-4 rtl:space-x-reverse">
                <img className="w-12 h-12 rounded-full border-2 border-gray-900" src="https://i.pravatar.cc/100?img=1" alt="Client" />
                <img className="w-12 h-12 rounded-full border-2 border-gray-900" src="https://i.pravatar.cc/100?img=2" alt="Client" />
                <img className="w-12 h-12 rounded-full border-2 border-gray-900" src="https://i.pravatar.cc/100?img=3" alt="Client" />
                <div className="w-12 h-12 rounded-full border-2 border-gray-900 bg-gray-800 flex items-center justify-center text-white text-xs font-bold">+10k</div>
              </div>
              <div className="text-gray-300 text-sm font-medium">
                Trusted by 10,000+ <br />businesses worldwide
              </div>
            </div>

          </motion.div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-primary-500/20 to-transparent blur-3xl rounded-tl-[100%] pointer-events-none" />
    </section>
  );
};

export default Hero;
