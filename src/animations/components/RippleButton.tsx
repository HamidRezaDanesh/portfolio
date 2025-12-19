// src/animations/components/RippleButton.tsx
// 💧 دکمه با افکت Ripple

import { m } from '@/components/motion/LazyMotion';
import { ReactNode, MouseEvent } from 'react';
import { useRipple } from '../hooks/useRipple';

interface RippleButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  rippleColor?: string;
}

export function RippleButton({
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  rippleColor = 'rgba(255, 255, 255, 0.6)',
}: RippleButtonProps) {
  const { ripples, addRipple } = useRipple();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      addRipple(e);
      onClick?.(e);
    }
  };

  return (
    <m.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}

      {/* Ripple Effect */}
      {ripples.map((ripple) => (
        <m.span
          key={ripple.key}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </m.button>
  );
}

// 🎨 پریست‌های آماده

export function PrimaryRippleButton({
  children,
  onClick,
  className = '',
  disabled = false,
}: {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <RippleButton
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors ${className}`}
      rippleColor="rgba(255, 255, 255, 0.5)"
    >
      {children}
    </RippleButton>
  );
}

export function SecondaryRippleButton({
  children,
  onClick,
  className = '',
  disabled = false,
}: {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <RippleButton
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors ${className}`}
      rippleColor="rgba(0, 0, 0, 0.1)"
    >
      {children}
    </RippleButton>
  );
}

export function OutlineRippleButton({
  children,
  onClick,
  className = '',
  disabled = false,
}: {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <RippleButton
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg font-medium transition-colors ${className}`}
      rippleColor="rgba(59, 130, 246, 0.3)"
    >
      {children}
    </RippleButton>
  );
}