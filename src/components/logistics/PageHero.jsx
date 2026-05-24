import { motion } from 'framer-motion';
import LogisticsGridPattern from './LogisticsGridPattern';
import EuropeRouteMap from './EuropeRouteMap';
import SectionBadge from './SectionBadge';
import { fadeUp, staggerContainer } from './motionVariants';

const sizeClasses = {
  full: 'min-h-screen pt-28 pb-20',
  medium: 'min-h-[50vh] pt-28 pb-16',
  compact: 'min-h-[45vh] pt-28 pb-16',
};

/**
 * Standard corporate hero for inner pages.
 */
const PageHero = ({
  badge,
  title,
  highlight,
  description,
  size = 'full',
  children,
  className = '',
  badgeVariant = 'dark',
}) => (
  <section
    className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 ${sizeClasses[size]} ${className}`}
  >
    <LogisticsGridPattern variant="dark" />
    <EuropeRouteMap className="absolute inset-0 w-full h-full text-primary-400/30 opacity-40" />

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
    >
      {badge && (
        <motion.div variants={fadeUp}>
          <SectionBadge label={badge} variant={badgeVariant} />
        </motion.div>
      )}

      <motion.h1
        variants={fadeUp}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
      >
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">
              {highlight}
            </span>
          </>
        )}
      </motion.h1>

      {description && (
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}

      {children && (
        <motion.div variants={fadeUp} className="mt-8">
          {children}
        </motion.div>
      )}
    </motion.div>
  </section>
);

export default PageHero;
