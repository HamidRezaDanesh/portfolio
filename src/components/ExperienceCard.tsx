// src/components/ExperienceCard.tsx - ⭐ ULTRA-ENHANCED 2025 EDITION ⭐
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Calendar, ExternalLink, ChevronDown, ChevronUp, CheckCircle, Sparkles, Zap, Award } from 'lucide-react';

interface ExperienceCardProps {
  company: string;
  companyUrl?: string;
  position: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  isLatest?: boolean;
}

export default function ExperienceCard({
  company,
  companyUrl,
  position,
  period,
  location,
  description,
  achievements,
  technologies,
  isLatest = false,
}: ExperienceCardProps) {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const achievementsList = Array.isArray(achievements) ? achievements : [];
  const technologiesList = Array.isArray(technologies) ? technologies : [];

  return (
    <div className="relative pl-8 border-l-2 border-blue-200/50 dark:border-blue-800/50 pb-12 last:pb-0 group">
      {/* 🎯 ENHANCED Timeline dot with 3D effect */}
      <div 
        className={`absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full transition-all duration-500 ${
          isLatest 
            ? 'bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600 ring-4 ring-blue-200/50 dark:ring-blue-800/50 shadow-2xl shadow-blue-500/50 group-hover:scale-125 group-hover:rotate-180' 
            : 'bg-gradient-to-br from-blue-400 to-blue-600 group-hover:scale-125 group-hover:shadow-xl group-hover:shadow-blue-500/40'
        }`}
      >
        {isLatest && (
          <>
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
            <Sparkles className="absolute inset-0 m-auto w-3 h-3 text-white animate-pulse" />
          </>
        )}
      </div>

      {/* 🎴 GLASSMORPHISM Card with animated border */}
      <div 
        className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 dark:border-gray-700/30 overflow-hidden group/card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ✨ Animated gradient border glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/30 to-blue-500/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        
        {/* 🌊 Animated background pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
             style={{
               backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
               backgroundSize: '32px 32px'
             }}>
        </div>

        {/* ✨ Glassmorphism overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none backdrop-blur-sm`}></div>

        {/* 💫 Floating particles effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between flex-wrap gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent group-hover/card:scale-105 transition-transform duration-300">
                {position}
              </h3>
              {isLatest && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400/90 to-emerald-400/90 dark:from-green-500/30 dark:to-emerald-500/30 backdrop-blur-md text-green-900 dark:text-green-300 text-sm font-bold rounded-full border border-green-500/30 shadow-lg shadow-green-500/20 animate-pulse">
                  <Zap className="w-4 h-4" />
                  {t('experience.present')}
                </span>
              )}
            </div>
            
            {companyUrl ? (
              <a
                href={companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-all duration-300 group/link"
              >
                {company}
                <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </a>
            ) : (
              <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                {company}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>{period}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Description with better typography */}
        <p className="relative z-10 text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
          {description}
        </p>

        {/* 🏷️ ENHANCED Technologies with glassmorphism */}
        {technologiesList.length > 0 && (
          <div className="relative z-10 flex flex-wrap gap-3 mb-6">
            {technologiesList.map((tech, index) => (
              <span
                key={index}
                className="group/tag px-4 py-2 bg-gradient-to-br from-white/60 to-blue-50/60 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-md text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-xl border border-blue-200/50 dark:border-blue-800/50 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{tech}</span>
                {/* Shine effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/tag:opacity-100 group-hover/tag:animate-shimmer"></span>
              </span>
            ))}
          </div>
        )}

        {/* 🔽 ENHANCED Toggle Details Button with micro-interaction */}
        {achievementsList.length > 0 && (
          <>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="relative z-10 flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 backdrop-blur-sm text-blue-700 dark:text-blue-400 font-semibold rounded-xl border border-blue-300/30 dark:border-blue-700/30 hover:scale-105 hover:shadow-lg transition-all duration-300 group/btn"
            >
              {showDetails ? (
                <>
                  <ChevronUp className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform" />
                  {t('experience.hideDetails')}
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5 group-hover/btn:translate-y-1 transition-transform" />
                  {t('experience.viewDetails')} ({achievementsList.length})
                </>
              )}
              <Award className="w-5 h-5 ml-auto opacity-50 group-hover/btn:opacity-100 group-hover/btn:rotate-12 transition-all" />
            </button>

            {/* 🎯 ENHANCED Achievements with stagger animation */}
            {showDetails && (
              <div className="relative z-10 mt-8 pt-8 border-t border-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent">
                <h4 className="text-sm font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Key Achievements
                </h4>
                <div className="space-y-4">
                  {achievementsList.map((achievement, index) => (
                    <div 
                      key={index} 
                      className="group/achievement flex gap-4 items-start p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 dark:hover:from-green-900/10 dark:hover:to-emerald-900/10 rounded-2xl border border-transparent hover:border-green-200/50 dark:hover:border-green-800/50 transition-all duration-300"
                      style={{ 
                        animation: 'slideInLeft 0.5s ease-out forwards',
                        animationDelay: `${index * 0.1}s`,
                        opacity: 0
                      }}
                    >
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5 group-hover/achievement:scale-125 group-hover/achievement:rotate-12 transition-all duration-300" />
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* 💫 Corner accent with gradient */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent rounded-bl-full transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 via-pink-500/10 to-transparent rounded-tr-full transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      {/* ⚡ Connecting line with gradient */}
      <div className="absolute left-0 top-6 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent -translate-x-1/2"></div>
    </div>
  );
}

// 🎨 Add these keyframes to your global CSS (index.css)
/*
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.shadow-3xl {
  box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
}
*/