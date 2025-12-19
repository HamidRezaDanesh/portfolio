import { lazy, Suspense, useEffect, startTransition } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { usePageTracking } from './hooks/useAnalytics';
import ErrorBoundary from './components/common/ErrorBoundary';
import { PageLoader } from './components/common/LoadingSpinner';
import SEOHead from './components/common/SEOHead';
import Header from './components/layout/Header';
import { MotionProvider } from './components/motion/LazyMotion';

// ⚡ Lazy load pages with prefetch
const HomePage = lazy(() => import(/* webpackPrefetch: true */ './pages/HomePage'));
const AboutPage = lazy(() => import(/* webpackPrefetch: true */ './pages/AboutPage'));
const ContactPage = lazy(() => import(/* webpackPrefetch: true */ './pages/ContactPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));

// Admin pages
const LoginPage = lazy(() => import(/* webpackChunkName: "admin" */ './pages/LoginPage'));
const AdminPage = lazy(() => import(/* webpackChunkName: "admin" */ './pages/AdminPage'));
const ProtectedRoute = lazy(() => import(/* webpackChunkName: "admin" */ './components/auth/ProtectedRoute'));

// ⚡ Preload critical routes
const preloadCriticalRoutes = () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      import('./pages/AboutPage');
      import('./pages/ContactPage');
    }, { timeout: 2000 });
  } else {
    setTimeout(() => {
      import('./pages/AboutPage');
      import('./pages/ContactPage');
    }, 1000);
  }
};

// ⚡ Prefetch on hover
const usePrefetchOnHover = () => {
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]');
      
      if (link) {
        const href = link.getAttribute('href');
        
        startTransition(() => {
          switch (href) {
            case '/about':
              import('./pages/AboutPage');
              break;
            case '/experience':
              import('./pages/ExperiencePage');
              break;
            case '/skills':
              import('./pages/SkillsPage');
              break;
            case '/projects':
              import('./pages/ProjectsPage');
              break;
            case '/contact':
              import('./pages/ContactPage');
              break;
          }
        });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);
};

// ⚡ Scroll restoration
const useScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
};

// ⚡ AppContent
function AppContent() {
  usePageTracking();
  usePrefetchOnHover();
  useScrollRestoration();

  useEffect(() => {
    preloadCriticalRoutes();
  }, []);

  return (
    <>
      {/* Background */}
      <div className="gradient-mesh-bg" style={{ willChange: 'transform' }}>
        <div className="gradient-mesh-orb1"></div>
        <div className="gradient-mesh-orb2"></div>
        <div className="gradient-mesh-orb3"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <ErrorBoundary
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reload Page
                </button>
              </div>
            </div>
          }
        >
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Home */}
              <Route
                path="/"
                element={
                  <>
                    <SEOHead />
                    <div className="min-h-screen">
                      <Header />
                      <Suspense fallback={<PageLoader />}>
                        <HomePage />
                      </Suspense>
                    </div>
                  </>
                }
              />

              {/* About */}
              <Route
                path="/about"
                element={
                  <>
                    <SEOHead
                      title="About Me"
                      description="Learn more about Hamidreza Daneshsarand - Mechanical Design Engineer with 5+ years of experience in automotive and manufacturing industries"
                      canonical="/about"
                    />
                    <div className="min-h-screen">
                      <Header />
                      <Suspense fallback={<PageLoader />}>
                        <AboutPage />
                      </Suspense>
                    </div>
                  </>
                }
              />

              {/* Experience */}
              <Route
                path="/experience"
                element={
                  <>
                    <SEOHead
                      title="Work Experience"
                      description="Professional experience at ZF AG, SKF, and other leading companies in automotive and manufacturing"
                      canonical="/experience"
                    />
                    <div className="min-h-screen">
                      <Header />
                      <Suspense fallback={<PageLoader />}>
                        <ExperiencePage />
                      </Suspense>
                    </div>
                  </>
                }
              />

              {/* Skills */}
              <Route
                path="/skills"
                element={
                  <>
                    <SEOHead
                      title="Skills & Certifications"
                      description="Technical skills in SolidWorks, CAD, manufacturing, quality control, and professional certifications"
                      canonical="/skills"
                    />
                    <div className="min-h-screen">
                      <Header />
                      <Suspense fallback={<PageLoader />}>
                        <SkillsPage />
                      </Suspense>
                    </div>
                  </>
                }
              />

              {/* Projects */}
              <Route
                path="/projects"
                element={
                  <>
                    <SEOHead
                      title="Projects Portfolio"
                      description="Engineering projects and achievements in automotive design, manufacturing optimization, and quality systems"
                      canonical="/projects"
                    />
                    <div className="min-h-screen">
                      <Header />
                      <Suspense fallback={<PageLoader />}>
                        <ProjectsPage />
                      </Suspense>
                    </div>
                  </>
                }
              />

              {/* Contact */}
              <Route
                path="/contact"
                element={
                  <>
                    <SEOHead
                      title="Contact Me"
                      description="Get in touch for opportunities in Sweden - Available for immediate relocation. Open to mechanical design and engineering roles"
                      canonical="/contact"
                    />
                    <div className="min-h-screen">
                      <Header />
                      <Suspense fallback={<PageLoader />}>
                        <ContactPage />
                      </Suspense>
                    </div>
                  </>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/login"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <LoginPage />
                  </Suspense>
                }
              />

              <Route
                path="/admin/dashboard"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  </Suspense>
                }
              />

              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}

// ⚡ Main App
function App() {
  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Application Error
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're sorry, but something went wrong. Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      }
    >
      <ThemeProvider>
        <AuthProvider>
          <MotionProvider>
            <Router>
              <AppContent />
            </Router>
          </MotionProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;