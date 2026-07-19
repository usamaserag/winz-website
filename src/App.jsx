import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import { CookieProvider } from './context/CookieContext';
import CookieConsentGate from './components/cookies/CookieConsentGate';
import ConsentAwareVisitorTracker from './components/cookies/ConsentAwareVisitorTracker';
import PageLoader from './components/common/PageLoader';
import { useDocumentLanguage } from './hooks/useDocumentLanguage';
import LocaleLayout from './components/routing/LocaleLayout';
import RootRedirect from './components/routing/RootRedirect';
import LegacyRedirect from './components/routing/LegacyRedirect';
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
const FAQDetail = lazy(() => import('./pages/FAQ/FAQDetail'));
const Categories = lazy(() => import('./pages/Categories/Categories'));
const CategoryDetail = lazy(() => import('./pages/Categories/CategoryDetail'));
const SubcategoryDetail = lazy(() => import('./pages/Categories/SubcategoryDetail'));
const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'));
const CookiesPolicy = lazy(() => import('./pages/Legal/CookiesPolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        <Route path="/:lang" element={<LocaleLayout />}>
          <Route element={<MainLayout />}>
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
            <Route path="faq/:slug" element={<FAQDetail />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:slug" element={<CategoryDetail />} />
            <Route path="subcategories/:slug" element={<SubcategoryDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="cookies-policy" element={<CookiesPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="*" element={<LegacyRedirect />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  useDocumentLanguage();

  return (
    <CookieProvider>
      <ConsentAwareVisitorTracker />
      <ScrollToTop />
      <CookieConsentGate>
        <AppRoutes />
      </CookieConsentGate>
    </CookieProvider>
  );
}

export default App;
