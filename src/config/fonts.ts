// src/config/fonts.ts - ✅ OPTIMIZED VERSION

export const fontConfig = {
  // فونت فارسی - فقط Vazirmatn
  persian: {
    primary: 'Vazirmatn',      // مدرن و خوانا
    weights: [400, 600, 700],  // فقط وزن‌های ضروری
  },
  
  // فونت انگلیسی - فقط Inter
  english: {
    primary: 'Inter',
    weights: [400, 600, 700, 800],  // فقط وزن‌های ضروری
  },
};

// وزن‌های مورد استفاده
export const fontWeights = {
  regular: 400,   // body text
  semiBold: 600,  // buttons, emphasis
  bold: 700,      // headings
  extraBold: 800, // hero titles
};

// کلاس‌های Tailwind برای فونت‌ها
export const fontClasses = {
  // Headers
  h1: 'font-extrabold tracking-tight',
  h2: 'font-bold tracking-tight',
  h3: 'font-semibold',
  
  // Body
  body: 'font-normal leading-relaxed',
  bodyBold: 'font-semibold',
  
  // Special
  button: 'font-semibold tracking-wide',
  badge: 'font-semibold tracking-wider uppercase text-xs',
};