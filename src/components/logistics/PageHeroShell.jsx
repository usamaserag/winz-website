import { lazy, Suspense } from 'react';
import LogisticsGridPattern from './LogisticsGridPattern';

const EuropeRouteMap = lazy(() => import('./EuropeRouteMap'));

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
    <Suspense fallback={null}>
      <EuropeRouteMap className="absolute inset-0 w-full h-full text-primary-400/30 opacity-35 pointer-events-none" />
    </Suspense>
    <div className="relative z-10 w-full">{children}</div>
  </section>
);

export default PageHeroShell;
