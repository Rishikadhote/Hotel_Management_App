// src/components/RoomImage.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const RoomImage = ({ query }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!query) {
        console.warn("No query provided for RoomImage component!");
        setError("No query provided");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
          {
            headers: {
              Authorization: process.env.REACT_APP_PEXELS_API_KEY,
            },
          }
        );

        console.log("Pexels API Response:", response.data);

        if (response.data.photos.length > 0) {
          setImageUrl(response.data.photos[0].src.large);
        } else {
          console.warn(`No images found for query: ${query}`);
          setImageUrl(null);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [query]);

  return (
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
      {loading && <p className="text-gray-500">Loading image...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && imageUrl ? (
        <img src={imageUrl} alt="Room" className="w-full h-full object-cover rounded" />
      ) : (
        !loading && !imageUrl && <p className="text-gray-600">No Image Available</p>
      )}
    </div>
  );
};

export default RoomImage;
