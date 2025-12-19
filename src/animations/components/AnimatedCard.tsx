// src/animations/components/AnimatedCard.tsx
// 🎴 کامپوننت کارت با انیمیشن‌های Hover

import { m } from '@/components/motion/LazyMotion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverLift?: number;
  onClick?: () => void;
  disabled?: boolean;
}

export function AnimatedCard({
  children,
  className = '',
  hoverScale = 1.02,
  hoverLift = -8,
  onClick,
  disabled = false,
}: AnimatedCardProps) {
  const customHover = {
    rest: {
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    hover: {
      scale: hoverScale,
      y: hoverLift,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <m.div
      initial="rest"
      whileHover={!disabled ? 'hover' : undefined}
      whileTap={!disabled && onClick ? 'tap' : undefined}
      variants={customHover}
      onClick={onClick}
      className={`${className} ${onClick && !disabled ? 'cursor-pointer' : ''}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </m.div>
  );
}

// 🌟 Subtle Hover (کم‌تر حرکت می‌کنه)
export function SubtleCard({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <AnimatedCard
      hoverScale={1.01}
      hoverLift={-4}
      className={className}
      onClick={onClick}
    >
      {children}
    </AnimatedCard>
  );
}

// 🚀 Strong Hover (بیشتر حرکت می‌کنه)
export function StrongCard({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <AnimatedCard
      hoverScale={1.05}
      hoverLift={-12}
      className={className}
      onClick={onClick}
    >
      {children}
    </AnimatedCard>
  );
}