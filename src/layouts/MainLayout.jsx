import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactCTA from '../components/common/ContactCTA';
import WhatsAppFloat from '../components/common/WhatsAppFloat';
import { ToastProvider } from '../context/ToastContext';

const MainLayout = () => {
  return (
    <ToastProvider>
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <ContactCTA />
      <Footer />
      <WhatsAppFloat />
    </div>
    </ToastProvider>
  );
};

export default MainLayout;
