// src/utils/auth.ts

export const AUTH_KEYS = {
    SESSION: 'admin_session',
    SESSION_TIME: 'admin_session_time',
    LOGIN_ATTEMPTS: 'login_attempts',
    LOCKOUT_TIME: 'lockout_time',
  } as const;
  
  export const AUTH_CONFIG = {
    MAX_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000,
    SESSION_DURATION: 60 * 60 * 1000,
    ADMIN_PASSWORD: 'portfolio2024',
  } as const;
  
  export function isSessionValid(): boolean {
    const session = localStorage.getItem(AUTH_KEYS.SESSION);
    const sessionTime = localStorage.getItem(AUTH_KEYS.SESSION_TIME);
  
    if (session !== 'active' || !sessionTime) {
      return false;
    }
  
    const timestamp = parseInt(sessionTime);
    const elapsed = Date.now() - timestamp;
  
    return elapsed < AUTH_CONFIG.SESSION_DURATION;
  }
  
  export function getRemainingSessionTime(): number {
    const sessionTime = localStorage.getItem(AUTH_KEYS.SESSION_TIME);
    
    if (!sessionTime) {
      return 0;
    }
  
    const timestamp = parseInt(sessionTime);
    const elapsed = Date.now() - timestamp;
    const remaining = AUTH_CONFIG.SESSION_DURATION - elapsed;
  
    return Math.max(0, remaining);
  }
  
  export function isAccountLocked(): boolean {
    const lockoutTime = localStorage.getItem(AUTH_KEYS.LOCKOUT_TIME);
    
    if (!lockoutTime) {
      return false;
    }
  
    const lockoutTimestamp = parseInt(lockoutTime);
    return Date.now() < lockoutTimestamp;
  }
  
  export function getRemainingLockoutTime(): number {
    const lockoutTime = localStorage.getItem(AUTH_KEYS.LOCKOUT_TIME);
    
    if (!lockoutTime) {
      return 0;
    }
  
    const lockoutTimestamp = parseInt(lockoutTime);
    const remaining = lockoutTimestamp - Date.now();
  
    return Math.max(0, remaining);
  }
  
  export function getLoginAttempts(): number {
    const attempts = localStorage.getItem(AUTH_KEYS.LOGIN_ATTEMPTS);
    return attempts ? parseInt(attempts) : 0;
  }
  
  export function clearAuthData(): void {
    localStorage.removeItem(AUTH_KEYS.SESSION);
    localStorage.removeItem(AUTH_KEYS.SESSION_TIME);
    localStorage.removeItem(AUTH_KEYS.LOGIN_ATTEMPTS);
    localStorage.removeItem(AUTH_KEYS.LOCKOUT_TIME);
  }
  
  export function formatTimeRemaining(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }