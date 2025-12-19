import { useTranslation } from 'react-i18next';
import { Briefcase } from 'lucide-react';
import ExperienceCard from '@/components/ExperienceCard';
import { getStringArray } from '@/utils/i18n';

export default function ExperiencePage() {
  const { t } = useTranslation();

  const experiences = [
    {
      company: t('experience.company1'),
      companyUrl: t('experience.company1Url'),
      position: t('experience.position1'),
      period: t('experience.period1'),
      location: t('experience.location1'),
      description: t('experience.description1'),
      achievements: getStringArray(t('experience.achievements1', { returnObjects: true })),
      technologies: getStringArray(t('experience.technologies1', { returnObjects: true })),
      isLatest: true,
    },
    {
      company: t('experience.company2'),
      companyUrl: t('experience.company2Url'),
      position: t('experience.position2'),
      period: t('experience.period2'),
      location: t('experience.location2'),
      description: t('experience.description2'),
      achievements: getStringArray(t('experience.achievements2', { returnObjects: true })),
      technologies: getStringArray(t('experience.technologies2', { returnObjects: true })),
    },
    {
      company: t('experience.company3'),
      position: t('experience.position3'),
      period: t('experience.period3'),
      location: t('experience.location3'),
      description: t('experience.description3'),
      achievements: getStringArray(t('experience.achievements3', { returnObjects: true })),
      technologies: getStringArray(t('experience.technologies3', { returnObjects: true })),
    },
  ];

  return (
    <section id="experience" className="py-20 relative">
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <Briefcase className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {t('experience.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>

        {/* Summary Stats با Glassmorphism */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="card-hover glass-card text-center p-8 animate-scale-in shadow-glow-blue">
            <div className="text-5xl font-black gradient-text mb-3">5+</div>
            <div className="text-gray-700 dark:text-gray-300 font-semibold">Years Experience</div>
          </div>
          
          <div className="card-hover glass-card text-center p-8 animate-scale-in shadow-glow-purple" style={{ animationDelay: '100ms' }}>
            <div className="text-5xl font-black gradient-text mb-3">50+</div>
            <div className="text-gray-700 dark:text-gray-300 font-semibold">Components Designed</div>
          </div>
          
          <div className="card-hover glass-card text-center p-8 animate-scale-in shadow-glow-blue" style={{ animationDelay: '200ms' }}>
            <div className="text-5xl font-black gradient-text mb-3">€80K+</div>
            <div className="text-gray-700 dark:text-gray-300 font-semibold">Annual Savings</div>
          </div>
        </div>
        
      </div>
    </section>
  );
}