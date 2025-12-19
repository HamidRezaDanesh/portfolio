// src/admin/components/ProjectsManager.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useCRUD } from '../hooks/useCRUD';
import { Project } from '../../types/admin.types';
import ProjectModal from './modals/ProjectModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';

export default function ProjectsManager() {
  const { t } = useTranslation();
  const { items: projects, create, update, remove } = useCRUD<Project>('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: '',
    name: ''
  });

  const handleSave = (project: Omit<Project, 'id'> | Project) => {
    if ('id' in project) {
      update(project.id, project);
    } else {
      create(project);
    }
    setEditingProject(undefined);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      'completed': { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', label: t('admin.form.statusCompleted') },
      'in-progress': { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', label: t('admin.form.statusInProgress') },
      'planned': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-600 dark:text-gray-400', label: t('admin.form.statusPlanned') }
    };
    return badges[status as keyof typeof badges] || badges.planned;
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('admin.projects.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('admin.projects.subtitle')}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProject(undefined);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          {t('admin.projects.addNew')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => {
          const statusBadge = getStatusBadge(project.status);
          
          return (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <span className={`inline-block px-2 py-1 ${statusBadge.bg} ${statusBadge.text} text-xs font-medium rounded`}>
                    {statusBadge.label}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({ isOpen: true, id: project.id, name: project.title })}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>

              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {project.results.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {t('admin.projects.results')}
                  </h4>
                  <ul className="space-y-1">
                    {project.results.slice(0, 3).map((result, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.links && (Object.values(project.links).some(link => link)) && (
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      GitHub <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      Demo <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {projects.length === 0 && (
          <div className="col-span-2 text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400">
              {t('admin.projects.empty')}
            </p>
          </div>
        )}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(undefined);
        }}
        onSave={handleSave}
        project={editingProject}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: '', name: '' })}
        onConfirm={() => {
          remove(deleteConfirm.id);
          setDeleteConfirm({ isOpen: false, id: '', name: '' });
        }}
        itemName={deleteConfirm.name}
        itemType={t('admin.projects.itemType')}
      />
    </div>
  );
}