import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number; // in milliseconds
}

export function useCountUp({ start = 0, end, duration = 2000 }: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    setCount(start); // Reset count if start changes

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const progress = (currentTime - startTimeRef.current) / duration;
      const easedProgress = Math.min(1, progress); // Ensure it doesn't go over 1

      const currentCount = start + (end - start) * easedProgress;
      setCount(Math.floor(currentCount));

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure the final value is exactly 'end'
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [start, end, duration]);

  return count;
}