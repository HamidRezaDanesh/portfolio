// src/admin/components/ExportImport.tsx
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Download, 
  Upload, 
  FileJson,
  CheckCircle,
  AlertCircle,
  Info,
  Briefcase,
  Award,
  FolderGit2
} from 'lucide-react';
import { 
  exportAll, 
  exportExperiences, 
  exportSkills, 
  exportProjects 
} from '../../utils/exportData';
import { importFromJSON, mergeData } from '../../utils/importData';
import { storage } from '../../utils/storage';

type ImportStrategy = 'replace' | 'merge';

export default function ExportImport() {
  const { t } = useTranslation();
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [importStrategy, setImportStrategy] = useState<ImportStrategy>('replace');
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showMessage = (type: 'success' | 'error' | 'info', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleExportAll = () => {
    try {
      exportAll();
      showMessage('success', t('admin.export.exportSuccess'));
    } catch (error) {
      showMessage('error', t('admin.export.exportError'));
    }
  };

  const handleExportExperiences = () => {
    try {
      exportExperiences();
      showMessage('success', t('admin.export.exportExperiencesSuccess'));
    } catch (error) {
      showMessage('error', t('admin.export.exportError'));
    }
  };

  const handleExportSkills = () => {
    try {
      exportSkills();
      showMessage('success', t('admin.export.exportSkillsSuccess'));
    } catch (error) {
      showMessage('error', t('admin.export.exportError'));
    }
  };

  const handleExportProjects = () => {
    try {
      exportProjects();
      showMessage('success', t('admin.export.exportProjectsSuccess'));
    } catch (error) {
      showMessage('error', t('admin.export.exportError'));
    }
  };

  const handleImport = async (file: File) => {
    setIsImporting(true);
    
    try {
      const result = await importFromJSON(file);
      
      if (!result.success) {
        showMessage('error', result.message);
        return;
      }

      if (!result.data) {
        showMessage('error', t('admin.import.noData'));
        return;
      }

      const existingData = storage.getData();
      const mergedData = mergeData(existingData, result.data, importStrategy);
      
      storage.setData(mergedData);
      showMessage('success', result.message);
      
      // Reload after successful import
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : t('admin.import.importError'));
    } finally {
      setIsImporting(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/json') {
        showMessage('error', t('admin.import.invalidFileType'));
        return;
      }
      handleImport(file);
    }
    // Reset input
    e.target.value = '';
  };

  const exportOptions = [
    {
      icon: <Download className="h-6 w-6" />,
      title: t('admin.export.exportAll'),
      description: t('admin.export.exportAllDesc'),
      onClick: handleExportAll,
      color: 'blue'
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: t('admin.export.exportExperiences'),
      description: t('admin.export.exportExperiencesDesc'),
      onClick: handleExportExperiences,
      color: 'green'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: t('admin.export.exportSkills'),
      description: t('admin.export.exportSkillsDesc'),
      onClick: handleExportSkills,
      color: 'purple'
    },
    {
      icon: <FolderGit2 className="h-6 w-6" />,
      title: t('admin.export.exportProjects'),
      description: t('admin.export.exportProjectsDesc'),
      onClick: handleExportProjects,
      color: 'orange'
    }
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('admin.export.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('admin.export.subtitle')}
        </p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg border ${
          message.type === 'success'
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
            : message.type === 'error'
            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
        }`}>
          <div className="flex items-center gap-2">
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : message.type === 'error' ? (
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            ) : (
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            )}
            <p className={`text-sm ${
              message.type === 'success'
                ? 'text-green-600 dark:text-green-400'
                : message.type === 'error'
                ? 'text-red-600 dark:text-red-400'
                : 'text-blue-600 dark:text-blue-400'
            }`}>
              {message.text}
            </p>
          </div>
        </div>
      )}

      {/* Export Section */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Download className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          {t('admin.export.exportData')}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {exportOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.onClick}
              className={`flex items-start gap-4 p-6 bg-gradient-to-r ${
                colorClasses[option.color as keyof typeof colorClasses]
              } text-white rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                {option.icon}
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold mb-1">{option.title}</h4>
                <p className="text-sm text-white/90">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Import Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Upload className="h-6 w-6 text-green-600 dark:text-green-400" />
          {t('admin.import.importData')}
        </h3>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          {/* Import Strategy */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t('admin.import.strategy')}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setImportStrategy('replace')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  importStrategy === 'replace'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('admin.import.replace')}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('admin.import.replaceDesc')}
                </p>
              </button>

              <button
                onClick={() => setImportStrategy('merge')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  importStrategy === 'merge'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('admin.import.merge')}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('admin.import.mergeDesc')}
                </p>
              </button>
            </div>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
            <FileJson className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('admin.import.uploadFile')}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t('admin.import.uploadDesc')}
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
            >
              {isImporting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t('admin.import.importing')}
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  {t('admin.import.selectFile')}
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              {t('admin.import.onlyJson')}
            </p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <div className="flex items-start gap-3">
          <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {t('admin.export.tips')}
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• {t('admin.export.tip1')}</li>
              <li>• {t('admin.export.tip2')}</li>
              <li>• {t('admin.export.tip3')}</li>
              <li>• {t('admin.export.tip4')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}