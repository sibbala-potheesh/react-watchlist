import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { CirclesWithBar } from "react-loader-spinner";
import "./Home.css";

const Home = () => {
  const API_KEY = "eb556807";

  const [movies, setMovies] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async (query, page = 1) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        if (page === 1) {
          setMovies(data.Search.slice(0, 8));
        } else {
          setMovies((prevMovies) => [
            ...prevMovies,
            ...data.Search.slice(0, 8),
          ]);
        }
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch {
      setError("Error fetching movie data. Please try again.");
    }
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchMovies(searchQuery, currentPage);
    } else {
      setMovies([]);
    }
  }, [searchQuery, currentPage]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("favorites")) || [];
    setBookmarkedMovies(savedBookmarks);
  }, []);

  const toggleBookmark = (movie) => {
    setBookmarkedMovies((prev) => {
      const isBookmarked = prev.some((item) => item.imdbID === movie.imdbID);
      const updatedBookmarks = isBookmarked
        ? prev.filter((item) => item.imdbID !== movie.imdbID)
        : [...prev, movie];

      // Update localStorage with the modified array of movie objects
      localStorage.setItem("favorites", JSON.stringify(updatedBookmarks));

      return updatedBookmarks;
    });
  };

  return (
    <div className="px-4 sm:px-8 py-6">
      {/* Card Component */}
      <div className="card bg-white border shadow-lg rounded-lg p-6 mb-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-600">
            Welcome to <span className="text-black">Watchlists</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-700">
            Browse movies, add them to watchlists, and share them with friends.
            Just click the{" "}
            <FaRegStar className="inline-block mb-1 text-gray-500" /> to add a
            movie, click the poster for more details or mark the movie as
            watched.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for movies..."
          className="border p-2 rounded w-1/2 sm:w-1/3"
        />
      </div>
      <br />

      {/* Movie Results */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="text-center">
            <CirclesWithBar
              height="80"
              width="80"
              color="#3498db"
              ariaLabel="circles-with-bar-loading"
              wrapperClass="loader-wrapper"
              visible={true}
            />
            <p className="text-gray-700 mt-4">Loading Movies...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
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
                  className="absolute top-2 left-2 text-white bg-gray-800 rounded-full p-1"
                  onClick={() => toggleBookmark(movie)}
                >
                  {bookmarkedMovies.some(
                    (item) => item.imdbID === movie.imdbID
                  ) ? (
                    <FaStar className="text-yellow-500" />
                  ) : (
                    <FaRegStar className="text-white" />
                  )}
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-md font-bold">{movie.Title}</h3>
                <p className="text-sm text-gray-500">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {movies.length > 0 && (
        <div className="text-center mt-8">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setCurrentPage((prevPage) => prevPage + 1);
              fetchMovies(searchQuery, currentPage + 1);
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
