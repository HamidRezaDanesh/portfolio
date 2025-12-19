// src/utils/analytics.ts
// 📊 Analytics System for tracking views and statistics

const ANALYTICS_KEY = 'portfolio_analytics';

export interface PageView {
  page: string;
  timestamp: string;
  sessionId: string;
}

export interface AnalyticsData {
  totalViews: number;
  pageViews: Record<string, number>;
  dailyViews: Record<string, number>;
  weeklyViews: number;
  monthlyViews: number;
  lastVisit: string;
  sessions: string[];
}

// Generate a unique session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get or create session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('portfolio_session');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('portfolio_session', sessionId);
  }
  return sessionId;
}

// Get current date string
function getDateString(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

// Get week number
export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export const analytics = {
  getData(): AnalyticsData {
    try {
      const data = localStorage.getItem(ANALYTICS_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // ✅ Ensure all fields exist
        return {
          totalViews: parsed.totalViews || 0,
          pageViews: parsed.pageViews || {},
          dailyViews: parsed.dailyViews || {},
          weeklyViews: parsed.weeklyViews || 0,
          monthlyViews: parsed.monthlyViews || 0,
          lastVisit: parsed.lastVisit || '',
          sessions: parsed.sessions || []
        };
      }
      return this.getDefaultData();
    } catch (error) {
      console.error('Error reading analytics data:', error);
      return this.getDefaultData();
    }
  },

  setData(data: AnalyticsData): void {
    try {
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving analytics data:', error);
    }
  },

  getDefaultData(): AnalyticsData {
    return {
      totalViews: 0,
      pageViews: {},
      dailyViews: {},
      weeklyViews: 0,
      monthlyViews: 0,
      lastVisit: '',
      sessions: []
    };
  },

  // Track a page view
  trackPageView(page: string = 'home'): void {
    const data = this.getData();
    const sessionId = getSessionId();
    const today = getDateString();

    // Increment total views
    data.totalViews += 1;

    // Increment page-specific views
    data.pageViews[page] = (data.pageViews[page] || 0) + 1;

    // Increment daily views
    data.dailyViews[today] = (data.dailyViews[today] || 0) + 1;

    // Update last visit
    data.lastVisit = new Date().toISOString();

    // Track unique sessions
    if (!data.sessions.includes(sessionId)) {
      data.sessions.push(sessionId);
      // Keep only last 1000 sessions
      if (data.sessions.length > 1000) {
        data.sessions = data.sessions.slice(-1000);
      }
    }

    // Calculate weekly and monthly views
    this.calculatePeriodViews(data);

    this.setData(data);
  },

  // Calculate weekly and monthly views
  calculatePeriodViews(data: AnalyticsData): void {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let weeklyViews = 0;
    let monthlyViews = 0;

    const dailyViews = data.dailyViews || {};
    Object.entries(dailyViews).forEach(([dateStr, views]) => {
      const date = new Date(dateStr);
      if (date >= weekAgo) {
        weeklyViews += views;
      }
      if (date >= monthAgo) {
        monthlyViews += views;
      }
    });

    data.weeklyViews = weeklyViews;
    data.monthlyViews = monthlyViews;
  },

  // Get statistics
  getStats(): {
    totalViews: number;
    weeklyViews: number;
    monthlyViews: number;
    todayViews: number;
    uniqueSessions: number;
    topPages: { page: string; views: number }[];
    trend: string;
  } {
    const data = this.getData();
    const today = getDateString();
    const yesterday = getDateString(new Date(Date.now() - 86400000));

    // ✅ Safe checks for undefined
    const dailyViews = data.dailyViews || {};
    const todayViews = dailyViews[today] || 0;
    const yesterdayViews = dailyViews[yesterday] || 0;

    // Calculate trend
    let trend = '+0%';
    if (yesterdayViews > 0) {
      const change = ((todayViews - yesterdayViews) / yesterdayViews) * 100;
      trend = `${change >= 0 ? '+' : ''}${change.toFixed(0)}%`;
    } else if (todayViews > 0) {
      trend = '+100%';
    }

    // Get top pages
    const pageViews = data.pageViews || {};
    const topPages = Object.entries(pageViews)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    return {
      totalViews: data.totalViews || 0,
      weeklyViews: data.weeklyViews || 0,
      monthlyViews: data.monthlyViews || 0,
      todayViews,
      uniqueSessions: (data.sessions || []).length,
      topPages,
      trend
    };
  },

  // Get views for last N days
  getViewsHistory(days: number = 7): { date: string; views: number }[] {
    const data = this.getData();
    const history: { date: string; views: number }[] = [];
    const dailyViews = data.dailyViews || {};

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000);
      const dateStr = getDateString(date);
      history.push({
        date: dateStr,
        views: dailyViews[dateStr] || 0
      });
    }

    return history;
  },

  // Clear old data (keep last 90 days)
  cleanupOldData(): void {
    const data = this.getData();
    const cutoffDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const cutoffStr = getDateString(cutoffDate);

    const dailyViews = data.dailyViews || {};
    const newDailyViews: Record<string, number> = {};
    Object.entries(dailyViews).forEach(([date, views]) => {
      if (date >= cutoffStr) {
        newDailyViews[date] = views;
      }
    });

    data.dailyViews = newDailyViews;
    this.setData(data);
  },

  // Reset all analytics
  reset(): void {
    localStorage.removeItem(ANALYTICS_KEY);
  }
};

export default analytics;