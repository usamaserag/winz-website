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
const CommercialModel = lazy(() => import('./pages/CommercialModel/CommercialModel'));

// Specialized Services & Solutions
const AirFreight = lazy(() => import('./pages/Services/AirFreight'));
const RoadFreight = lazy(() => import('./pages/Services/RoadFreight'));
const FCLClearance = lazy(() => import('./pages/Services/FCL'));
const LCLClearance = lazy(() => import('./pages/Services/LCLClearance'));
const FastTrack = lazy(() => import('./pages/Services/FastTrack'));
const HSCode = lazy(() => import('./pages/Services/HSCode'));

// Ports & Airports
const PortAntwerp = lazy(() => import('./pages/Services/PortAntwerp'));
const PortRotterdam = lazy(() => import('./pages/Services/PortRotterdam'));
const BrusselsAirport = lazy(() => import('./pages/Services/BrusselsAirport'));
const PortHamburg = lazy(() => import('./pages/Services/PortHamburg'));
const AmsterdamSchiphol = lazy(() => import('./pages/Services/AmsterdamSchiphol'));
const Zele = lazy(() => import('./pages/Services/Zele'));
const ImportTurkey = lazy(() => import('./pages/Services/ImportTurkey'));
const ImportChina = lazy(() => import('./pages/Services/ImportChina'));
const ImportUae = lazy(() => import('./pages/Services/ImportUae'));
const ImportNigeria = lazy(() => import('./pages/Services/ImportNigeria'));
const ImportSouthAfrica = lazy(() => import('./pages/Services/ImportSouthAfrica'));
const ImportEgypt = lazy(() => import('./pages/Services/ImportEgypt'));
const ImportUkraine = lazy(() => import('./pages/Services/ImportUkraine'));
const ImportBrazil = lazy(() => import('./pages/Services/ImportBrazil'));
const ImportSaudi = lazy(() => import('./pages/Services/ImportSaudi'));

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
            
            <Route path="air-freight-customs-clearance" element={<AirFreight />} />
            <Route path="road-freight-customs-clearance" element={<RoadFreight />} />
            <Route path="fcl-customs-clearance" element={<FCLClearance />} />
            <Route path="lcl-customs-clearance" element={<LCLClearance />} />
            <Route path="fast-track-customs-clearance" element={<FastTrack />} />
            <Route path="hs-code-classification" element={<HSCode />} />

            <Route path="customs-clearance-port-of-antwerp" element={<PortAntwerp />} />
            <Route path="customs-clearance-rotterdam-port" element={<PortRotterdam />} />
            <Route path="customs-clearance-brussels-airport" element={<BrusselsAirport />} />
            <Route path="customs-clearance-port-of-hamburg" element={<PortHamburg />} />
            <Route path="customs-clearance-amsterdam-schiphol" element={<AmsterdamSchiphol />} />
            
            <Route path="customs-broker-zele-belgium" element={<Zele />} />
            <Route path="importing-from-turkey-to-belgium" element={<ImportTurkey />} />
            <Route path="importing-from-china-to-belgium" element={<ImportChina />} />
            <Route path="importing-from-uae-to-belgium" element={<ImportUae />} />
            <Route path="importing-from-nigeria-to-eu" element={<ImportNigeria />} />
            <Route path="importing-from-south-africa-to-eu" element={<ImportSouthAfrica />} />
            <Route path="importing-from-egypt-to-eu" element={<ImportEgypt />} />
            <Route path="importing-from-ukraine-to-belgium" element={<ImportUkraine />} />
            <Route path="importing-from-brazil-to-belgium" element={<ImportBrazil />} />
            <Route path="importing-from-saudi-arabia-to-eu" element={<ImportSaudi />} />

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
            <Route path="commercial-model" element={<CommercialModel />} />
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
