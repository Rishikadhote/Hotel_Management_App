import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const BookingForm = () => {
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    roomType: "Single",
    guests: "",
    rooms: "",
    checkIn: "",
    checkOut: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!bookingData.name.trim()) newErrors.name = "Name is required";
    if (!bookingData.email.trim()) newErrors.email = "Email is required";
    if (!bookingData.checkIn) newErrors.checkIn = "Check-in is required";
    if (!bookingData.checkOut) newErrors.checkOut = "Check-out is required";
    if (
      bookingData.checkIn &&
      bookingData.checkOut &&
      bookingData.checkIn >= bookingData.checkOut
    ) {
      newErrors.checkOut = "Check-out must be after Check-in";
    }

    const guests = parseInt(bookingData.guests, 10);
    const rooms = parseInt(bookingData.rooms, 10);

    if (isNaN(guests) || guests < 1) newErrors.guests = "At least 1 guest required";
    if (isNaN(rooms) || rooms < 1) newErrors.rooms = "At least 1 room required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getRoomId = (roomType) => {
    switch (roomType) {
      case "Single": return 1;
      case "Double": return 2;
      case "Deluxe": return 3;
      case "Suite": return 4;
      case "Family": return 5;
      default: return 1;
    }
  };

  const calculateAmount = (roomType, rooms) => {
    const baseRates = {
      Single: 1000,
      Double: 1500,
      Deluxe: 2000,
      Suite: 2500,
      Family: 3000,
    };
    return baseRates[roomType] * rooms;
  };

  const handleBooking = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  setMessage("");

  const guests = parseInt(bookingData.guests, 10);
  const rooms = parseInt(bookingData.rooms, 10);

  const requestData = {
    customer_name: bookingData.name,
    customer_email: bookingData.email,
    room: getRoomId(bookingData.roomType),
    check_in: bookingData.checkIn.split("T")[0],
    check_out: bookingData.checkOut.split("T")[0],
    guests: guests,
    rooms: rooms,  // **Important: add rooms here**
    total_price: calculateAmount(bookingData.roomType, rooms),
  };

  try {
    const response = await fetch("http://localhost:8000/api/booking/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      setTimeout(() => {
        setMessage(" Booking & Payment Successful!");
        setLoading(false);
      }, 1000);
    } else {
      const data = await response.json();
      setMessage(`❌ Booking Failed: ${data.error || "Something went wrong."}`);
      setLoading(false);
    }
  } catch (error) {
    setMessage("⚠️ Network Error. Try Again!");
    setLoading(false);
  }
};


  return (
    <motion.div
      className="w-full max-w-lg bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-gray-300/20"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-3xl text-white font-bold text-center mb-4">Book a Luxury Stay</h2>

      <form onSubmit={handleBooking} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gold-400"
          value={bookingData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gold-400"
          value={bookingData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

        {/* Room Type */}
        <div className="relative">
          <select
            name="roomType"
            className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white focus:outline-none focus:ring-2 focus:ring-gold-400 appearance-none"
            value={bookingData.roomType}
            onChange={handleChange}
          >
            <option className="text-black" value="Single">Single Room</option>
            <option className="text-black" value="Double">Double Room</option>
            <option className="text-black" value="Deluxe">Deluxe Room</option>
            <option className="text-black" value="Suite">Suite Room</option>
            <option className="text-black" value="Family">Family Room</option>
          </select>
          <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" size={24} />
        </div>

        {/* Guests and Rooms */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="guests"
            min="1"
            placeholder="Number of Guests"
            className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            value={bookingData.guests}
            onChange={handleChange}
          />
          {errors.guests && <p className="text-red-400 text-sm">{errors.guests}</p>}

          <input
            type="number"
            name="rooms"
            min="1"
            placeholder="Number of Rooms"
            className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            value={bookingData.rooms}
            onChange={handleChange}
          />
          {errors.rooms && <p className="text-red-400 text-sm">{errors.rooms}</p>}
        </div>

        {/* Check-in and Check-out */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="datetime-local"
            name="checkIn"
            className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            value={bookingData.checkIn}
            onChange={handleChange}
            min={today}
          />
          {errors.checkIn && <p className="text-red-400 text-sm">{errors.checkIn}</p>}

          <input
            type="datetime-local"
            name="checkOut"
            className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            value={bookingData.checkOut}
            onChange={handleChange}
            min={bookingData.checkIn || today}
          />
          {errors.checkOut && <p className="text-red-400 text-sm">{errors.checkOut}</p>}
        </div>

        <motion.button
          type="submit"
          className={`w-full p-3 rounded-lg text-lg font-bold transition ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-gold-400 hover:bg-gold-500"
          }`}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? (
            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
              Processing...
            </motion.span>
          ) : (
            "Proceed to Payment"
          )}
        </motion.button>
      </form>

      {message && (
        <motion.div
          className={`mt-4 p-3 rounded-md text-center text-white border shadow-md ${
            message.includes("Successful")
              ? "border-green-400 bg-green-500/10"
              : "border-red-400 bg-red-500/10"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BookingForm;
