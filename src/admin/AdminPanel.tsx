// src/admin/AdminPanel.tsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './Dashboard';
import PersonalInfoManager from './components/PersonalInfoManager';
import ExperienceManager from './components/ExperienceManager';
import SkillsManager from './components/SkillsManager';
import CertificationsManager from './components/CertificationsManager'; // ADD THIS
import ProjectsManager from './components/ProjectsManager';
import FileManager from './components/FileManager';
import ExportImport from './components/ExportImport';
import Settings from './components/Settings';
import BackupRestore from './components/BackupRestore';

type AdminView = 'dashboard' | 'personal' | 'experience' | 'skills' | 'certifications' | 'projects' | 'files' | 'export' | 'backup' | 'settings'; // ADD certifications

export default function AdminPanel() {
  const { logout } = useAuth();
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'personal':
        return <PersonalInfoManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'skills':
        return <SkillsManager />;
      case 'certifications': // ADD THIS CASE
        return <CertificationsManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'files':
        return <FileManager />;
      case 'export':
        return <ExportImport />;
      case 'backup':
        return <BackupRestore />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={logout}
      />

      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {renderView()}
      </main>
    </div>
  );
}