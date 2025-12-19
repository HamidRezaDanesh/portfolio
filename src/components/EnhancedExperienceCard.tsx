// src/components/ModernHero.tsx
// 🎨 بهترین نسخه Hero Section - با فونت Vazirmatn

import { Download, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ModernHero = memo(() => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background - بدون تاثیر منفی روی performance */}
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-3xl animate-blob will-change-transform" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full blur-3xl animate-blob animation-delay-2000 will-change-transform" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className={`space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold border border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 animate-pulse" />
              {t('hero.subtitle')}
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-3">
                <span className="block text-gray-900 dark:text-white">
                  {t('hero.greeting')}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400">
                  {t('hero.name')}
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform will-change-transform">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                {t('common.downloadResume')}
              </button>

              <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-600 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform will-change-transform">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {t('common.contactMe')}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center lg:text-left group cursor-default hover:scale-105 transition-transform">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  5+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {t('hero.achievement1')}
                </div>
              </div>

              <div className="text-center group cursor-default hover:scale-105 transition-transform">
                <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  50+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {t('hero.achievement2')}
                </div>
              </div>

              <div className="text-center group cursor-default hover:scale-105 transition-transform">
                <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  €50K
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {t('hero.achievement3')}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative w-full max-w-md mx-auto">
              {/* Profile Picture */}
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white dark:ring-gray-800 ring-offset-4 ring-offset-transparent group">
                <img 
                  src="/images/profile-pic.webp" 
                  alt="Hamidreza Daneshsarand"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback */}
                <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-48 h-48 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                      <span className="text-6xl font-black text-white">HD</span>
                    </div>
                    <p className="text-white text-sm opacity-80">
                      Hamidreza Daneshsarand
                    </p>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl blur-2xl opacity-30 -z-10 animate-pulse will-change-transform" />

              {/* Floating Badges */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-5 animate-float border border-gray-100 dark:border-gray-700 group hover:shadow-3xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Available</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-5 animate-float-slow border border-gray-100 dark:border-gray-700 group hover:shadow-3xl transition-all">
                <div className="text-center">
                  <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    50+
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                    Projects
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:flex">
        <ArrowRight className="w-6 h-6 text-blue-600 dark:text-blue-400 rotate-90" />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .animate-blob {
          animation: blob 20s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-blob,
          .animate-float-slow,
          .animate-pulse {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
});

ModernHero.displayName = 'ModernHero';

export default ModernHero;