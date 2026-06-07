/**
 * Lightweight full-page loader shown while lazy routes or i18n namespaces load.
 */
const PageLoader = () => (
  <div
    className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-slate-50 py-24"
    role="status"
    aria-live="polite"
    aria-label="Loading page"
  >
    <div
      className="h-10 w-10 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600"
      aria-hidden="true"
    />
  </div>
);

export default PageLoader;
