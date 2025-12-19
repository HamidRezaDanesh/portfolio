// src/admin/components/FileManager.tsx
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Upload, 
  File, 
  Image as ImageIcon, 
  FileText, 
  Trash2, 
  Download,
  Search,
  Filter,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useFileUpload } from '../hooks/useFileUpload';
import { formatFileSize } from '../../utils/imageCompression';
import { storage } from '../../utils/storage';
import DeleteConfirmModal from './modals/DeleteConfirmModal';

export default function FileManager() {
  const { t } = useTranslation();
  const {
    files,
    isUploading,
    uploadProgress,
    uploadFile,
    deleteFile,
    downloadFile
  } = useFileUpload();

  const [filter, setFilter] = useState<'all' | 'resume' | 'certificate' | 'project-image' | 'other'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: '',
    name: ''
  });
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const storageInfo = storage.getStorageUsage();

  const filteredFiles = files.filter(file => {
    const matchesFilter = filter === 'all' || file.type === filter;
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      await handleFileUpload(droppedFiles[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadError(null);
    setUploadSuccess(false);

    try {
      await uploadFile(file, 'other', {
        maxSize: 5 * 1024 * 1024,
        allowedTypes: ['image/*', 'application/pdf'],
        compress: true,
        quality: 0.8
      });
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
      setTimeout(() => setUploadError(null), 5000);
    }
  };

  const getFileIcon = (file: any) => {
    if (file.mimeType.startsWith('image/')) {
      return <ImageIcon className="h-8 w-8 text-blue-600" />;
    } else if (file.mimeType === 'application/pdf') {
      return <FileText className="h-8 w-8 text-red-600" />;
    }
    return <File className="h-8 w-8 text-gray-600" />;
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('admin.files.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('admin.files.subtitle')}
        </p>
      </div>

      {/* Storage Usage */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('admin.files.storageUsage')}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatFileSize(storageInfo.used)} / {formatFileSize(storageInfo.available)}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              storageInfo.percentage > 80 ? 'bg-red-600' : 'bg-blue-600'
            }`}
            style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-dashed p-8 mb-6 transition-all ${
          dragActive
            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-700'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t('admin.files.uploadTitle')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {t('admin.files.uploadDescription')}
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            accept="image/*,application/pdf"
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isUploading ? `${t('admin.files.uploading')} ${uploadProgress}%` : t('admin.files.selectFile')}
          </button>

          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
            {t('admin.files.maxSize')}: 5MB | {t('admin.files.allowedTypes')}: JPG, PNG, PDF
          </p>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload Messages */}
        {uploadError && (
          <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-600 dark:text-red-400">{uploadError}</p>
          </div>
        )}

        {uploadSuccess && (
          <div className="mt-4 flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-600 dark:text-green-400">
              {t('admin.files.uploadSuccess')}
            </p>
          </div>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('admin.files.search')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex gap-2">
          {/* Filter Button with Icon */}
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              filter !== 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Filter className="h-4 w-4" />
            {t('admin.files.filter')}
          </button>
          
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {t('admin.files.all')}
          </button>
          <button
            onClick={() => setFilter('resume')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'resume'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {t('admin.files.resumes')}
          </button>
          <button
            onClick={() => setFilter('project-image')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'project-image'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {t('admin.files.images')}
          </button>
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              {getFileIcon(file)}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {file.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            {file.mimeType.startsWith('image/') && (
              <div className="mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={file.data}
                  alt={file.name}
                  className="w-full h-32 object-cover"
                />
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => downloadFile(file)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Download className="h-4 w-4" />
                {t('common.download')}
              </button>
              <button
                onClick={() => setDeleteConfirm({ isOpen: true, id: file.id, name: file.name })}
                className="px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredFiles.length === 0 && (
          <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400">
              {t('admin.files.empty')}
            </p>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: '', name: '' })}
        onConfirm={() => {
          deleteFile(deleteConfirm.id);
          setDeleteConfirm({ isOpen: false, id: '', name: '' });
        }}
        itemName={deleteConfirm.name}
        itemType={t('admin.files.itemType')}
      />
    </div>
  );
}