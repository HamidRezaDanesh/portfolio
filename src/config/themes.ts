// src/config/themes.ts
// 🎨 تم‌ها و گرادیان‌های مدرن برای سایت شما

export const modernThemes = {
    // گرادیان‌های زیبا
    gradients: {
      // Primary Gradients
      oceanBlue: 'from-blue-400 via-cyan-500 to-teal-600',
      purpleDream: 'from-purple-400 via-pink-500 to-red-500',
      sunsetGlow: 'from-orange-400 via-red-500 to-pink-500',
      mintFresh: 'from-green-400 via-cyan-500 to-blue-500',
      royalPurple: 'from-indigo-500 via-purple-500 to-pink-500',
      
      // Subtle Gradients
      softBlue: 'from-blue-50 via-cyan-50 to-teal-50',
      lightPurple: 'from-purple-50 via-pink-50 to-red-50',
      pastelGreen: 'from-green-50 via-emerald-50 to-teal-50',
      
      // Dark Mode Gradients  
      darkOcean: 'from-blue-900 via-cyan-900 to-teal-900',
      darkPurple: 'from-purple-900 via-pink-900 to-red-900',
      darkEmerald: 'from-emerald-900 via-green-900 to-teal-900',
    },
  
    // رنگ‌های اصلی
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      
      secondary: {
        50: '#fdf4ff',
        100: '#fae8ff',
        200: '#f5d0fe',
        300: '#f0abfc',
        400: '#e879f9',
        500: '#d946ef',
        600: '#c026d3',
        700: '#a21caf',
        800: '#86198f',
        900: '#701a75',
      },
  
      success: {
        light: '#10b981',
        DEFAULT: '#059669',
        dark: '#047857',
      },
  
      warning: {
        light: '#fbbf24',
        DEFAULT: '#f59e0b',
        dark: '#d97706',
      },
  
      danger: {
        light: '#f87171',
        DEFAULT: '#ef4444',
        dark: '#dc2626',
      },
    },
  
    // شیدوهای زیبا
    shadows: {
      neon: '0 0 40px rgba(59, 130, 246, 0.5)',
      purple: '0 0 40px rgba(168, 85, 247, 0.5)',
      soft: '0 10px 40px rgba(0, 0, 0, 0.1)',
      hard: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      colored: '0 20px 40px rgba(59, 130, 246, 0.3)',
    },
  
    // انیمیشن‌های Tailwind
    animations: {
      'gradient-shift': {
        '0%, 100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
      },
      'float': {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-20px)' },
      },
      'pulse-slow': {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0.5' },
      },
      'bounce-slow': {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      },
    },
  };
  
  // کلاس‌های کاربردی
  export const themeClasses = {
    // Glass Effect
    glass: 'bg-white/10 backdrop-blur-md border border-white/20',
    darkGlass: 'bg-gray-900/10 backdrop-blur-md border border-gray-700/20',
    
    // Neon Glow
    neonBlue: 'shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]',
    neonPurple: 'shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]',
    
    // Gradient Text
    gradientText: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent',
    
    // Hover Effects
    hoverLift: 'transition-all hover:-translate-y-2 hover:shadow-2xl',
    hoverScale: 'transition-transform hover:scale-105',
    hoverRotate: 'transition-transform hover:rotate-3',
  };
  
  // Dark Mode Configuration
  export const darkModeConfig = {
    // رنگ‌های پس‌زمینه
    backgrounds: {
      primary: 'bg-gray-900',
      secondary: 'bg-gray-800',
      tertiary: 'bg-gray-700',
      card: 'bg-gray-800/50',
    },
    
    // رنگ‌های متن
    text: {
      primary: 'text-gray-100',
      secondary: 'text-gray-300',
      tertiary: 'text-gray-400',
      muted: 'text-gray-500',
    },
    
    // بوردرها
    borders: {
      default: 'border-gray-700',
      light: 'border-gray-600',
      dark: 'border-gray-800',
    },
  };
  
  // توصیه‌های طراحی
  export const designRecommendations = {
    // فونت‌ها
    fonts: {
      persian: {
        recommended: ['Vazirmatn', 'IRANSansX', 'Estedad'],
        reason: 'خوانایی عالی و پشتیبانی از تمام وزن‌ها',
      },
      english: {
        recommended: ['Inter', 'Poppins', 'Space Grotesk'],
        reason: 'مدرن و حرفه‌ای',
      },
    },
    
    // رنگ‌بندی
    colorSchemes: {
      professional: {
        primary: 'Blue-Purple gradient',
        accent: 'Pink-Orange',
        neutral: 'Gray scale',
      },
      modern: {
        primary: 'Cyan-Teal',
        accent: 'Purple-Pink',
        neutral: 'Slate scale',
      },
      vibrant: {
        primary: 'Rainbow gradient',
        accent: 'Neon colors',
        neutral: 'Dark backgrounds',
      },
    },
    
    // المان‌های تزیینی
    decorations: {
      backgrounds: [
        'Gradient meshes',
        'Blob animations',
        'Particle effects',
        'Glassmorphism',
      ],
      interactions: [
        '3D transforms',
        'Parallax scrolling',
        'Micro-animations',
        'Hover effects',
      ],
    },
  };
  
  export default modernThemes;