// src/admin/components/SkillsManager.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useCRUD } from '../hooks/useCRUD';
import { Skill } from '../../types/admin.types';
import SkillModal from './modals/SkillModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';

export default function SkillsManager() {
  const { t } = useTranslation();
  const { items: skills, create, update, remove } = useCRUD<Skill>('skills');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: '',
    name: ''
  });

  const handleSave = (skill: Omit<Skill, 'id'> | Skill) => {
    if ('id' in skill) {
      update(skill.id, skill);
    } else {
      create(skill);
    }
    setEditingSkill(undefined);
  };

  const categories = {
    design: skills.filter(s => s.category === 'design'),
    manufacturing: skills.filter(s => s.category === 'manufacturing'),
    programming: skills.filter(s => s.category === 'programming'),
    quality: skills.filter(s => s.category === 'quality')
  };

  // Color gradients for each category
  const categoryGradients = {
    design: 'linear-gradient(to right, #3b82f6, #2563eb)', // blue
    manufacturing: 'linear-gradient(to right, #f97316, #ea580c)', // orange
    programming: 'linear-gradient(to right, #22c55e, #16a34a)', // green
    quality: 'linear-gradient(to right, #a855f7, #9333ea)' // purple
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('admin.skills.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('admin.skills.subtitle')}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingSkill(undefined);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          {t('admin.skills.addNew')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(categories).map(([category, categorySkills]) => (
          <div key={category} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 capitalize">
              {t(`admin.form.category${category.charAt(0).toUpperCase() + category.slice(1)}`)}
            </h3>

            <div className="space-y-4">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.yearsOfExperience} {t('admin.skills.years')}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEditingSkill(skill);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ isOpen: true, id: skill.id, name: skill.name })}
                        className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress bar with inline styles */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ 
                        width: `${skill.proficiency}%`,
                        background: categoryGradients[category as keyof typeof categoryGradients]
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                    {skill.proficiency}%
                  </p>
                </div>
              ))}

              {categorySkills.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  {t('admin.skills.emptyCategory')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <SkillModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSkill(undefined);
        }}
        onSave={handleSave}
        skill={editingSkill}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: '', name: '' })}
        onConfirm={() => {
          remove(deleteConfirm.id);
          setDeleteConfirm({ isOpen: false, id: '', name: '' });
        }}
        itemName={deleteConfirm.name}
        itemType={t('admin.skills.itemType')}
      />
    </div>
  );
}