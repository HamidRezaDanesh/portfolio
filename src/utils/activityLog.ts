// src/utils/activityLog.ts
// 📝 Activity Log System for tracking user actions

const ACTIVITY_LOG_KEY = 'portfolio_activity_log';
const MAX_ACTIVITIES = 100;

export type ActivityAction = 
  | 'created'
  | 'updated'
  | 'deleted'
  | 'uploaded'
  | 'downloaded'
  | 'exported'
  | 'imported'
  | 'restored'
  | 'login'
  | 'logout'
  | 'viewed';

export type ActivityItemType = 
  | 'experience'
  | 'skill'
  | 'project'
  | 'certification'
  | 'file'
  | 'backup'
  | 'settings'
  | 'personal-info'
  | 'system';

export interface Activity {
  id: string;
  action: ActivityAction;
  itemType: ActivityItemType;
  itemName: string;
  timestamp: string;
  details?: string;
}

export const activityLog = {
  getActivities(): Activity[] {
    try {
      const data = localStorage.getItem(ACTIVITY_LOG_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error('Error reading activity log:', error);
      return [];
    }
  },

  setActivities(activities: Activity[]): void {
    try {
      localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(activities));
    } catch (error) {
      console.error('Error saving activity log:', error);
    }
  },

  // Log a new activity
  log(
    action: ActivityAction,
    itemType: ActivityItemType,
    itemName: string,
    details?: string
  ): void {
    const activities = this.getActivities();

    const newActivity: Activity = {
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      action,
      itemType,
      itemName,
      timestamp: new Date().toISOString(),
      details
    };

    // Add to beginning of array
    activities.unshift(newActivity);

    // Keep only last MAX_ACTIVITIES
    if (activities.length > MAX_ACTIVITIES) {
      activities.splice(MAX_ACTIVITIES);
    }

    this.setActivities(activities);
  },

  // Get recent activities
  getRecent(count: number = 10): Activity[] {
    const activities = this.getActivities();
    return activities.slice(0, count);
  },

  // Get activities by type
  getByType(itemType: ActivityItemType): Activity[] {
    const activities = this.getActivities();
    return activities.filter(a => a.itemType === itemType);
  },

  // Get activities by action
  getByAction(action: ActivityAction): Activity[] {
    const activities = this.getActivities();
    return activities.filter(a => a.action === action);
  },

  // Get activities from today
  getToday(): Activity[] {
    const activities = this.getActivities();
    const today = new Date().toISOString().split('T')[0];
    return activities.filter(a => a.timestamp.startsWith(today));
  },

  // Format timestamp for display
  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  },

  // Get action label
  getActionLabel(action: ActivityAction): string {
    const labels: Record<ActivityAction, string> = {
      created: 'Added',
      updated: 'Updated',
      deleted: 'Deleted',
      uploaded: 'Uploaded',
      downloaded: 'Downloaded',
      exported: 'Exported',
      imported: 'Imported',
      restored: 'Restored',
      login: 'Logged in',
      logout: 'Logged out',
      viewed: 'Viewed'
    };
    return labels[action] || action;
  },

  // Get item type label
  getItemTypeLabel(itemType: ActivityItemType): string {
    const labels: Record<ActivityItemType, string> = {
      experience: 'Experience',
      skill: 'Skill',
      project: 'Project',
      certification: 'Certification',
      file: 'File',
      backup: 'Backup',
      settings: 'Settings',
      'personal-info': 'Personal Info',
      system: 'System'
    };
    return labels[itemType] || itemType;
  },

  // Clear all activities
  clear(): void {
    localStorage.removeItem(ACTIVITY_LOG_KEY);
  },

  // Delete old activities (keep last N days)
  cleanup(days: number = 30): void {
    const activities = this.getActivities();
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const filtered = activities.filter(a => new Date(a.timestamp) >= cutoff);
    this.setActivities(filtered);
  }
};

// Helper functions for common logging scenarios
export const logActivity = {
  create: (itemType: ActivityItemType, itemName: string) => {
    activityLog.log('created', itemType, itemName);
  },

  update: (itemType: ActivityItemType, itemName: string) => {
    activityLog.log('updated', itemType, itemName);
  },

  delete: (itemType: ActivityItemType, itemName: string) => {
    activityLog.log('deleted', itemType, itemName);
  },

  upload: (fileName: string) => {
    activityLog.log('uploaded', 'file', fileName);
  },

  download: (fileName: string) => {
    activityLog.log('downloaded', 'file', fileName);
  },

  export: (type: string) => {
    activityLog.log('exported', 'backup', type);
  },

  import: (type: string) => {
    activityLog.log('imported', 'backup', type);
  },

  backup: (backupName: string) => {
    activityLog.log('created', 'backup', backupName);
  },

  restore: (backupName: string) => {
    activityLog.log('restored', 'backup', backupName);
  },

  login: () => {
    activityLog.log('login', 'system', 'Admin Panel');
  },

  logout: () => {
    activityLog.log('logout', 'system', 'Admin Panel');
  }
};

export default activityLog;