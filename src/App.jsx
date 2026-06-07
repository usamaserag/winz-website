import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import { CookieProvider } from './context/CookieContext';
import CookieConsentGate from './components/cookies/CookieConsentGate';
import ConsentAwareVisitorTracker from './components/cookies/ConsentAwareVisitorTracker';
import PageLoader from './components/common/PageLoader';
import { useDocumentLanguage } from './hooks/useDocumentLanguage';
import Home from './pages/Home/Home';
const Contact = lazy(() => import('./pages/Contact/Contact'));
const About = lazy(() => import('./pages/About/About'));
const Services = lazy(() => import('./pages/Services/Services'));
const Import = lazy(() => import('./pages/Import/Import'));
const Export = lazy(() => import('./pages/Export/Export'));
const Transit = lazy(() => import('./pages/Transit/Transit'));
const Transport = lazy(() => import('./pages/Transport/Transport'));
const WarehousePage = lazy(() => import('./pages/Warehouse/Warehouse'));
const Blog = lazy(() => import('./pages/Blog/Blog'));
const BlogDetail = lazy(() => import('./pages/Blog/BlogDetail'));
const FAQ = lazy(() => import('./pages/FAQ/FAQ'));
const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'));
const CookiesPolicy = lazy(() => import('./pages/Legal/CookiesPolicy'));

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="import" element={<Import />} />
          <Route path="export" element={<Export />} />
          <Route path="transit" element={<Transit />} />
          <Route path="transport" element={<Transport />} />
          <Route path="warehouse" element={<WarehousePage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="cookies-policy" element={<CookiesPolicy />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

function App() {
  useDocumentLanguage();

  return (
    <CookieProvider>
      <ConsentAwareVisitorTracker />
      <BrowserRouter>
        <ScrollToTop />
        <CookieConsentGate>
          <AppRoutes />
        </CookieConsentGate>
      </BrowserRouter>
    </CookieProvider>
  );
}

export default App;
