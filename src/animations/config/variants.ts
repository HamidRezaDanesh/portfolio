// src/animations/config/variants.ts
// 🎨 تنظیمات انیمیشن‌ها (Framer Motion Variants)

export const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
      },
    },
  };
  
  export const fadeInDown = {
    hidden: {
      opacity: 0,
      y: -60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };
  
  export const fadeIn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };
  
  export const scaleIn = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1], // easeOutBack
      },
    },
  };
  
  export const slideInLeft = {
    hidden: {
      opacity: 0,
      x: -60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };
  
  export const slideInRight = {
    hidden: {
      opacity: 0,
      x: 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };
  
  // 🎯 Staggered Children Animation
  export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  
  export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  // ✨ Hover Animations
  export const hoverScale = {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  };
  
  export const hoverLift = {
    y: -8,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  };
  
  export const hoverGlow = {
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: 0.3,
    },
  };
  
  // 🔄 Tap/Click Animations
  export const tapScale = {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  };
  
  // 💫 Card Hover (Combined)
  export const cardHover = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      scale: 1.02,
      y: -8,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    tap: {
      scale: 0.98,
    },
  };
  
  // 🎨 Button Ripple Effect (for CSS)
  export const rippleAnimation = {
    initial: { scale: 0, opacity: 0.5 },
    animate: {
      scale: 2,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };
  
  // 📊 Counter Animation
  export const counterVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };
  
  // 🌊 Wave Animation (for skill bars)
  export const waveAnimation = {
    hidden: { width: '0%' },
    visible: (custom: number) => ({
      width: `${custom}%`,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2,
      },
    }),
  };
  
  // ⭐ Gradient Animation
  export const gradientShift = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };
  
  // 🎭 Rotate Animation
  export const rotateIn = {
    hidden: {
      opacity: 0,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };
  
  // 🌟 Pulse Animation (for badges/notifications)
  export const pulse = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };
  
  // 📱 Mobile-optimized variants (reduced motion)
  export const reducedMotionVariants = {
    fadeInUp: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.3 },
      },
    },
    scaleIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.3 },
      },
    },
  };
  
  // 🎯 Export all variants as a collection
  export const variants = {
    fadeInUp,
    fadeInDown,
    fadeIn,
    scaleIn,
    slideInLeft,
    slideInRight,
    staggerContainer,
    staggerItem,
    cardHover,
    rippleAnimation,
    counterVariant,
    waveAnimation,
    gradientShift,
    rotateIn,
    pulse,
    reducedMotionVariants,
  };
  
  export default variants;