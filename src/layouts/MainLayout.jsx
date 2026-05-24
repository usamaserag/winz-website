import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactCTA from '../components/common/ContactCTA';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default MainLayout;
