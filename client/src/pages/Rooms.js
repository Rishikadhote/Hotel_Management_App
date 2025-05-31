// src/pages/Rooms.js

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaBed, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RoomImage from "../components/RoomImage";

const roomBackgrounds = [
  process.env.PUBLIC_URL + "/images/hotel-bg1.jpg",
  process.env.PUBLIC_URL + "/images/hotel-bg2.jpg",
  process.env.PUBLIC_URL + "/images/hotel-bg3.jpg",
  process.env.PUBLIC_URL + "/images/hotel-bg4.jpg"
];

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentBg, setCurrentBg] = useState(roomBackgrounds[0]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/rooms/");
        console.log("Rooms fetched:", response.data);

        // ✅ Use actual room data instead of default
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prevBg) => {
        const currentIndex = roomBackgrounds.indexOf(prevBg);
        const nextIndex = (currentIndex + 1) % roomBackgrounds.length;
        return roomBackgrounds[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleBookNow = (room) => {
    navigate("/bookings", { state: { room } });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center mt-28">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Available Rooms</h2>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center mt-28">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Available Rooms</h2>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center transition-opacity duration-1000 pt-28"
      style={{ backgroundImage: `url(${currentBg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 container mx-auto px-8 text-center text-white">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-12 pb-28">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:scale-105 bg-white bg-opacity-20 backdrop-blur-md p-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-full h-64 flex justify-center p-2 border-4 border-white rounded-lg">
                <RoomImage query={room.room_type} />
              </div>
              <div className="absolute bottom-4 left-4 p-3 rounded-md bg-white bg-opacity-80 shadow-md">
                <h3 className="text-lg font-semibold flex items-center text-black">
                  <FaBed className="mr-2" /> {room.room_type}
                </h3>
                <p className="text-gray-600 text-sm">Room No: {room.room_number}</p>
                <p className="flex items-center text-md font-bold text-black">
                  <FaRupeeSign className="mr-1" />
                  {room.price_per_night} / Night
                </p>

                <button
                  className={`mt-3 px-4 py-2 rounded-lg text-md font-semibold transition-all ${
                    room.is_available ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() => handleBookNow(room)}
                  disabled={!room.is_available}
                >
                  {room.is_available ? "Book Now" : "Not Available"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
