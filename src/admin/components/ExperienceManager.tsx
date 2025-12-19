// src/admin/components/ExperienceManager.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useCRUD } from '../hooks/useCRUD';
import { Experience } from '../../types/admin.types';
import ExperienceModal from './modals/ExperienceModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';

export default function ExperienceManager() {
  const { t } = useTranslation();
  const { items: experiences, create, update, remove } = useCRUD<Experience>('experiences');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: '',
    name: ''
  });

  const handleSave = (experience: Omit<Experience, 'id'> | Experience) => {
    if ('id' in experience) {
      update(experience.id, experience);
    } else {
      create(experience);
    }
    setEditingExperience(undefined);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    remove(id);
    setDeleteConfirm({ isOpen: false, id: '', name: '' });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('admin.experience.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('admin.experience.subtitle')}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingExperience(undefined);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          {t('admin.experience.addNew')}
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {exp.position}
                  </h3>
                  {exp.current && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium rounded">
                      {t('admin.experience.current')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{exp.company}</span>
                  {exp.companyUrl && (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  {exp.startDate} - {exp.current ? t('admin.experience.present') : exp.endDate}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setDeleteConfirm({ isOpen: true, id: exp.id, name: exp.position })}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {exp.description}
            </p>

            {exp.achievements.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('admin.experience.achievements')}
                </h4>
                <ul className="space-y-1">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400">
              {t('admin.experience.empty')}
            </p>
          </div>
        )}
      </div>

      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingExperience(undefined);
        }}
        onSave={handleSave}
        experience={editingExperience}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: '', name: '' })}
        onConfirm={() => handleDelete(deleteConfirm.id)}
        itemName={deleteConfirm.name}
        itemType={t('admin.experience.itemType')}
      />
    </div>
  );
}