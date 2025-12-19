// src/utils/activityLogger.ts

interface ActivityLog {
    action: string;
    item: string;
    time: string;
    timestamp: number;
  }
  
  const MAX_LOGS = 50;
  const STORAGE_KEY = 'activity_log';
  
  export const activityLogger = {
    // اضافه کردن log جدید
    log(action: string, item: string): void {
      const logs = this.getLogs();
      
      const newLog: ActivityLog = {
        action,
        item,
        time: this.formatTime(Date.now()),
        timestamp: Date.now()
      };
  
      // اضافه کردن log جدید به اول لیست
      const updatedLogs = [newLog, ...logs].slice(0, MAX_LOGS);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
      } catch (error) {
        console.error('Failed to save activity log:', error);
      }
    },
  
    // گرفتن تمام logs
    getLogs(): ActivityLog[] {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (error) {
        console.error('Failed to get activity logs:', error);
      }
      return [];
    },
  
    // گرفتن آخرین N تا log
    getRecentLogs(count: number = 10): ActivityLog[] {
      return this.getLogs().slice(0, count);
    },
  
    // پاک کردن تمام logs
    clearLogs(): void {
      localStorage.removeItem(STORAGE_KEY);
    },
  
    // فرمت زمان
    formatTime(timestamp: number): string {
      const now = Date.now();
      const diff = now - timestamp;
  
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
  
      if (seconds < 60) return 'Just now';
      if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
      
      return new Date(timestamp).toLocaleDateString();
    }
  };
  
  // Helper functions for specific actions
  export const logActivity = {
    // Experience actions
    experienceAdded: (title: string) => 
      activityLogger.log('Added', `Experience: ${title}`),
    
    experienceUpdated: (title: string) => 
      activityLogger.log('Updated', `Experience: ${title}`),
    
    experienceDeleted: (title: string) => 
      activityLogger.log('Deleted', `Experience: ${title}`),
  
    // Skill actions
    skillAdded: (name: string) => 
      activityLogger.log('Added', `Skill: ${name}`),
    
    skillUpdated: (name: string) => 
      activityLogger.log('Updated', `Skill: ${name}`),
    
    skillDeleted: (name: string) => 
      activityLogger.log('Deleted', `Skill: ${name}`),
  
    // Certification actions
    certificationAdded: (title: string) => 
      activityLogger.log('Added', `Certification: ${title}`),
    
    certificationUpdated: (title: string) => 
      activityLogger.log('Updated', `Certification: ${title}`),
    
    certificationDeleted: (title: string) => 
      activityLogger.log('Deleted', `Certification: ${title}`),
  
    // Project actions
    projectAdded: (title: string) => 
      activityLogger.log('Added', `Project: ${title}`),
    
    projectUpdated: (title: string) => 
      activityLogger.log('Updated', `Project: ${title}`),
    
    projectDeleted: (title: string) => 
      activityLogger.log('Deleted', `Project: ${title}`),
  
    // File actions
    fileUploaded: (name: string) => 
      activityLogger.log('Uploaded', `File: ${name}`),
    
    fileDeleted: (name: string) => 
      activityLogger.log('Deleted', `File: ${name}`),
  
    // Settings actions
    passwordChanged: () => 
      activityLogger.log('Changed', 'Admin password'),
    
    themeChanged: (theme: string) => 
      activityLogger.log('Changed', `Theme to ${theme}`),
  
    // Backup actions
    backupCreated: () => 
      activityLogger.log('Created', 'Backup'),
    
    backupRestored: (name: string) => 
      activityLogger.log('Restored', `Backup: ${name}`),
    
    dataExported: (type: string) => 
      activityLogger.log('Exported', `Data: ${type}`),
    
    dataImported: (type: string) => 
      activityLogger.log('Imported', `Data: ${type}`),
  };