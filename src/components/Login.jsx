import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    if (!isRegistering) {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        Swal.fire({
          title: "User not found",
          text: "Please register first",
          icon: "warning",
          confirmButtonText: "Okay",
        });
      } else if (user === email) {
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        Swal.fire({
          title: "Incorrect email",
          text: "Please check your email and try again",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    } else {
      localStorage.setItem("user", JSON.stringify(email));

      Swal.fire({
        title: "Registration Successful",
        text: "Please log in now",
        icon: "success",
        confirmButtonText: "Okay",
      });

      setIsRegistering(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://e1.pngegg.com/pngimages/974/699/png-clipart-movies-and-popcorn-folder-icon-movies-thumbnail.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          {isRegistering ? "Register to Watchlists" : "Sign in to Watchlists"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                required
                autoComplete="email"
                placeholder="  Enter Email"
                className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isRegistering ? "Register" : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {isRegistering ? (
            <>
              Already a member?{" "}
              <button
                onClick={toggleForm}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Not a member?{" "}
              <button
                onClick={toggleForm}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Register
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
