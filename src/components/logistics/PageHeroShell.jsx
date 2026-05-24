import { motion } from 'framer-motion';
import LogisticsGridPattern from './LogisticsGridPattern';
import EuropeRouteMap from './EuropeRouteMap';

const sizeClasses = {
  full: 'min-h-screen pt-28 pb-20',
  medium: 'min-h-[50vh] pt-28 pb-16',
  compact: 'min-h-[45vh] pt-28 pb-16',
};

/**
 * Background shell for pages that need custom hero content (e.g. tracking search).
 */
const PageHeroShell = ({
  size = 'full',
  children,
  className = '',
  centered = true,
}) => (
  <section
    className={`relative flex flex-col overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 ${sizeClasses[size]} ${centered ? 'items-center justify-center' : ''} ${className}`}
  >
    <LogisticsGridPattern variant="dark" />
    <EuropeRouteMap className="absolute inset-0 w-full h-full text-primary-400/30 opacity-35 pointer-events-none" />
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 w-full"
    >
      {children}
    </motion.div>
  </section>
);

export default PageHeroShell;
