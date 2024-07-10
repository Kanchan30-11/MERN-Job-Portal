import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import google from "../assets/google2.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged in Successfully");
      navigate("/");
      toast.success("User Logged in Successfully", {
        position: "top-center",
      });
      toast.dismiss();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  const handlecreatebtn = () => {
    console.log("Navigating to login page");
    navigate("/");
  };
  const handleLogin = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        navigate("/"); // Navigate to home page on successful Google login
      })
      .catch((error) => {
        console.error("Error during Google login:", error);
      });
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="h-screen bgLogin">
      <div className="p-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center justify-center text-white border px-2 py-1 rounded-lg"
        >
          <IoMdArrowRoundBack /> Back
        </button>
      </div>
      <div className="grid place-items-center">
        <div className="text-center lg:w-1/3 w-full p-6 rounded-lg lg:pt-28 pt-60">
          <h1 className="lg:text-3xl text-2xl font-bold text-black">Login</h1>
          <div className="lg:pt-5 w-full">
            <div>
              <label className="text-start font-semibold block mb-3">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="abc123@gmail.com"
                className="mb-4 w-full rounded-md py-2 pl-3 text-black border border-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-start font-semibold block mb-3">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="password@122"
                className="mb-4 w-full rounded-md py-2 pl-3 border text-black border-gray-400 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600 w-full font-semibold lg:px-20 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
          >
            Login
          </button>
          <p>or</p>
          <button
            type="button"
            onClick={handleLogin}
            className="text-black font-semibold lg:px-20 py-2 rounded border border-gray-600 focus:outline-1 mb-1 ease-linear transition-all duration-150 w-full flex items-center justify-center gap-2"
          >
            <img src={google} className="w-6 h-6" alt="Google" />
            Google
          </button>
          <div className="text-sm flex items-center justify-center gap-2">
            <p>Don't have an account?</p>
            <a href="/signUp">
              <p className="text-blue-600 underline">Sign Up</p>
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
