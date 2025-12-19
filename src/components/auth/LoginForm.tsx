// src/components/auth/LoginForm.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Lock, AlertCircle, Clock } from 'lucide-react';

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { t } = useTranslation();
  const { login, loginAttempts, isLocked, lockoutTime } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (isLocked && lockoutTime) {
      const updateTimer = setInterval(() => {
        const remaining = Math.max(0, lockoutTime - Date.now());
        setRemainingTime(remaining);
        
        if (remaining === 0) {
          setError('');
        }
      }, 1000);

      return () => clearInterval(updateTimer);
    }
  }, [isLocked, lockoutTime]);

  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(t('admin.login.lockedMessage'));
      return;
    }

    if (!password.trim()) {
      setError(t('admin.login.emptyPassword'));
      return;
    }

    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(password);

    if (success) {
      onSuccess();
    } else {
      setPassword('');
      const remainingAttempts = 5 - (loginAttempts + 1);
      
      if (remainingAttempts > 0) {
        setError(`${t('admin.login.wrongPassword')} ${remainingAttempts} ${t('admin.login.attemptsRemaining')}`);
      } else {
        setError(t('admin.login.accountLocked'));
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('admin.login.password')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLocked || isLoading}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed
                       transition-colors"
              placeholder={t('admin.login.enterPassword')}
              autoComplete="current-password"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLocked}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {isLocked && remainingTime > 0 && (
          <div className="flex items-center gap-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              {t('admin.login.tryAgainIn')} {formatTime(remainingTime)}
            </p>
          </div>
        )}

        {!isLocked && loginAttempts > 0 && loginAttempts < 5 && (
          <div className="text-sm text-yellow-600 dark:text-yellow-400 text-center">
            {t('admin.login.attempts')}: {loginAttempts}/5
          </div>
        )}

        <button
          type="submit"
          disabled={isLocked || isLoading || !password.trim()}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 
                   hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600
                   transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {t('admin.login.loggingIn')}
            </span>
          ) : (
            t('admin.login.loginButton')
          )}
        </button>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-300 text-center">
            <strong>{t('admin.login.demoInfo')}</strong>
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 text-center mt-2">
            {t('admin.login.demoPassword')}: <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">portfolio2024</code>
          </p>
        </div>
      </form>
    </div>
  );
}