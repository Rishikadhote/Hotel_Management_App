import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BookingForm from "../components/BookingForm";
import { motion } from "framer-motion";
// import { useLocation } from "react-router-dom";


const Booking = () => {
  const backgrounds = [
    process.env.PUBLIC_URL + "/images/hotel-bg1.jpg",
    process.env.PUBLIC_URL + "/images/hotel-bg2.jpg",
    process.env.PUBLIC_URL + "/images/hotel-bg3.jpg",
    process.env.PUBLIC_URL + "/images/hotel-bg4.jpg"
  ];

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {backgrounds.map((bg, index) => (
        <motion.div
          key={index}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center ${
            index === bgIndex ? "opacity-100" : "opacity-0"
          } transition-opacity duration-0`}
          style={{ backgroundImage: `url(${bg})`, filter: "brightness(50%)" }}
        ></motion.div>
      ))}
      <Navbar />
      <div className="relative z-10 flex items-center justify-center h-full">
        <BookingForm />
      </div>
    </div>
  );
};

export default Booking;
