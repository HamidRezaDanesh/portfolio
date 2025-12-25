// src/components/SkillBar.tsx - ✅ FIXED: Progress bars are FILLED by default
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

interface SkillBarProps {
  name: string;
  proficiency: number;
  yearsOfExperience: number;
  delay?: number; // برای animation تدریجی
}

export default function SkillBar({ name, proficiency, yearsOfExperience, delay = 0 }: SkillBarProps) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Animation ورودی: بعد از mount، progress bar پر میشه
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className="space-y-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header: نام و اطلاعات */}
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h4>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full font-semibold">
            {yearsOfExperience} {t('skills.yearsExp')}
          </span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {proficiency}%
          </span>
        </div>
      </div>

      {/* 📊 Progress Bar - ✅ در حالت عادی پر است */}
      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
        {/* Background glow effect - همیشه فعال */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: `${proficiency}%` }}
        />
        
        {/* ✅ Main progress bar - در حالت عادی PUR است */}
        <div
          className={`relative h-full rounded-full transition-all duration-1000 ease-out ${
            isHovered ? 'shadow-2xl scale-y-110' : 'shadow-lg'
          }`}
          style={{ 
            width: isVisible ? `${proficiency}%` : '0%', // ✅ Animation از 0 به proficiency
            background: isHovered 
              ? 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)' // Hover: gradient رنگی
              : 'linear-gradient(to right, #60a5fa, #a78bfa)', // Normal: gradient ملایم
            boxShadow: isHovered 
              ? '0 0 25px rgba(59, 130, 246, 0.6), 0 0 50px rgba(139, 92, 246, 0.4)' 
              : '0 2px 8px rgba(59, 130, 246, 0.3)'
          }}
        >
          {/* ✅ Shimmer effect - فقط در hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          )}
          
          {/* ✅ Animated stripes - فقط در hover */}
          {isHovered && (
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                animation: 'stripes 1s linear infinite'
              }}
            />
          )}
        </div>

        {/* ✅ Pulse indicator - فقط در hover */}
        {isHovered && isVisible && (
          <div 
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
            style={{ left: `${proficiency}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative">
              <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
              <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping" />
            </div>
          </div>
        )}
      </div>

      {/* ✅ CSS Animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        @keyframes stripes {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
      `}</style>
    </div>
  );
}