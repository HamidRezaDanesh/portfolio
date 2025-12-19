// src/animations/hooks/useCounter.ts
// 🔢 Hook برای انیمیشن شمارنده‌های عددی

import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number; // به میلی‌ثانیه
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string; // برای جدا کردن هزارگان (مثل: 1,000)
  triggerOnView?: boolean;
}

export function useCounter({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = '',
  triggerOnView = true,
}: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if ((triggerOnView && isInView && !hasStarted) || (!triggerOnView && !hasStarted)) {
      setHasStarted(true);
      
      const startTime = Date.now();
      const startValue = start;
      const endValue = end;
      const difference = endValue - startValue;

      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (easeOutQuart)
        const easeOut = 1 - Math.pow(1 - progress, 4);
        
        const currentValue = startValue + difference * easeOut;
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, triggerOnView, hasStarted, start, end, duration]);

  // Format the number
  const formattedCount = formatNumber(count, decimals, separator);
  const displayValue = `${prefix}${formattedCount}${suffix}`;

  return { ref, count, displayValue };
}

// Helper function to format numbers
function formatNumber(num: number, decimals: number, separator: string): string {
  const fixed = num.toFixed(decimals);
  
  if (!separator) return fixed;

  const parts = fixed.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  
  return parts[1] ? `${integerPart}.${parts[1]}` : integerPart;
}

// 🎯 پریست‌های آماده
export const counterPresets = {
  // برای درصدها
  percentage: (value: number) => ({
    end: value,
    suffix: '%',
    decimals: 0,
    duration: 2000,
  }),

  // برای پول (یورو)
  currency: (value: number) => ({
    end: value,
    prefix: '€',
    decimals: 0,
    separator: ',',
    duration: 2500,
  }),

  // برای تعداد سال‌ها
  years: (value: number) => ({
    end: value,
    suffix: '+',
    decimals: 0,
    duration: 1500,
  }),

  // برای تعداد (با separator)
  count: (value: number) => ({
    end: value,
    separator: ',',
    decimals: 0,
    duration: 2000,
  }),

  // سریع (برای اعداد کوچک)
  fast: (value: number) => ({
    end: value,
    duration: 1000,
    decimals: 0,
  }),
};