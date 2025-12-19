// src/admin/components/modals/CertificationModal.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Certification } from '../../../types/admin.types';

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (certification: Omit<Certification, 'id'> | Certification) => void;
  certification?: Certification;
}

export default function CertificationModal({
  isOpen,
  onClose,
  onSave,
  certification
}: CertificationModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Omit<Certification, 'id'>>({
    title: '',
    issuer: '',
    date: '',
    credentialUrl: '',
    credentialId: ''
  });

  useEffect(() => {
    if (certification) {
      setFormData(certification);
    } else {
      setFormData({
        title: '',
        issuer: '',
        date: '',
        credentialUrl: '',
        credentialId: ''
      });
    }
  }, [certification, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = certification 
      ? { ...formData, id: certification.id }
      : formData;
    onSave(dataToSave);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {certification 
              ? (t('admin.modal.editCertification') || 'Edit Certification')
              : (t('admin.modal.addCertification') || 'Add Certification')
            }
          </h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('admin.form.certificationTitle') || 'Certification Title'} *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Six Sigma Green Belt"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('admin.form.issuer') || 'Issuing Organization'} *
            </label>
            <input
              type="text"
              value={formData.issuer}
              onChange={e => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Coursera, University Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('admin.form.issueDate') || 'Issue Date'} *
            </label>
            <input
              type="month"
              value={formData.date}
              onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('admin.form.credentialUrl') || 'Credential URL'}
            </label>
            <input
              type="url"
              value={formData.credentialUrl}
              onChange={e => setFormData(prev => ({ ...prev, credentialUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="https://coursera.org/verify/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('admin.form.credentialId') || 'Credential ID'}
            </label>
            <input
              type="text"
              value={formData.credentialId}
              onChange={e => setFormData(prev => ({ ...prev, credentialId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Optional credential ID"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {t('common.cancel') || 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('common.save') || 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}