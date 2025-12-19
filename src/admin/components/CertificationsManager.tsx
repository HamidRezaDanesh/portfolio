// src/admin/components/CertificationsManager.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, ExternalLink, Award } from 'lucide-react';
import { useCRUD } from '../hooks/useCRUD';
import { Certification } from '../../types/admin.types';
import CertificationModal from './modals/CertificationModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';

export default function CertificationsManager() {
  const { t } = useTranslation();
  const { items: certifications, create, update, remove } = useCRUD<Certification>('certifications');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState<Certification | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: '',
    name: ''
  });

  const handleSave = (certification: Omit<Certification, 'id'> | Certification) => {
    if ('id' in certification) {
      update(certification.id, certification);
    } else {
      create(certification);
    }
    setEditingCertification(undefined);
  };

  const handleEdit = (certification: Certification) => {
    setEditingCertification(certification);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    remove(id);
    setDeleteConfirm({ isOpen: false, id: '', name: '' });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('admin.certifications.title') || 'Certifications Management'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('admin.certifications.subtitle') || 'Manage your professional certifications and credentials'}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCertification(undefined);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          {t('admin.certifications.addNew') || 'Add Certification'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 flex-shrink-0 ml-2">
                <button
                  onClick={() => handleEdit(cert)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title={t('common.edit') || 'Edit'}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm({ isOpen: true, id: cert.id, name: cert.title })}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title={t('common.delete') || 'Delete'}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">{t('admin.certifications.issueDate') || 'Issued'}:</span>
                <span>{cert.date}</span>
              </div>

              {cert.credentialId && (
                <div className="text-xs text-gray-500 dark:text-gray-500 font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700">
                  ID: {cert.credentialId}
                </div>
              )}

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-sm font-medium"
                >
                  {t('admin.certifications.verifyCredential') || 'Verify Credential'}
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        ))}

        {certifications.length === 0 && (
          <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {t('admin.certifications.empty') || 'No certifications yet. Add your first certification!'}
            </p>
          </div>
        )}
      </div>

      <CertificationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCertification(undefined);
        }}
        onSave={handleSave}
        certification={editingCertification}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: '', name: '' })}
        onConfirm={() => handleDelete(deleteConfirm.id)}
        itemName={deleteConfirm.name}
        itemType={t('admin.certifications.itemType') || 'certification'}
      />
    </div>
  );
}