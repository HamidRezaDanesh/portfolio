import { useTranslation } from 'react-i18next';
import { MapPin, Lightbulb, Users, Leaf } from 'lucide-react';
import EducationTimeline from '@/components/EducationTimeline';
import LanguageSkills from '@/components/LanguageSkills';

export default function AboutPage() {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: t('about.value1'),
      description: t('about.value1Desc'),
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('about.value2'),
      description: t('about.value2Desc'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: t('about.value3'),
      description: t('about.value3Desc'),
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {t('about.subtitle')}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium">
            <MapPin className="w-4 h-4" />
            {t('Iran.Tabriz')}
          </div>
        </div>

        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16 animate-fade-in animation-delay-300">
          <div className="glass-card p-8 shadow-xl">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {t('about.intro')}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {t('about.description1')}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('about.description2')}
            </p>
          </div>
        </div>

        {/* Why Sweden Section */}
        <div className="max-w-4xl mx-auto mb-16 animate-fade-in animation-delay-600">
          <div className="glass-card p-8 border-2 border-primary-200 dark:border-primary-800">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              🇸🇪 {t('about.whySweden')}
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('about.swedenReason')}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Education */}
          <div className="animate-fade-in animation-delay-300">
            <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              {t('about.education')}
            </h3>
            <EducationTimeline />
          </div>

          {/* Languages */}
          <div className="animate-fade-in animation-delay-600">
            <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              {t('about.languages')}
            </h3>
            <div className="glass-card p-8 shadow-xl">
              <LanguageSkills />
            </div>
          </div>
        </div>

        {/* Professional Values */}
        <div className="animate-fade-in animation-delay-900">
          <h3 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            {t('about.values')}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-card p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group"
              >
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                >
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}