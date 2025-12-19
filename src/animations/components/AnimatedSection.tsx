// src/animations/components/AnimatedSection.tsx
// 📦 کامپوننت Wrapper برای Scroll Animations

import { m, type Variants } from '@/components/motion/LazyMotion';
import { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import * as variants from '../config/variants';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: keyof typeof variants;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  custom?: any; // برای custom variants
}

export function AnimatedSection({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
  custom,
}: AnimatedSectionProps) {
  const { ref, isInView } = useScrollAnimation({
    threshold,
    triggerOnce,
  });

  // Get the variant
  const variant = variants[animation] as Variants;

  // Override duration and delay if provided
  const customVariant = duration || delay ? {
    ...variant,
    visible: {
      ...(variant.visible as any),
      transition: {
        ...(variant.visible as any)?.transition,
        duration: duration ?? (variant.visible as any)?.transition?.duration,
        delay: delay ?? (variant.visible as any)?.transition?.delay,
      },
    },
  } : variant;

  return (
    <m.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={customVariant}
      custom={custom}
      className={className}
    >
      {children}
    </m.div>
  );
}

// 🎯 Staggered Children Version
interface AnimatedStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  childDelay?: number;
}

export function AnimatedStagger({
  children,
  className = '',
  staggerDelay = 0.1,
  childDelay = 0.2,
}: AnimatedStaggerProps) {
  const { ref, isInView } = useScrollAnimation();

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay,
      },
    },
  };

  return (
    <m.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariant}
      className={className}
    >
      {children}
    </m.div>
  );
}

// 🌟 Item for Staggered Animation
export function AnimatedStaggerItem({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <m.div
      variants={variants.staggerItem}
      className={className}
    >
      {children}
    </m.div>
  );
}