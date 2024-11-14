import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./common/Sidebar";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import Login from "./components/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user")
  );

  useEffect(() => {
    // Watch for changes in localStorage and update authentication status
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("user"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div className="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
        {isAuthenticated && (
          <div className="w-100 p-4 flex h-full min-h-0 flex-col relative">
            <Sidebar setIsAuthenticated={setIsAuthenticated} />
          </div>
        )}

        <div className={`m-3 w-full ${isAuthenticated ? "pl-75" : ""}`}>
          <main className="bg-white dark:bg-zinc-800 p-5 shadow-lg h-full rounded-lg border border-zinc-200 dark:border-zinc-700 mx-auto">
            <Routes>
              {!isAuthenticated ? (
                <Route path="*" element={<Navigate to="/login" />} />
              ) : (
                <>
                  <Route path="/home" element={<Home />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<Navigate to="/home" />} />
                </>
              )}
              <Route
                path="/login"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
