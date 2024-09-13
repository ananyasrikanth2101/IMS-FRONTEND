import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import { ImSpinner2 } from "react-icons/im"; // Spinner icon from react-icons

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Input change
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Register User
  const registerUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://ims-backend-3.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }

      alert("Successfully Registered, Now Login with your details");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  // Upload Image to Cloudinary
  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "inventoryapp");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddhayhptm/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();
      setForm({ ...form, imageUrl: result.url });
      alert("Image Successfully Uploaded");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center">
      <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={require("../assets/logo.png")}
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 -space-y-px rounded-md shadow-sm">
            <div className="flex gap-4">
              <input
                name="firstName"
                type="text"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleInputChange}
              />
              <input
                name="lastName"
                type="text"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
                value={form.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                name="phoneNumber"
                type="tel"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Phone Number"
                value={form.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <UploadImage uploadImage={uploadImage} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                required
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                I Agree to Terms & Conditions
              </label>
            </div>

            <div className="text-sm">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </span>
            </div>
          </div>

          {error && <div className="text-red-600 text-sm mt-4">{error}</div>}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={loading}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {loading && (
                  <ImSpinner2
                    className="h-5 w-5 text-white animate-spin"
                    aria-hidden="true"
                  />
                )}
              </span>
              <span
                className={`flex-1 text-center ${
                  loading ? "opacity-0" : "opacity-100"
                } transition-opacity duration-300`}
              >
                Sign up
              </span>
            </button>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Already have an account? <Link to="/login">Sign in now</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
      <div className="flex justify-center order-first sm:order-last">
        <img src={require("../assets/Login.png")} alt="Login" />
      </div>
    </div>
  );
}

export default Register;
