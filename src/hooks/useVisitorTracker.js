import { useEffect, useRef } from "react";
import { trackVisitor } from "../services/visitorService";

/**
 * Custom React hook to periodically track the visitor.
 * 
 * - Triggers an immediate tracking request on mount.
 * - Sets up a safe interval to track every 3 minutes.
 * - Ensures no duplicate intervals are created.
 * - Properly cleans up on unmount or re-renders to prevent memory leaks.
 * - Catches failures gracefully, allowing future retries to continue automatically.
 */
export const useVisitorTracker = () => {
  const intervalRef = useRef(null);

  useEffect(() => {
    // Controller to abort active requests if the component unmounts
    const abortController = new AbortController();

    const executeTracking = async () => {
      try {
        await trackVisitor(abortController.signal);
      } catch (error) {
        // Safe logging - failures must not halt the interval
        console.warn(
          "Visitor tracking attempt failed. The process will auto-retry in the next cycle.",
          error
        );
      }
    };

    // 1. Start the tracking immediately after loading
    executeTracking();

    // 2. Set up the periodic interval (3 minutes = 180,000 ms)
    const INTERVAL_TIME = 3 * 60 * 1000;
    intervalRef.current = setInterval(executeTracking, INTERVAL_TIME);

    // 3. Cleanup to prevent memory leaks and duplicate intervals
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Abort any in-flight requests to avoid warnings on unmounted components
      abortController.abort();
    };
  }, []);
};
