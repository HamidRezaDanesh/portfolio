// src/components/SkillBar.tsx - ENHANCED VERSION
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface SkillBarProps {
  name: string;
  proficiency: number;
  yearsOfExperience: number;
}

export default function SkillBar({ name, proficiency, yearsOfExperience }: SkillBarProps) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="space-y-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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

      {/* 📊 Enhanced Progress bar with gradient and animation */}
      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
        {/* Background glow effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm"
          style={{ width: `${proficiency}%` }}
        ></div>
        
        {/* Main progress bar */}
        <div
          className="relative h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
          style={{ 
            width: isHovered ? `${proficiency}%` : '0%',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>

        {/* Percentage indicator */}
        {isHovered && (
          <div 
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
            style={{ left: `${proficiency}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="w-2 h-2 bg-white rounded-full shadow-lg animate-ping"></div>
          </div>
        )}
      </div>
    </div>
  );
}