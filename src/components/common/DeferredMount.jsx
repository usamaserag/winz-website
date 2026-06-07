import { useEffect, useState } from 'react';

/**
 * Mounts children after idle time or when near the viewport.
 * Keeps below-fold / non-critical UI out of the initial main-thread budget.
 */
const DeferredMount = ({
  children,
  idleTimeout = 2000,
  rootMargin = '200px',
  fallback = null,
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return undefined;

    let observer;
    let idleId;
    let timeoutId;

    const mount = () => setReady(true);

    if ('IntersectionObserver' in window) {
      const sentinel = document.createElement('div');
      sentinel.setAttribute('aria-hidden', 'true');
      sentinel.style.cssText = 'position:fixed;bottom:0;left:0;width:1px;height:1px;pointer-events:none;opacity:0';
      document.body.appendChild(sentinel);

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) mount();
        },
        { rootMargin }
      );
      observer.observe(sentinel);

      timeoutId = window.setTimeout(() => {
        observer?.disconnect();
        sentinel.remove();
      }, idleTimeout + 500);
    }

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(mount, { timeout: idleTimeout });
    } else {
      idleId = window.setTimeout(mount, idleTimeout);
    }

    return () => {
      if (observer) observer.disconnect();
      if (idleId) {
        if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
        else window.clearTimeout(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [ready, idleTimeout, rootMargin]);

  if (!ready) return fallback;
  return children;
};

export default DeferredMount;
