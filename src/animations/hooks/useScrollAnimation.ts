// src/animations/hooks/useScrollAnimation.ts
// 🎯 Hook برای انیمیشن‌های Scroll-based

import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number; // چقدر از element باید دیده بشه (0-1)
  triggerOnce?: boolean; // فقط یکبار اجرا بشه؟
  rootMargin?: string; // فاصله از viewport
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px 0px -100px 0px',
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
    margin: rootMargin as any,
  });

  return { ref, isInView };
}

// 🎨 Hook با callback
export function useScrollAnimationCallback(
  callback: () => void,
  options: UseScrollAnimationOptions = {}
) {
  const { ref, isInView } = useScrollAnimation(options);

  useEffect(() => {
    if (isInView) {
      callback();
    }
  }, [isInView, callback]);

  return ref;
}

// 📊 Hook برای multiple elements با stagger effect
export function useStaggeredAnimation(count: number) {
  // ایجاد آرایه با سایز مشخص و مقداردهی اولیه
  const refs = useRef<(HTMLElement | null)[]>(
    new Array(count).fill(null)
  );
  
  const setRef = (index: number) => (el: HTMLElement | null) => {
    if (index >= 0 && index < count) {
      refs.current[index] = el;
    }
  };

  return { refs: refs.current, setRef };
}