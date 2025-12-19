// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
  loginAttempts: number;
  isLocked: boolean;
  lockoutTime: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_PASSWORD = 'portfolio2024';
const PASSWORD_KEY = 'admin_password_hash';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

interface AuthProviderProps {
  children: ReactNode;
}

// تابع ساده برای هش کردن رمز (برای امنیت بیشتر)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return btoa(hash.toString() + str.length);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // گرفتن رمز ذخیره شده یا استفاده از رمز پیش‌فرض
  const getStoredPassword = useCallback((): string => {
    const storedHash = localStorage.getItem(PASSWORD_KEY);
    if (!storedHash) {
      // اگر رمز ذخیره نشده، رمز پیش‌فرض را هش کرده و ذخیره می‌کنیم
      const defaultHash = simpleHash(DEFAULT_PASSWORD);
      localStorage.setItem(PASSWORD_KEY, defaultHash);
      return defaultHash;
    }
    return storedHash;
  }, []);

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    const sessionTime = localStorage.getItem('admin_session_time');
    const attempts = localStorage.getItem('login_attempts');
    const lockout = localStorage.getItem('lockout_time');

    if (attempts) {
      setLoginAttempts(parseInt(attempts));
    }

    if (lockout) {
      const lockoutTimestamp = parseInt(lockout);
      if (Date.now() < lockoutTimestamp) {
        setIsLocked(true);
        setLockoutTime(lockoutTimestamp);
      } else {
        localStorage.removeItem('lockout_time');
        localStorage.removeItem('login_attempts');
        setLoginAttempts(0);
      }
    }

    if (session === 'active' && sessionTime) {
      const sessionTimestamp = parseInt(sessionTime);
      if (Date.now() - sessionTimestamp < SESSION_DURATION) {
        setIsAuthenticated(true);
        setLastActivity(Date.now());
      } else {
        logout();
      }
    }
  }, []);

  // ⚡ CRITICAL FIX: Memoize logout function
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setLastActivity(Date.now());
    localStorage.removeItem('admin_session');
    localStorage.removeItem('admin_session_time');
    // ⚠️ CRITICAL: عمداً PASSWORD_KEY رو پاک نمی‌کنیم تا رمز تغییر یافته حفظ بشه
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const checkActivity = setInterval(() => {
      if (Date.now() - lastActivity > SESSION_DURATION) {
        logout();
      }
    }, 60000);

    return () => clearInterval(checkActivity);
  }, [isAuthenticated, lastActivity, logout]);

  useEffect(() => {
    if (!isLocked || !lockoutTime) return;

    const checkLockout = setInterval(() => {
      if (Date.now() >= lockoutTime) {
        setIsLocked(false);
        setLockoutTime(null);
        setLoginAttempts(0);
        localStorage.removeItem('lockout_time');
        localStorage.removeItem('login_attempts');
      }
    }, 1000);

    return () => clearInterval(checkLockout);
  }, [isLocked, lockoutTime]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const updateActivity = () => {
      setLastActivity(Date.now());
    };

    window.addEventListener('mousedown', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('scroll', updateActivity);
    window.addEventListener('touchstart', updateActivity);

    return () => {
      window.removeEventListener('mousedown', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('scroll', updateActivity);
      window.removeEventListener('touchstart', updateActivity);
    };
  }, [isAuthenticated]);

  // ⚡ CRITICAL FIX: Memoize login function
  const login = useCallback((password: string): boolean => {
    if (isLocked) {
      return false;
    }

    const storedPasswordHash = getStoredPassword();
    const inputPasswordHash = simpleHash(password);

    if (inputPasswordHash === storedPasswordHash) {
      setIsAuthenticated(true);
      setLoginAttempts(0);
      setLastActivity(Date.now());
      localStorage.setItem('admin_session', 'active');
      localStorage.setItem('admin_session_time', Date.now().toString());
      localStorage.removeItem('login_attempts');
      localStorage.removeItem('lockout_time');
      return true;
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem('login_attempts', newAttempts.toString());

      if (newAttempts >= MAX_ATTEMPTS) {
        const lockoutTimestamp = Date.now() + LOCKOUT_DURATION;
        setIsLocked(true);
        setLockoutTime(lockoutTimestamp);
        localStorage.setItem('lockout_time', lockoutTimestamp.toString());
      }

      return false;
    }
  }, [isLocked, loginAttempts, getStoredPassword]);

  // ⚡ CRITICAL FIX: Memoize changePassword function
  const changePassword = useCallback((currentPassword: string, newPassword: string): boolean => {
    const storedPasswordHash = getStoredPassword();
    const currentPasswordHash = simpleHash(currentPassword);

    // چک کردن رمز فعلی
    if (currentPasswordHash !== storedPasswordHash) {
      return false;
    }

    // ذخیره رمز جدید
    const newPasswordHash = simpleHash(newPassword);
    localStorage.setItem(PASSWORD_KEY, newPasswordHash);
    
    return true;
  }, [getStoredPassword]);

  // ⚡ CRITICAL FIX: Memoize context value
  const value = useMemo(() => ({
    isAuthenticated,
    login,
    logout,
    changePassword,
    loginAttempts,
    isLocked,
    lockoutTime,
  }), [isAuthenticated, login, logout, changePassword, loginAttempts, isLocked, lockoutTime]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
