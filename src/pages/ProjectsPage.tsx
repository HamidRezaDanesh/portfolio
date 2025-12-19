import { useTranslation } from 'react-i18next';
import { FolderGit2, Plus } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { useCRUD } from '@/admin/hooks/useCRUD';
import type { Project } from '@/types/admin.types';
import { useEffect } from 'react';

export default function ProjectsPage() {
  const { t } = useTranslation();
  const { items: projects, refresh } = useCRUD<Project>('projects');

  // Refresh data when component mounts
  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <FolderGit2 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProjectCard
                  title={project.title}
                  duration={project.duration || ''}
                  description={project.description}
                  technologies={project.technologies}
                  results={project.results}
                  status={project.status === 'in-progress' ? t('projects.statusInProgress') : 
                          project.status === 'completed' ? t('projects.statusCompleted') : 
                          t('projects.statusPlanned')}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <FolderGit2 className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('projects.noProjects', 'No Projects Yet')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('projects.noProjectsDesc', 'Add your first project from the admin panel')}
            </p>
            <a
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              {t('projects.addProject', 'Add Project')}
            </a>
          </div>
        )}

        {/* GitHub CTA - Only show if there are projects */}
        {projects.length > 0 && (
          <div className="mt-16 text-center">
            <a
              href="https://github.com/hamidrezadanesh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
            >
              <FolderGit2 className="w-5 h-5" />
              View More on GitHub
            </a>
          </div>
        )}
      </div>
    </section>
  );
}