// src/utils/validation.ts

export const validation = {
    email: (email: string): boolean => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email.toLowerCase());
    },
  
    phone: (phone: string): boolean => {
      const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      return re.test(phone);
    },
  
    url: (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    },
  
    required: (value: any): boolean => {
      if (value === null || value === undefined) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return true;
    },
  
    minLength: (value: string, min: number): boolean => {
      return value.length >= min;
    },
  
    maxLength: (value: string, max: number): boolean => {
      return value.length <= max;
    },
  
    password: (password: string): { valid: boolean; errors: string[] } => {
      const errors: string[] = [];
      
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
      }
      
      return {
        valid: errors.length === 0,
        errors
      };
    },
  
    fileSize: (file: File, maxSizeMB: number): boolean => {
      const maxSize = maxSizeMB * 1024 * 1024;
      return file.size <= maxSize;
    },
  
    fileType: (file: File, allowedTypes: string[]): boolean => {
      return allowedTypes.includes(file.type);
    }
  };