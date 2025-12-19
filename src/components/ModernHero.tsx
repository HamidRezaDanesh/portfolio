import { Download, Mail, Sparkles } from 'lucide-react';

export default function HeroModern() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-bg-mesh py-20">
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-float-smooth opacity-50" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-float-smooth opacity-50" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-8 animate-fade-in-up">
            
            {/* Badge */}
            <div className="glass-card inline-flex items-center gap-2 px-5 py-2.5">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-glow-pulse" />
              <span className="text-blue-700 dark:text-blue-300 text-sm font-semibold">
                Available for Work
              </span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-4">
                <span className="block text-gray-900 dark:text-white">
                  سلام، من
                </span>
                <span className="block gradient-text">
                  حمیدرضا دانش‌سرند
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                مهندس طراحی مکانیک | متخصص SolidWorks و بهینه‌سازی هزینه
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-gradient">
                <Download className="w-5 h-5 inline-block ml-2" />
                دانلود رزومه
              </button>
              
              <button className="btn-outline-gradient">
                <Mail className="w-5 h-5 inline-block ml-2" />
                تماس با من
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="glass-card p-4 text-center hover:scale-105 transition-transform">
                <div className="text-3xl font-black gradient-text mb-1">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  سال تجربه
                </div>
              </div>
              <div className="glass-card p-4 text-center hover:scale-105 transition-transform">
                <div className="text-3xl font-black gradient-text mb-1">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  پروژه موفق
                </div>
              </div>
              <div className="glass-card p-4 text-center hover:scale-105 transition-transform">
                <div className="text-3xl font-black gradient-text mb-1">€50K</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  صرفه‌جویی سالانه
                </div>
              </div>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-full max-w-md mx-auto">
              
              {/* Glass Card with Image */}
              <div className="glass-card p-6 animate-float-smooth">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="/images/profile-pic.webp" 
                    alt="Hamidreza Daneshsarand"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-primary rounded-3xl blur-3xl opacity-30 -z-10 animate-glow-pulse" />
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 glass-card p-4 animate-float-smooth shadow-glow-blue">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}