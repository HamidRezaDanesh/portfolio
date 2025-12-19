// src/components/ModernUIComponents.tsx
// 🎨 کامپوننت‌های UI فوق‌العاده مدرن و زیبا

import { useState, useEffect, memo } from 'react';
import { m, AnimatePresence } from '@/components/motion/LazyMotion';
import { 
  Sparkles, ArrowUpRight, TrendingUp, Rocket
} from 'lucide-react';

// 1️⃣ دکمه مدرن با انیمیشن Neon Glow
export const NeonButton = memo(({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  icon,
  className = '' 
}: any) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: 'from-blue-500 via-purple-500 to-pink-500',
    success: 'from-green-500 via-emerald-500 to-teal-500',
    danger: 'from-red-500 via-pink-500 to-orange-500',
    premium: 'from-yellow-400 via-amber-500 to-orange-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <m.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative overflow-hidden rounded-2xl font-semibold
        ${sizes[size as keyof typeof sizes]}
        ${className}
      `}
    >
      {/* Gradient Background */}
      <div className={`
        absolute inset-0 bg-gradient-to-r ${variants[variant as keyof typeof variants]}
        ${isHovered ? 'opacity-100' : 'opacity-90'}
        transition-opacity duration-300
      `} />

      {/* Neon Glow Effect */}
      <div className={`
        absolute inset-0 bg-gradient-to-r ${variants[variant as keyof typeof variants]}
        blur-xl opacity-50 scale-110
        ${isHovered ? 'animate-pulse' : ''}
      `} />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 text-white">
        {icon}
        {children}
        {isHovered && <ArrowUpRight className="w-4 h-4 animate-bounce" />}
      </span>

      {/* Shimmer Effect */}
      <m.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
        animate={isHovered ? { x: '200%' } : {}}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />
    </m.button>
  );
});
NeonButton.displayName = 'NeonButton';

// 2️⃣ کارت ۳بعدی با Parallax Effect
export const Card3D = memo(({ children, className = '' }: any) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    setRotateY(x / 10);
    setRotateX(-y / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <m.div
      className={`relative preserve-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Main Card */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl border border-gray-100 dark:border-gray-700">
        {children}
      </div>

      {/* 3D Shadow */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl -z-10"
        style={{ transform: 'translateZ(-20px)' }}
      />
    </m.div>
  );
});
Card3D.displayName = 'Card3D';

// 3️⃣ Progress Bar با انیمیشن مایع
export const LiquidProgress = memo(({ 
  value, 
  max = 100, 
  label, 
  showPercentage = true,
  gradient = 'from-blue-500 via-purple-500 to-pink-500' 
}: any) => {
  const percentage = (value / max) * 100;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {label}
          </span>
          {showPercentage && (
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
        </div>

        {/* Main Progress Bar */}
        <m.div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${gradient} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${percentage}%` : 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Liquid Wave Effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/30 to-white/0 animate-wave" />
          </div>

          {/* Glow Effect */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/50 rounded-full blur-xl animate-pulse" />
        </m.div>
      </div>
    </div>
  );
});
LiquidProgress.displayName = 'LiquidProgress';

// 4️⃣ Badge با انیمیشن Rainbow
export const RainbowBadge = memo(({ children, icon, size = 'md' }: any) => {
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <m.div
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      className={`
        inline-flex items-center gap-2 rounded-full font-semibold
        bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
        text-white shadow-lg
        ${sizes[size as keyof typeof sizes]}
        relative overflow-hidden
      `}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-gradient-xy opacity-50" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-1.5">
        {icon}
        {children}
        <Sparkles className="w-3 h-3 animate-pulse" />
      </span>
    </m.div>
  );
});
RainbowBadge.displayName = 'RainbowBadge';

// 5️⃣ Floating Action Button
export const FloatingActionButton = memo(({ onClick, icon, label }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <m.div
      className="fixed bottom-8 right-8 z-50"
      whileHover={{ scale: 1.1 }}
    >
      <m.button
        onClick={onClick}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl text-white flex items-center justify-center group"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {/* Icon */}
        <m.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {icon || <Rocket className="w-7 h-7" />}
        </m.div>

        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />

        {/* Label */}
        <AnimatePresence>
          {isExpanded && label && (
            <m.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-full mr-4 px-4 py-2 bg-gray-900 text-white rounded-lg whitespace-nowrap"
            >
              {label}
            </m.div>
          )}
        </AnimatePresence>
      </m.button>
    </m.div>
  );
});
FloatingActionButton.displayName = 'FloatingActionButton';

// 6️⃣ Statistics Card با انیمیشن
export const StatCard = memo(({ 
  title, 
  value, 
  change, 
  icon, 
  gradient = 'from-blue-500 to-purple-500' 
}: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = parseInt(value.toString().replace(/[^0-9]/g, ''));
    const increment = target / 50;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <m.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl overflow-hidden group"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />

      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
        {title}
      </h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {count.toLocaleString()}
        </span>
        {change && (
          <span className={`text-sm font-semibold flex items-center gap-1 ${
            change > 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            <TrendingUp className="w-4 h-4" />
            {change}%
          </span>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl" />
    </m.div>
  );
});
StatCard.displayName = 'StatCard';

// CSS برای انیمیشن‌ها
export const modernUIStyles = `
  @keyframes gradient-xy {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes wave {
    0% {
      transform: translateX(-100%) translateY(0) scaleY(1);
    }
    50% {
      transform: translateX(0%) translateY(-10%) scaleY(0.8);
    }
    100% {
      transform: translateX(100%) translateY(0%) scaleY(1);
    }
  }

  .animate-gradient-xy {
    background-size: 200% 200%;
    animation: gradient-xy 3s ease infinite;
  }

  .animate-wave {
    animation: wave 2s ease-in-out infinite;
  }

  .preserve-3d {
    transform-style: preserve-3d;
    perspective: 1000px;
  }
`;

export default {
  NeonButton,
  Card3D,
  LiquidProgress,
  RainbowBadge,
  FloatingActionButton,
  StatCard,
};