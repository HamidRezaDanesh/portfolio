// src/admin/components/QuickActions.tsx
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Upload, Trash2 } from 'lucide-react';

export default function QuickActions() {
  const { t } = useTranslation();

  const actions = [
    {
      label: t('admin.quickActions.addExperience'),
      icon: Plus,
      color: 'blue',
      onClick: () => alert('Coming in Day 11')
    },
    {
      label: t('admin.quickActions.editSkills'),
      icon: Edit,
      color: 'green',
      onClick: () => alert('Coming in Day 11')
    },
    {
      label: t('admin.quickActions.uploadFile'),
      icon: Upload,
      color: 'purple',
      onClick: () => alert('Coming in Day 12')
    },
    {
      label: t('admin.quickActions.clearCache'),
      icon: Trash2,
      color: 'orange',
      onClick: () => {
        if (confirm('Are you sure you want to clear cache?')) {
          localStorage.removeItem('portfolio_cache');
          alert('Cache cleared!');
        }
      }
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        {t('admin.quickActions.title')}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`flex flex-col items-center justify-center gap-3 p-4 rounded-lg transition-all ${
                colorClasses[action.color as keyof typeof colorClasses]
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-sm font-medium text-center">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}