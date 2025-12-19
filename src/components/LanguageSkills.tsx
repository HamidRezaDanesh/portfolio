// src/components/LanguageSkills.tsx
import { useTranslation } from 'react-i18next';

export default function LanguageSkills() {
  const { t } = useTranslation();

  const languages = [
    {
      name: t('about.languageSkills.english'),
      level: t('about.languageSkills.englishLevel'),
      proficiency: 90,
      code: 'EN', // ← Changed from flag to code
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: t('about.languageSkills.swedish'),
      level: t('about.languageSkills.swedishLevel'),
      proficiency: 40,
      code: 'SV', // ← Changed from flag to code
      color: 'from-yellow-400 to-blue-500',
    },
    {
      name: t('about.languageSkills.persian'),
      level: t('about.languageSkills.persianLevel'),
      proficiency: 100,
      code: 'FA', // ← Changed from flag to code
      color: 'from-green-500 to-red-500',
    },
  ];

  return (
    <div className="space-y-6">
      {languages.map((lang, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Changed from flag emoji to styled badge */}
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${lang.color} flex items-center justify-center`}>
                <span className="text-sm font-bold text-white">
                  {lang.code}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {lang.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang.level}
                </p>
              </div>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {lang.proficiency}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${lang.proficiency}%`,
                background: 'linear-gradient(to right, #3b82f6, #2563eb)'
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}