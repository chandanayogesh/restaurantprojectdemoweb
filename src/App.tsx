import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Landing from '@/pages/Landing';
import Menu from '@/pages/Menu';
import Cart from '@/pages/Cart';
import Checkin from '@/pages/Checkin';
import TrackOrder from '@/pages/TrackOrder';
import Bill from '@/pages/Bill';
import ChefDashboard from '@/pages/ChefDashboard';
import TableStatus from '@/pages/TableStatus';
import AdminDashboard from '@/pages/AdminDashboard';
import About from '@/pages/About';
import Help from '@/pages/Help';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/table/:tableId" element={<Checkin onCheckin={(id, name) => {
            localStorage.setItem('tableId', id.toString());
            localStorage.setItem('customerName', name);
          }} />} />
          <Route path="/track/:orderId" element={<TrackOrder />} />
          <Route path="/bill/:orderId" element={<Bill />} />
          <Route path="/chef" element={<ChefDashboard />} />
          <Route path="/tables" element={<TableStatus />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
              <Navbar />
              <div className="flex-1">
                <AnimatedRoutes />
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
