// src/pages/SkillsPage.tsx
import { useTranslation } from 'react-i18next';
import { Code, Factory, TrendingUp, Shield } from 'lucide-react';
import SkillBar from '@/components/SkillBar';
import CertificationCard from '@/components/CertificationCard';
import { AnimatedSection, AnimatedStagger, AnimatedStaggerItem } from '@/animations/components/AnimatedSection';
import { useCRUD } from '@/admin/hooks/useCRUD';
import type { Certification } from '@/types/admin.types';
import { useEffect } from 'react';

// ✅ Default certifications - fallback اگر localStorage خالی بود
const DEFAULT_CERTIFICATIONS = [
  {
    id: '1',
    title: 'SOLIDWORKS 3D CAD Specialization',
    issuer: 'Dassault Systems (Coursera)',
    date: '2025-08',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/1Z9RQUOEMMLQ',
    credentialId: '1Z9RQUOEMMLQ'
  },
  {
    id: '2',
    title: 'Six Sigma Yellow Belt',
    issuer: 'Kennesaw State University (Coursera)',
    date: '2025-08',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/QFX55BHAWYJK',
    credentialId: 'QFX55BHAWYJK'
  },
  {
    id: '3',
    title: 'Google Project Management Certificate',
    issuer: 'Google (Coursera)',
    date: '2025-07',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/UVE99BTSXUF0',
    credentialId: 'UVE99BTSXUF0'
  },
  {
    id: '4',
    title: 'Digital Technologies & Manufacturing',
    issuer: 'University of Michigan (Coursera)',
    date: '2025-06',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/DH6AMCFTZEF3',
    credentialId: 'DH6AMCFTZEF3'
  },
  {
    id: '5',
    title: 'AI for Mechanical Engineers',
    issuer: 'University of Michigan (Coursera)',
    date: '2025-04',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/LTBELHHCWTG6',
    credentialId: 'LTBELHHCWTG6'
  },
  {
    id: '6',
    title: 'CNC Miller Certification',
    issuer: 'Iran Technical & Vocational Training',
    date: '2020',
    credentialUrl: '',
    credentialId: ''
  },
  {
    id: '7',
    title: 'Python for Everybody',
    issuer: 'University of Michigan (Coursera)',
    date: '2025-07',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/5QKJRPP7ZB9C',
    credentialId: '5QKJRPP7ZB9C'
  },
  {
    id: '8',
    title: 'Meta Full-Stack Developer',
    issuer: 'Meta (Coursera)',
    date: '2025-08',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/M103G9DKSBBK',
    credentialId: 'M103G9DKSBBK'
  }
];

export default function SkillsPage() {
  const { t } = useTranslation();
  
  // ✅ استفاده از useCRUD برای خواندن certifications از localStorage
  const { items: storedCertifications, refresh } = useCRUD<Certification>('certifications');

  // ✅ Refresh data when component mounts
  useEffect(() => {
    refresh();
  }, [refresh]);

  // ✅ اگر localStorage خالی بود، از DEFAULT استفاده کن
  const certifications = storedCertifications.length > 0 
    ? storedCertifications 
    : DEFAULT_CERTIFICATIONS;

  const skillCategories = [
    {
      icon: <Code className="w-6 h-6" />,
      title: t('skills.categories.design'),
      gradient: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
      skills: [
        { name: t('skills.skillsList.solidworks'), proficiency: 95, years: 5 },
        { name: t('skills.skillsList.autocad'), proficiency: 90, years: 4 },
        { name: t('skills.skillsList.catia'), proficiency: 85, years: 3 },
        { name: t('skills.skillsList.moldflow'), proficiency: 80, years: 2 },
      ],
    },
    {
      icon: <Factory className="w-6 h-6" />,
      title: t('skills.categories.manufacturing'),
      gradient: 'linear-gradient(to bottom right, #f97316, #dc2626)',
      skills: [
        { name: t('skills.skillsList.cnc'), proficiency: 90, years: 3 },
        { name: t('skills.skillsList.lean'), proficiency: 85, years: 4 },
        { name: t('skills.skillsList.sixsigma'), proficiency: 80, years: 2 },
        { name: t('skills.skillsList.dfma'), proficiency: 85, years: 3 },
      ],
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t('skills.categories.programming'),
      gradient: 'linear-gradient(to bottom right, #22c55e, #10b981)',
      skills: [
        { name: t('skills.skillsList.python'), proficiency: 75, years: 2 },
        { name: t('skills.skillsList.dataanalysis'), proficiency: 70, years: 2 },
      ],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('skills.categories.quality'),
      gradient: 'linear-gradient(to bottom right, #a855f7, #ec4899)',
      skills: [
        { name: t('skills.skillsList.iso9001'), proficiency: 90, years: 5 },
        { name: t('skills.skillsList.iso14001'), proficiency: 85, years: 3 },
        { name: t('skills.skillsList.gdt'), proficiency: 90, years: 4 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 relative">
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <AnimatedSection animation="fadeInDown">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {t('skills.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('skills.subtitle')}
            </p>
          </div>
        </AnimatedSection>

        {/* Skills Grid */}
        <AnimatedStagger staggerDelay={0.15}>
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {skillCategories.map((category, index) => (
              <AnimatedStaggerItem key={index}>
                <div className="glass-card p-8 shadow-xl h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                      style={{ background: category.gradient }}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skillIndex}
                        name={skill.name}
                        proficiency={skill.proficiency}
                        yearsOfExperience={skill.years}
                      />
                    ))}
                  </div>
                </div>
              </AnimatedStaggerItem>
            ))}
          </div>
        </AnimatedStagger>

        {/* Certifications */}
        <AnimatedSection animation="fadeInUp" delay={0.3}>
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t('skills.certifications')}
          </h3>

          <AnimatedStagger staggerDelay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <AnimatedStaggerItem key={cert.id || index}>
                  <CertificationCard
                    title={cert.title}
                    issuer={cert.issuer}
                    date={cert.date}
                    credentialUrl={cert.credentialUrl}
                  />
                </AnimatedStaggerItem>
              ))}
            </div>
          </AnimatedStagger>
        </AnimatedSection>
      </div>
    </section>
  );
}