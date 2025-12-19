// src/admin/components/Settings.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Key, 
  Palette, 
  Globe, 
  Shield, 
  Bell,
  Save,
  AlertCircle
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { changePassword } = useAuth();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [defaultLanguage, setDefaultLanguage] = useState(i18n.language);
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    backupReminders: true,
    securityAlerts: true
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword.length < 8) {
      setPasswordMessage({ type: 'error', text: t('admin.settings.passwordTooShort') });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: t('admin.settings.passwordMismatch') });
      return;
    }

    try {
      const success = changePassword(currentPassword, newPassword);
      
      if (!success) {
        setPasswordMessage({ type: 'error', text: t('admin.settings.wrongPassword') });
        return;
      }
      
      setPasswordMessage({ type: 'success', text: t('admin.settings.passwordChanged') });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      setTimeout(() => setPasswordMessage(null), 3000);
    } catch (error) {
      setPasswordMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to change password' 
      });
    }
  };

  const handleLanguageChange = (lang: string) => {
    setDefaultLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('preferred_language', lang);
  };

  const handleSaveNotifications = () => {
    localStorage.setItem('notification_settings', JSON.stringify(notifications));
    setPasswordMessage({ type: 'success', text: t('admin.settings.settingsSaved') });
    setTimeout(() => setPasswordMessage(null), 3000);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('admin.settings.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('admin.settings.subtitle')}
        </p>
      </div>

      {passwordMessage && (
        <div className={`mb-6 p-4 rounded-lg border ${
          passwordMessage.type === 'success'
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-center gap-2">
            {passwordMessage.type === 'success' ? (
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            )}
            <p className={`text-sm ${
              passwordMessage.type === 'success'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {passwordMessage.text}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Password Change */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <Key className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('admin.settings.changePassword')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('admin.settings.passwordDescription')}
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.settings.currentPassword')}
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.settings.newPassword')}
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                minLength={8}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.settings.confirmPassword')}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {t('admin.settings.updatePassword')}
            </button>
          </form>
        </div>

        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('admin.settings.appearance')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('admin.settings.appearanceDescription')}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              {t('admin.settings.darkMode')}
            </span>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('admin.settings.language')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('admin.settings.languageDescription')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`p-4 rounded-lg border-2 transition-all ${
                defaultLanguage === 'en'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="text-2xl mb-2">🇺🇸</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                English
              </div>
            </button>

            <button
              onClick={() => handleLanguageChange('sv')}
              className={`p-4 rounded-lg border-2 transition-all ${
                defaultLanguage === 'sv'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="text-2xl mb-2">🇸🇪</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Svenska
              </div>
            </button>

            <button
              onClick={() => handleLanguageChange('fa')}
              className={`p-4 rounded-lg border-2 transition-all ${
                defaultLanguage === 'fa'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="text-2xl mb-2">🇮🇷</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                فارسی
              </div>
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Bell className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('admin.settings.notifications')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('admin.settings.notificationsDescription')}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                {t('admin.settings.emailUpdates')}
              </span>
              <input
                type="checkbox"
                checked={notifications.emailUpdates}
                onChange={(e) => setNotifications({ ...notifications, emailUpdates: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                {t('admin.settings.backupReminders')}
              </span>
              <input
                type="checkbox"
                checked={notifications.backupReminders}
                onChange={(e) => setNotifications({ ...notifications, backupReminders: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                {t('admin.settings.securityAlerts')}
              </span>
              <input
                type="checkbox"
                checked={notifications.securityAlerts}
                onChange={(e) => setNotifications({ ...notifications, securityAlerts: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <button
              onClick={handleSaveNotifications}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-5 w-5" />
              {t('admin.settings.saveSettings')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}