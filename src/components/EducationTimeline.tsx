import { useTranslation } from 'react-i18next';
import { GraduationCap, Calendar, Award } from 'lucide-react';

export default function EducationTimeline() {
  const { t } = useTranslation();

  const education = [
    {
      degree: t('about.degree1'),
      school: t('about.degree1School'),
      years: t('about.degree1Years'),
      gpa: t('about.degree1GPA'),
      thesis: t('about.degree1Thesis'),
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      degree: t('about.degree2'),
      school: t('about.degree2School'),
      years: t('about.degree2Years'),
      icon: <GraduationCap className="w-6 h-6" />,
    },
  ];

  return (
    <div className="space-y-8">
      {education.map((edu, index) => (
        <div key={index} className="relative pl-8 border-l-2 border-primary-200 dark:border-primary-800">
          {/* Timeline dot */}
          <div className="absolute left-0 top-0 -translate-x-1/2 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
            {edu.icon}
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {edu.degree}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                {edu.years}
              </div>
            </div>

            <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
              {edu.school}
            </p>

            {edu.gpa && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                <Award className="w-4 h-4" />
                <span className="font-medium">{edu.gpa}</span>
              </div>
            )}

            {edu.thesis && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Thesis:</span> {edu.thesis}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}