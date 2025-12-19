// src/admin/components/BackupRestore.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Database, 
  Download, 
  Upload, 
  Trash2, 
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { storage } from '../../utils/storage';
import { exportAll, generateBackupName } from '../../utils/exportData';

interface Backup {
  id: string;
  name: string;
  date: string;
  size: number;
  data: string;
}

export default function BackupRestore() {
  const { t } = useTranslation();
  const [backups, setBackups] = useState<Backup[]>(() => {
    const saved = localStorage.getItem('portfolio_backups');
    return saved ? JSON.parse(saved) : [];
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const createBackup = () => {
    try {
      const data = storage.getData();
      const backup: Backup = {
        id: Date.now().toString(),
        name: generateBackupName(),
        date: new Date().toISOString(),
        size: JSON.stringify(data).length,
        data: JSON.stringify(data)
      };

      const newBackups = [backup, ...backups].slice(0, 10); // Keep last 10 backups
      setBackups(newBackups);
      localStorage.setItem('portfolio_backups', JSON.stringify(newBackups));
      
      setMessage({ type: 'success', text: t('admin.backup.created') });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: t('admin.backup.createError') });
    }
  };

  const restoreBackup = (backup: Backup) => {
    const confirm = window.confirm(t('admin.backup.restoreConfirm'));
    if (!confirm) return;

    try {
      const data = JSON.parse(backup.data);
      storage.setData(data);
      setMessage({ type: 'success', text: t('admin.backup.restored') });
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setMessage({ type: 'error', text: t('admin.backup.restoreError') });
    }
  };

  const downloadBackup = (backup: Backup) => {
    const blob = new Blob([backup.data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = backup.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const deleteBackup = (id: string) => {
    const confirm = window.confirm(t('admin.backup.deleteConfirm'));
    if (!confirm) return;

    const newBackups = backups.filter(b => b.id !== id);
    setBackups(newBackups);
    localStorage.setItem('portfolio_backups', JSON.stringify(newBackups));
    setMessage({ type: 'success', text: t('admin.backup.deleted') });
    setTimeout(() => setMessage(null), 3000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatSize = (bytes: number) => {
    return (bytes / 1024).toFixed(2) + ' KB';
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('admin.backup.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('admin.backup.subtitle')}
        </p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg border ${
          message.type === 'success'
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-center gap-2">
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            )}
            <p className={`text-sm ${
              message.type === 'success'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {message.text}
            </p>
          </div>
        </div>
      )}

      <div className="mb-6 flex gap-4">
        <button
          onClick={createBackup}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Database className="h-5 w-5" />
          {t('admin.backup.createNew')}
        </button>

        <button
          onClick={() => exportAll()}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="h-5 w-5" />
          {t('admin.backup.exportNow')}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        {backups.length === 0 ? (
          <div className="p-12 text-center">
            <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {t('admin.backup.noBackups')}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {backups.map((backup) => (
              <div key={backup.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {backup.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDate(backup.date)}
                      </span>
                      <span>{formatSize(backup.size)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => restoreBackup(backup)}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                      title={t('admin.backup.restore')}
                    >
                      <Upload className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => downloadBackup(backup)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title={t('common.download')}
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteBackup(backup.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title={t('common.delete')}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-600 dark:text-yellow-400">
            <p className="font-medium mb-1">{t('admin.backup.important')}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('admin.backup.tip1')}</li>
              <li>{t('admin.backup.tip2')}</li>
              <li>{t('admin.backup.tip3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}