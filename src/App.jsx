import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";

import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Tracking from "./pages/Tracking/Tracking";
import Import from "./pages/Import/Import";
import Export from "./pages/Export/Export";
import Transit from "./pages/Transit/Transit";
import Transport from "./pages/Transport/Transport";
import WarehousePage from "./pages/Warehouse/Warehouse";
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/Blog/BlogDetail";
import FAQ from "./pages/FAQ/FAQ";
import ScrollToTop from "./components/ScrollToTop";
import { CookieProvider } from "./context/CookieContext";
import CookieConsentGate from "./components/cookies/CookieConsentGate";
import ConsentAwareVisitorTracker from "./components/cookies/ConsentAwareVisitorTracker";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import CookiesPolicy from "./pages/Legal/CookiesPolicy";

function App() {

  // Language is always English — set document attributes once on mount
  useEffect(() => {
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
  }, []);

  return (
    <CookieProvider>
      <ConsentAwareVisitorTracker />
      <BrowserRouter>
        <ScrollToTop />
        <CookieConsentGate>
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
        </CookieConsentGate>
      </BrowserRouter>
    </CookieProvider>
  );
}

export default App;
