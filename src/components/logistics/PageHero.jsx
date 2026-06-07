import { lazy, Suspense } from 'react';
import LogisticsGridPattern from './LogisticsGridPattern';
import SectionBadge from './SectionBadge';

const EuropeRouteMap = lazy(() => import('./EuropeRouteMap'));

const sizeClasses = {
  full: 'min-h-screen pt-28 pb-20',
  medium: 'min-h-[50vh] pt-28 pb-16',
  compact: 'min-h-[45vh] pt-28 pb-16',
};

/**
 * Standard corporate hero for inner pages — static markup for immediate LCP.
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
    <Suspense fallback={null}>
      <EuropeRouteMap className="absolute inset-0 w-full h-full text-primary-400/30 opacity-40" />
    </Suspense>

    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
      {badge && <SectionBadge label={badge} variant={badgeVariant} />}

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">
              {highlight}
            </span>
          </>
        )}
      </h1>

      {description && (
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}

      {children && <div className="mt-8">{children}</div>}
    </div>
  </section>
);

export default PageHero;
