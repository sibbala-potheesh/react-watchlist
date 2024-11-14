import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ setIsAuthenticated }) => {
  const location = useLocation();

  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleFlyout = () => {
    setIsFlyoutOpen(!isFlyoutOpen);
  };

  const handleLogout = () => {
    setIsFlyoutOpen(false);
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="relative">
      <div className="w-full sm:w-64 text-black mt-5">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <img
              src="https://e1.pngegg.com/pngimages/974/699/png-clipart-movies-and-popcorn-folder-icon-movies-thumbnail.png"
              alt="Watchlists Icon"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-center mr-auto mt-2 text-xl">Watchlists</h2>
          </div>

          <div
            className={`fixed top-0 right-0 bg-black bg-opacity-50 transition-transform transform ${
              isDrawerOpen ? "translate-x-0" : "translate-x-full"
            } sm:hidden`}
            onClick={toggleDrawer}
          >
            <div
              className="bg-gray-100 w-64 h-[20vh] p-4 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Profile inside the Drawer */}
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/47.jpg"
                  alt="User Profile"
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-3">
                  <span className="font-semibold text-zinc-900">
                    Potheesh Sibbala
                  </span>
                  <span className="block text-xs text-zinc-600">
                    sibbalapotheesh@gmail.com.com
                  </span>
                </div>
              </div>

              {/* Log Out and Close buttons side by side */}
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-2 space-x-2 text-red-600 bg-red-100 hover:bg-red-200 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M16 13v-2H7V9l-4 4 4 4v-3h9zM5 4h14c1.1 0 2 .9 2 2v3h-2V6H5v12h14v-3h2v3c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  </svg>
                  <span>Log Out</span>
                </button>
                <button
                  onClick={toggleDrawer}
                  className="text-zinc-600 hover:text-zinc-900 p-2 rounded bg-gray-100 hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          {/* Hamburger Icon for Small Screens */}
          <div className="sm:hidden flex justify-end mt-4">
            <button
              className="text-xl p-2 rounded hover:bg-zinc-200"
              onClick={toggleDrawer}
            >
              ☰
            </button>
          </div>
        </div>

        <hr className="mt-6 border-t-2 border-zinc-300 dark:border-zinc-700" />

        <ul className="space-y-4 mt-4">
          <li>
            <Link
              to="/"
              className={`p-2 rounded flex items-center space-x-2 ${
                location.pathname === "/home"
                  ? "bg-zinc-950/5"
                  : "hover:bg-zinc-950/5"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`size-5 text-xl ${
                  location.pathname === "/home"
                    ? "fill-zinc-900"
                    : "fill-zinc-500"
                }`}
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className={`p-2 rounded flex items-center space-x-2 ${
                location.pathname === "/favorites"
                  ? "bg-zinc-950/5"
                  : "hover:bg-zinc-950/5"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`size-5 ${
                  location.pathname === "/favorites"
                    ? "fill-zinc-900"
                    : "fill-zinc-500"
                }`}
              >
                <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
              </svg>
              <span className="group cursor-pointer flex items-center gap-x-3 p-1 text-sm text-zinc-950 rounded-md">
                Watch list
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Profile section (on large screens) */}
      <div
        className={`mt-auto mt-[26rem] p-4 flex items-center space-x-3 text-sm text-zinc-600 sm:block ${
          isProfileOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="p-1 flex items-center space-x-3 cursor-pointer"
          onClick={toggleFlyout}
        >
          <img
            src="https://randomuser.me/api/portraits/men/47.jpg"
            alt="User Profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-zinc-900">
              Potheesh Sibbala
            </span>
            <span className="text-zinc-600">sibblapotheesh@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Flyout Card */}
      {isFlyoutOpen && (
        <div className="absolute bottom-20 right-10 w-48 p-4 bg-white shadow-lg rounded-lg border border-zinc-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 hover:bg-red-100 rounded p-2 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M16 13v-2H7V9l-4 4 4 4v-3h9zM5 4h14c1.1 0 2 .9 2 2v3h-2V6H5v12h14v-3h2v3c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
