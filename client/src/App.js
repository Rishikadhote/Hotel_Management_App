import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import Rooms from "./pages/Rooms";
import UserDashboard from "./pages/UserDashboard"; 
import ContactUs from "./pages/ContactUs";
import BookRoom from "./pages/BookRoom";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const NotFound = () => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="text-center text-2xl font-bold text-red-500 dark:text-red-400 mt-20"
  >
     404 - Page Not Found 
  </motion.div>
);

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/bookings" element={<Booking />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/contact" element={<ContactUs />} /> 
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/book-room" element={<BookRoom />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
