// src/utils/performance.ts

// Lazy load images
export function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });
  
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
  
  // Preload critical resources
  export function preloadCriticalResources() {
    const criticalResources = [
      '/fonts/main-font.woff2',
      // Add other critical resources
    ];
  
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = resource.endsWith('.woff2') ? 'font' : 'script';
      link.href = resource;
      if (link.as === 'font') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  }
  
  // Measure performance
  export function measurePerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = window.performance.timing;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          const connectTime = perfData.responseEnd - perfData.requestStart;
          const renderTime = perfData.domComplete - perfData.domLoading;
  
          console.log('Performance Metrics:');
          console.log(`Page Load Time: ${pageLoadTime}ms`);
          console.log(`Connect Time: ${connectTime}ms`);
          console.log(`Render Time: ${renderTime}ms`);
  
          // Send to analytics in production
          if (process.env.NODE_ENV === 'production') {
            // Example: sendToAnalytics({ pageLoadTime, connectTime, renderTime });
          }
        }, 0);
      });
    }
  }
  
  // Debounce scroll events
  export function debounceScroll(callback: () => void, delay: number = 100) {
    let timeoutId: NodeJS.Timeout;
    
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  }
  
  // Check if device is mobile
  export function isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  // Get connection speed
  export function getConnectionSpeed(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      return connection.effectiveType || 'unknown';
    }
    
    return 'unknown';
  }
  
  // Optimize for slow connections
  export function optimizeForSlowConnection(): boolean {
    const speed = getConnectionSpeed();
    return speed === 'slow-2g' || speed === '2g';
  }
  