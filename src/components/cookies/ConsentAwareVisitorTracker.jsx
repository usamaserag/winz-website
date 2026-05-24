import { useEffect, useRef } from 'react';
import { useCookieConsent } from '../../context/CookieContext';
import { trackVisitor } from '../../services/visitorService';

/**
 * Loads visitor analytics only when the user has granted analytics consent.
 */
const ConsentAwareVisitorTracker = () => {
  const { isReady, hasConsent } = useCookieConsent();
  const intervalRef = useRef(null);

  const analyticsAllowed = isReady && hasConsent('analytics');

  useEffect(() => {
    if (!analyticsAllowed) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const abortController = new AbortController();

    const executeTracking = async () => {
      try {
        await trackVisitor(abortController.signal);
      } catch (error) {
        console.warn(
          'Visitor tracking attempt failed. The process will auto-retry in the next cycle.',
          error
        );
      }
    };

    executeTracking();

    const INTERVAL_TIME = 3 * 60 * 1000;
    intervalRef.current = setInterval(executeTracking, INTERVAL_TIME);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      abortController.abort();
    };
  }, [analyticsAllowed]);

  return null;
};

export default ConsentAwareVisitorTracker;
