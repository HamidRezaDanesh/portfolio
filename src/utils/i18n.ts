// src/utils/i18n.ts
export function getStringArray(value: any): string[] {
    if (Array.isArray(value)) {
      return value.map(item => String(item));
    }
    return [];
  }