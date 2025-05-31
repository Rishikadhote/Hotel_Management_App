import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  process.env.PUBLIC_URL + "/images/hotel-bg1.jpg",
  process.env.PUBLIC_URL + "/images/hotel-bg2.jpg",
  process.env.PUBLIC_URL + "/images/hotel-bg3.jpg",
  process.env.PUBLIC_URL + "/images/hotel-bg4.jpg"
];

const LandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-cover bg-center transition-opacity duration-1000"
      style={{
        backgroundImage: `url('${images[currentImage]}')`,
        opacity: fade ? 0.5 : 1,
        transition: "opacity 1s ease-in-out",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-6">
        <h1 className="text-5xl font-extrabold drop-shadow-lg animate-fadeIn">Welcome to The Regal Haven</h1>
        <p className="mt-4 text-lg max-w-xl animate-fadeIn">A royal escape for ultimate comfort.
          <br/>Experience world-class hospitality with breathtaking views and premium services.</p>
        
        <button 
        onClick={() => navigate("/rooms")}
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 animate-bounce">
          Book Your Stay
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
