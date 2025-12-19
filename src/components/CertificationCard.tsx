import { useTranslation } from 'react-i18next';
import { Award, ExternalLink, Calendar } from 'lucide-react';

interface CertificationCardProps {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  certificateFile?: string;
}

export default function CertificationCard({
  title,
  issuer,
  date,
  credentialUrl,
  certificateFile,
}: CertificationCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
      {/* Icon */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <Award className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-primary-600 dark:text-primary-400 font-medium text-sm">
            {issuer}
          </p>
        </div>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Calendar className="w-4 h-4" />
        <span>{t('skills.issued')}: {date}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors text-sm font-medium"
          >
            {t('skills.verify')}
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        {certificateFile && (
          <a
            href={certificateFile}
            download
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            {t('skills.viewCertificate')}
          </a>
        )}
      </div>
    </div>
  );
}