import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, FileCheck, BarChart3, AlertTriangle, ArrowUpRight, Check } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };

const features = [
  { icon: <ShieldCheck className="w-7 h-7 text-white" />, title: 'Dual-Use Controls', desc: 'Expert handling of dual-use goods regulations and licensing requirements.' },
  { icon: <FileCheck className="w-7 h-7 text-white" />, title: 'Preferential Origin', desc: 'Accurate preferential origin documentation to unlock trade agreement benefits.' },
  { icon: <Globe className="w-7 h-7 text-white" />, title: 'Pan-European Presence', desc: 'Comprehensive coverage across all EU member states and beyond.' },
  { icon: <BarChart3 className="w-7 h-7 text-white" />, title: 'Digital Infrastructure', desc: 'Advanced digital systems for real-time customs tracking and reporting.' },
];

const benefits = [
  'VAT proof-of-exit compliance guaranteed',
  'Zero documentation errors policy',
  'Preferred customs partner status at key EU ports',
  'Proactive regulatory change management',
  'Full audit trail for every export transaction',
  'Strategic advice on export licensing',
];

const Export = () => {
  usePageTitle('Export Customs Clearance');
  const { i18n } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden">
      
      {/* ── HERO (Centered Dark Mode) ── */}
      <section className="relative pt-40 pb-32 flex flex-col items-center justify-center text-center px-4 overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15)_0%,transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_80%,transparent_100%)]"></div>
        
        {/* Pulsing background orb */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-sky-500/20 blur-[120px] rounded-full pointer-events-none"
        ></motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 mx-auto bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl flex items-center justify-center mb-6 shadow-2xl hover:bg-gray-700/60 transition-colors"
            >
              <ArrowUpRight className="w-10 h-10 text-primary-400" />
            </motion.div>
            <span className="text-primary-400 font-semibold tracking-[0.2em] uppercase text-sm shadow-sm">Outbound Operations</span>
          </motion.div>

          <motion.h1 
            variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-5xl mb-8 drop-shadow-2xl"
          >
            Secure Your Global Reach with <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 drop-shadow-lg">Winz Logistics</span>
          </motion.h1>

          <motion.p 
            variants={fadeUp} 
            className="text-xl text-slate-300 max-w-2xl leading-relaxed font-light"
          >
            Empowering European businesses to export with absolute confidence and zero friction.
          </motion.p>
        </motion.div>
      </section>

      {/* ── RISK CALLOUT (Integrated as a full-width banner) ── */}
      <section className="border-y border-slate-800/50 bg-slate-900/40 backdrop-blur-md relative z-20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-amber-500/20">
               <AlertTriangle className="w-7 h-7 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            </div>
            <p className="text-slate-300 text-lg max-w-4xl leading-relaxed">
              <strong className="text-white font-semibold tracking-wide">The Cost of Non-Compliance:</strong> A minor documentation error can quickly escalate into stranded shipments. Choose Winz to ensure your cargo remains compliant and schedules stay on track.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURES (Reverse Split Layout) ── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Features Grid on Left */}
            <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div 
                  key={i} 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                  className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:bg-gray-800 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-5">
                    {f.icon}
                  </div>
                  <h3 className="text-white font-bold mb-2 text-lg">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Text on Right */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                The Path to Global Markets
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Every successful export is a milestone of growth. However, the path is often obstructed by a complex maze of dual-use controls, preferential origin requirements, and strict VAT proof-of-exit regulations.
              </p>
              <div className="w-16 h-1 bg-primary-500 rounded-full" />
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* ── BENEFITS (Bento Box / Masonry Style) ── */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Export With Certainty</h2>
            <p className="text-gray-500 text-lg">Why industry leaders trust Winz Logistics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[180px] max-w-6xl mx-auto">
            {benefits.map((b, i) => {
              // Bento Box Grid Logic
              let spanClass = "md:col-span-1 row-span-1";
              if (i === 0) spanClass = "md:col-span-2 row-span-1 bg-gradient-to-br from-slate-900 to-slate-950";
              else if (i === 1) spanClass = "md:col-span-1 row-span-2 bg-gradient-to-b from-slate-800/50 to-slate-900/50";
              else if (i === 4) spanClass = "md:col-span-2 row-span-1 bg-gradient-to-r from-slate-900 to-slate-800/50";

              return (
                <motion.div 
                  key={i} 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}
                  className={`bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-[2rem] flex flex-col justify-center hover:border-sky-500/40 hover:shadow-[0_0_30px_rgba(14,165,233,0.1)] transition-all duration-500 relative overflow-hidden group ${spanClass}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center mb-6 border border-sky-500/20 group-hover:scale-110 transition-transform duration-500">
                    <Check className="w-6 h-6 text-sky-400 drop-shadow-md" />
                  </div>
                  <h3 className="relative z-10 text-xl font-semibold text-slate-100 leading-relaxed">{b}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary-900/20"></div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 text-center px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Grow Without Borders</h2>
          <p className="text-xl text-gray-400">
            We provide the strategic expertise required to navigate shifting standards. Your cargo stays compliant, your schedules stay on track.
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default Export;
