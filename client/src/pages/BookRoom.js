import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const backgrounds = [
  process.env.PUBLIC_URL + "/images/hotel-bg1.jpg",
  process.env.PUBLIC_URL + "/images/hotel-bg2.jpg",
  process.env.PUBLIC_URL + "/images/hotel-bg3.jpg",
  process.env.PUBLIC_URL + "/images/hotel-bg4.jpg"
];

const BookingRoom = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  const [bgIndex, setBgIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
  if (!booking) {
    navigate("/book-room");
  }
}, [booking, navigate]);

if (!booking) {
  return null; 
}

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {backgrounds.map((bg, index) => (
        <motion.div
          key={index}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === bgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})`, filter: "brightness(50%)" }}
        ></motion.div>
      ))}

      <Navbar />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.div
          className="w-full max-w-xl bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-xl border border-gray-300/20 text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-green-400">Thank you for your booking!</h2>
          <p className="text-lg mb-6">Here are your booking details:</p>
          <div className="text-left space-y-2">
            <p><strong>Name:</strong> {booking.name}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Check-In:</strong> {booking.checkIn}</p>
            <p><strong>Check-Out:</strong> {booking.checkOut}</p>
            <p><strong>Room Type:</strong> {booking.roomType}</p>
            <p><strong>No. of Guests:</strong> {booking.guests}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingRoom;
