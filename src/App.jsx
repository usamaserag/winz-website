import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";

import About    from './pages/About/About';
import Services from './pages/Services/Services';
import Tracking from './pages/Tracking/Tracking';
import Import     from './pages/Import/Import';
import Export     from './pages/Export/Export';
import Transit    from './pages/Transit/Transit';
import Transport  from './pages/Transport/Transport';
import WarehousePage from './pages/Warehouse/Warehouse';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Apply RTL if language is Arabic
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about"    element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="import"    element={<Import />} />
          <Route path="export"    element={<Export />} />
          <Route path="transit"   element={<Transit />} />
          <Route path="transport" element={<Transport />} />
          <Route path="warehouse" element={<WarehousePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
