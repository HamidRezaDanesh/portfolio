// src/hooks/useAnalytics.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook for tracking page views
 * In production, you can connect this to Google Analytics, Plausible, or other analytics services
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    trackPageView(location.pathname + location.search);
  }, [location]);
}

/**
 * Track page view - Can be connected to analytics service
 */
function trackPageView(page: string) {
  // Development: Just log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('Page view:', page);
  }

  // Production: Send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example for Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: page,
      });
    }

    // Example for Plausible Analytics
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('pageview');
    }
  }
}

/**
 * Track custom events
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Event tracked:', eventName, eventData);
  }

  if (process.env.NODE_ENV === 'production') {
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, eventData);
    }

    // Plausible Analytics
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(eventName, { props: eventData });
    }
  }
}

/**
 * Track button clicks
 */
export function useTrackClick(eventName: string, eventData?: Record<string, any>) {
  return () => trackEvent(eventName, eventData);
}

/**
 * Hook to track component mount/unmount
 */
export function useTrackComponent(componentName: string) {
  useEffect(() => {
    trackEvent('component_mounted', { component: componentName });

    return () => {
      trackEvent('component_unmounted', { component: componentName });
    };
  }, [componentName]);
}

/**
 * Track form submissions
 */
export function trackFormSubmission(formName: string, success: boolean, data?: Record<string, any>) {
  trackEvent('form_submission', {
    form_name: formName,
    success,
    ...data,
  });
}

/**
 * Track file downloads
 */
export function trackDownload(fileName: string, fileType: string) {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
}

/**
 * Track errors
 */
export function trackError(errorName: string, errorMessage: string, errorStack?: string) {
  trackEvent('error', {
    error_name: errorName,
    error_message: errorMessage,
    error_stack: errorStack,
  });
}

/**
 * Track user timing (performance)
 */
export function trackTiming(category: string, variable: string, value: number) {
  if (process.env.NODE_ENV === 'production') {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'timing_complete', {
        name: variable,
        value: value,
        event_category: category,
      });
    }
  }
}