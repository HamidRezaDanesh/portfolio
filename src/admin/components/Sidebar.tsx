// src/admin/components/Sidebar.tsx
import { Download, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Briefcase,
  Award,
  FolderGit2,
  FileUp,
  Settings,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

type AdminView = 'dashboard' | 'personal' | 'experience' | 'skills' | 'certifications' | 'projects' | 'files' | 'export' | 'backup' | 'settings';

interface SidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

export default function Sidebar({ currentView, onViewChange, isOpen, onToggle, onLogout }: SidebarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard' as AdminView, label: t('admin.sidebar.dashboard'), icon: LayoutDashboard },
    { id: 'personal' as AdminView, label: t('admin.sidebar.personal'), icon: User },
    { id: 'experience' as AdminView, label: t('admin.sidebar.experience'), icon: Briefcase },
    { id: 'skills' as AdminView, label: t('admin.sidebar.skills'), icon: Award },
    { id: 'certifications' as AdminView, label: t('admin.sidebar.certifications'), icon: GraduationCap },
    { id: 'projects' as AdminView, label: t('admin.sidebar.projects'), icon: FolderGit2 },
    { id: 'files' as AdminView, label: t('admin.sidebar.files'), icon: FileUp },
    { id: 'export' as AdminView, label: 'Export/Import', icon: Download },
    { id: 'backup' as AdminView, label: 'Backup', icon: Database },
    { id: 'settings' as AdminView, label: t('admin.sidebar.settings'), icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {isOpen && (
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('admin.sidebar.title')}
              </h2>
            )}
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isOpen ? (
                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Home className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">{t('admin.sidebar.backToSite')}</span>}
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">{t('admin.sidebar.logout')}</span>}
          </button>
        </div>
      </aside>
    </>
  );
}