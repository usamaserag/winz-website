import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DeferredMount from '../components/common/DeferredMount';
import { ToastProvider } from '../context/ToastContext';

const ContactCTA = lazy(() => import('../components/common/ContactCTA'));
const WhatsAppFloat = lazy(() => import('../components/common/WhatsAppFloat'));

const MainLayout = () => {
  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <DeferredMount idleTimeout={1500}>
          <Suspense fallback={null}>
            <ContactCTA />
          </Suspense>
        </DeferredMount>
        <Footer />
        <DeferredMount idleTimeout={2500}>
          <Suspense fallback={null}>
            <WhatsAppFloat />
          </Suspense>
        </DeferredMount>
      </div>
    </ToastProvider>
  );
};

export default MainLayout;
