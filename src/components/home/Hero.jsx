import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } }
};

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <section className="relative min-h-[95vh] flex items-center bg-gray-900 overflow-hidden">
      
      {/* Background Image with Slow Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=2070&auto=format&fit=crop" 
            alt="Logistics Background" 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent z-10" dir="ltr" />
      </div>

      {/* Floating Animated Orbs & Planetary System */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        
        {/* Ambient background glows */}
        <motion.div 
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary-600/30 blur-[120px] rounded-full" 
        />
        
        <motion.div 
          animate={{ y: [0, 40, 0], x: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-600/20 blur-[100px] rounded-full" 
        />

        {/* ── Rotating Planetary System ── */}
        <div className="absolute right-[-10%] top-[10%] lg:right-[5%] lg:top-[15%] w-[800px] h-[800px] opacity-70">
          
          {/* Center Globe */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-tr from-primary-900 to-primary-500 blur-[2px] shadow-[0_0_80px_rgba(56,189,248,0.4)] border border-primary-400/30 flex items-center justify-center">
            {/* Inner Globe Grid pattern (simulated) */}
            <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]"></div>
          </div>
          
          {/* Orbit 1 (Fast, Inner) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-white/10"
          >
            {/* Planet 1 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_white]"></div>
          </motion.div>

          {/* Orbit 2 (Medium, Middle) */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-primary-500/20 border-dashed"
          >
            {/* Planet 2 */}
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary-400 shadow-[0_0_30px_rgba(56,189,248,0.8)]"></div>
            {/* Moon for Planet 2 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/80"></div>
            </motion.div>
          </motion.div>

          {/* Orbit 3 (Slow, Outer) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-white/5"
          >
            {/* Planet 3 */}
            <div className="absolute bottom-[14%] right-[14%] w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 shadow-[0_0_40px_rgba(99,102,241,0.6)]"></div>
          </motion.div>
          
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="max-w-3xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-block py-1.5 px-4 rounded-full bg-primary-500/10 text-primary-400 font-semibold text-sm mb-6 border border-primary-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                WINZ Logistics Solutions
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              {t('hero.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">
                {t('hero.highlight')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
              <Link to="/contact" className="group relative bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-primary-500/25 flex items-center gap-3 overflow-hidden">
                <span className="relative z-10">{t('hero.cta_primary')}</span>
                <ArrowRight className={`relative z-10 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} size={20} />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full"></div>
              </Link>
            </motion.div>
            
            {/* Trust Badges */}
            <motion.div variants={fadeUp} className="mt-16 flex items-center gap-6">
              <div className="flex -space-x-4 rtl:space-x-reverse">
                <motion.img whileHover={{ y: -5 }} className="w-12 h-12 rounded-full border-2 border-[#0f172a] shadow-lg relative z-30" src="https://i.pravatar.cc/100?img=1" alt="Client" />
                <motion.img whileHover={{ y: -5 }} className="w-12 h-12 rounded-full border-2 border-[#0f172a] shadow-lg relative z-20" src="https://i.pravatar.cc/100?img=2" alt="Client" />
                <motion.img whileHover={{ y: -5 }} className="w-12 h-12 rounded-full border-2 border-[#0f172a] shadow-lg relative z-10" src="https://i.pravatar.cc/100?img=3" alt="Client" />
                <motion.div whileHover={{ y: -5 }} className="w-12 h-12 rounded-full border-2 border-[#0f172a] bg-gray-800 flex items-center justify-center text-white text-xs font-bold shadow-lg relative z-0">+10k</motion.div>
              </div>
              <div className="text-gray-300 text-sm font-medium">
                Trusted by 10,000+ <br />businesses worldwide
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
