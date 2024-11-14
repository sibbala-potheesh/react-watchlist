import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleBookmark = (movieId) => {
    const updatedFavorites = favorites.filter(
      (movie) => movie.imdbID !== movieId
    );

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="px-4 sm:px-8 py-6">
      <h2 className="text-2xl font-bold mb-4">Watchlist Movies</h2>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.imdbID}
              className="border rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={
                    movie.Poster === "N/A"
                      ? "https://via.placeholder.com/150"
                      : movie.Poster
                  }
                  alt={movie.Title}
                  className="w-full h-60 object-cover"
                />
                <button
                  onClick={() => toggleBookmark(movie.imdbID)}
                  className="absolute top-2 left-2 text-yellow-500 bg-gray-800 rounded-full p-1"
                >
                  <FaStar />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-md font-bold">{movie.Title}</h3>
                <p className="text-sm text-gray-500">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No watched movies found.</p>
      )}
    </div>
  );
};

export default Favorites;
