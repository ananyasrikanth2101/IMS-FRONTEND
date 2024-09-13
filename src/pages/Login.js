import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // State for managing loading animation

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const authCheck = () => {
    setTimeout(() => {
      fetch("https://ims-backend-3.onrender.com/api/login")
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data));
          authContext.signin(data._id, () => {
            navigate("/");
          });
        })
        .catch((err) => {
          alert("Wrong credentials, Try again");
        });
    }, 1000);
  };

  const loginUser = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Cannot send empty data
    if (form.email === "" || form.password === "") {
      alert("To login user, enter details to proceed...");
    } else {
      setLoading(true); // Start loading animation
      fetch("https://ims-backend-3.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((result) => {
          authCheck();
        })
        .catch((error) => {
          alert("An error occurred during login.");
        })
        .finally(() => {
          setLoading(false); // Stop loading animation
        });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center">
        <div className="flex justify-center">
          <img src={require("../assets/signup.jpg")} alt="" />
        </div>
        <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={require("../assets/logo.png")}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Login to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={loginUser}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
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
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
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
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading} // Disable button during loading
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  "Log in"
                )}
              </button>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <span className="font-medium text-black-500">
                  Don't Have an Account, Please{" "}
                  <Link to="/register" className="text-blue-700">
                    Register Now
                  
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
