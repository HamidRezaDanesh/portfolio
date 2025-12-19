// src/admin/components/ResumeManager.tsx
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Download, Trash2, FileText, CheckCircle, Globe } from 'lucide-react';
import { useFileUpload } from '../hooks/useFileUpload';
import { formatFileSize } from '../../utils/imageCompression';
import DeleteConfirmModal from './modals/DeleteConfirmModal';

type ResumeLanguage = 'en' | 'sv' | 'fa';

export default function ResumeManager() {
  const { t } = useTranslation();
  const {
    files,
    isUploading,
    uploadProgress,
    uploadFile,
    deleteFile,
    downloadFile
  } = useFileUpload();

  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<ResumeLanguage>('en');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: '',
    name: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resumes = files.filter(f => f.type === 'resume');

  const getResumeByLanguage = (lang: ResumeLanguage) => {
    return resumes.find(r => r.language === lang);
  };

  const handleUpload = async (file: File, language: ResumeLanguage) => {
    setUploadError(null);

    // Check if resume already exists for this language
    const existing = getResumeByLanguage(language);
    if (existing) {
      const confirm = window.confirm(
        t('admin.resume.replaceConfirm', { language: language.toUpperCase() })
      );
      if (confirm) {
        deleteFile(existing.id);
      } else {
        return;
      }
    }

    try {
      await uploadFile(
        file,
        'resume',
        {
          maxSize: 10 * 1024 * 1024, // 10MB for resumes
          allowedTypes: ['application/pdf'],
          compress: false
        },
        { description: `Resume - ${language.toUpperCase()}` }
      );

      // Update language after upload
      const newResume = files[files.length - 1];
      if (newResume) {
        // This would need to be implemented in storage
        // For now, we'll store language in metadata
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
      setTimeout(() => setUploadError(null), 5000);
    }
  };

  const languages: { code: ResumeLanguage; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
    { code: 'fa', name: 'Persian', flag: '🇮🇷' }
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('admin.resume.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('admin.resume.subtitle')}
        </p>
      </div>

      {uploadError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{uploadError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {languages.map((lang) => {
          const resume = getResumeByLanguage(lang.code);

          return (
            <div
              key={lang.code}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{lang.flag}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {lang.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {lang.code.toUpperCase()}
                  </p>
                </div>
              </div>

              {resume ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {t('admin.resume.uploaded')}
                    </span>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <FileText className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {resume.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(resume.size)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(resume.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadFile(resume)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      {t('common.download')}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm({ isOpen: true, id: resume.id, name: resume.name })}
                      className="px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      fileInputRef.current?.click();
                    }}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {t('admin.resume.replace')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {t('admin.resume.notUploaded')}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        fileInputRef.current?.click();
                      }}
                      disabled={isUploading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      {t('admin.resume.uploadButton')}
                    </button>
                  </div>
                </div>
              )}

              {isUploading && selectedLanguage === lang.code && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleUpload(file, selectedLanguage);
          }
          e.target.value = '';
        }}
        className="hidden"
      />

      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <div className="flex items-start gap-3">
          <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {t('admin.resume.tips')}
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• {t('admin.resume.tip1')}</li>
              <li>• {t('admin.resume.tip2')}</li>
              <li>• {t('admin.resume.tip3')}</li>
              <li>• {t('admin.resume.tip4')}</li>
            </ul>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: '', name: '' })}
        onConfirm={() => {
          deleteFile(deleteConfirm.id);
          setDeleteConfirm({ isOpen: false, id: '', name: '' });
        }}
        itemName={deleteConfirm.name}
        itemType={t('admin.resume.itemType')}
      />
    </div>
  );
}