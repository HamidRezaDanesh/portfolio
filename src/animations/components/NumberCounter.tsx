// src/animations/components/NumberCounter.tsx
// 🔢 کامپوننت شمارنده عددی با انیمیشن

import { m } from '@/components/motion/LazyMotion';
import { useCounter, counterPresets } from '../hooks/useCounter';

interface NumberCounterProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
  preset?: keyof typeof counterPresets;
  triggerOnView?: boolean;
}
// خطوط 31-48 رو با این جایگزین کن:

export function NumberCounter({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = '',
  className = '',
  preset,
  triggerOnView = true,
}: NumberCounterProps) {
  // Define the type for preset config
  type PresetConfig = {
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    separator?: string;
  };

  // Use preset if provided
  const presetConfig: PresetConfig = preset ? counterPresets[preset](end) : {};
  
  const { ref, displayValue } = useCounter({
    start,
    end,
    duration: presetConfig.duration ?? duration,
    decimals: presetConfig.decimals ?? decimals,
    prefix: presetConfig.prefix ?? prefix,
    suffix: presetConfig.suffix ?? suffix,
    separator: presetConfig.separator ?? separator,
    triggerOnView,
  });

  return (
    <m.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayValue}
    </m.span>
  );
}
// 🎯 پریست‌های آماده برای استفاده سریع

export function PercentageCounter({ 
  value, 
  className = '' 
}: { 
  value: number; 
  className?: string;
}) {
  return (
    <NumberCounter
      end={value}
      preset="percentage"
      className={className}
    />
  );
}

export function CurrencyCounter({ 
  value, 
  className = '' 
}: { 
  value: number; 
  className?: string;
}) {
  return (
    <NumberCounter
      end={value}
      preset="currency"
      className={className}
    />
  );
}

export function YearsCounter({ 
  value, 
  className = '' 
}: { 
  value: number; 
  className?: string;
}) {
  return (
    <NumberCounter
      end={value}
      preset="years"
      className={className}
    />
  );
}