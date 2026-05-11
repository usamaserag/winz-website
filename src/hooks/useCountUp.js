import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animates a number from 0 to `target` over `duration` ms
 * when the returned `ref` enters the viewport.
 *
 * @param {number} target   – final number value
 * @param {number} duration – animation duration in ms (default 1800)
 * @returns {{ ref, display: string }}
 */
const useCountUp = (target, duration = 1800) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const startValue = 0;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startValue + eased * (target - startValue)));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return { ref, count };
};

export default useCountUp;
