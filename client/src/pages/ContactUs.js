import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
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
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === bgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})`, filter: "brightness(50%)" }}
        ></motion.div>
      ))}
      <Navbar />
      <div className="relative z-10 flex flex-col items-center justify-center h-full mt-10">
        <ContactForm />
        <SocialLinks />
      </div>
    </div>
  );
};

export default Contact;

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", queryType: "General Inquiry", message: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
  const response = await fetch("http://localhost:8000/api/contact/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
  name: formData.name,
  email: formData.email,
  query_type: formData.queryType,   
  message: formData.message,
}),
  });

  if (!response.ok) throw new Error("Network response was not ok");

  setMessage("Message sent successfully!");
  setFormData({ name: "", email: "", queryType: "General Inquiry", message: "" });
  setErrors({});
} catch (error) {
  setMessage("Failed to send message. Try again!");
}


    setLoading(false);
  };

  return (
    <motion.div
      className="w-full max-w-lg bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-gray-300/20"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-3xl text-white font-bold text-center mb-4">Contact Us</h2>

      

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
        </div>

        <div>
          <select
            name="queryType"
            className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
            value={formData.queryType}
            onChange={handleChange}
          >
            <option className="text-black bg-white" value="Booking">Booking Issue</option>
            <option className="text-black bg-white" value="Payment">Payment Issue</option>
            <option className="text-black bg-white" value="Support">General Support</option>
            <option className="text-black bg-white" value="Other">Other Inquiry</option>
          </select>
          <FiChevronDown className="absolute right-8 top-1/2 transform -translate-y-[99%] text-white pointer-events-none" size={25}/>
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}
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
              Sending...
            </motion.span>
          ) : (
            "Send Message"
          )}
        </motion.button>
      </form>

{message && (
        <motion.p
          className={`mt-4 p-3 rounded-md text-center text-white border shadow-md ${
      message.includes("successfully")
        ? "border-green-400 bg-green-500/10"
        : "border-blue-400 bg-blue-500/10"
    }`}
        >
          {message}
        </motion.p>
      )}

    </motion.div>
  );
};

const SocialLinks = () => {
  return (
    <div className="mt-6 flex space-x-6 text-white">
      <a href="/" className="hover:text-gold-400 transition"><FaWhatsapp size={30} /></a>
      <a href="/" className="hover:text-gold-400 transition"><FaInstagram size={30} /></a>
      <a href="/" className="hover:text-gold-400 transition"><FaTwitter size={30} /></a>
      <a href="/" className="hover:text-gold-400 transition"><FaFacebook size={30} /></a>
    </div>
  );
};
