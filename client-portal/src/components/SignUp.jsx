import React,{useState} from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import google from "../assets/google2.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/");
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  };
  const handleBack = () => {
    navigate("/");
  };

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <form onSubmit={handleSubmit} className="h-screen bgLogin ">
      <div className="p-4 ">
        <button
          onClick={handleBack}
          className="flex items-center justify-center text-white border px-2 py-1 rounded-lg"
        >
          {" "}
          <IoMdArrowRoundBack /> Back
        </button>
      </div>
      <div className="grid place-items-center ">
        <div className="text-center w-1/3  border-gray-500 p-6 rounded-lg lg:pt-40  ">
          <h1 className="lg:text-3xl text-2xl font-bold text-blcak ">
            Sign Up
          </h1>
          <div className=" lg:pt-5 w-full ">
            <div>
              <label className="text-start font-semibold block mb-3 ">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="mb-4 w-full rounded-md py-2 pl-3 text-black  border border-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-start font-semibold block mb-3 ">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="abc123@gmail.com"
                className="mb-4 w-full rounded-md py-2 pl-3 text-black  border border-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-start font-semibold block mb-3  ">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className=" mb-4 w-full rounded-md py-2 pl-3 border text-black  border-gray-400 focus:outline-none "
              />
            </div>
          </div>

          <button type="submit" className=" text-white bg-blue-500 hover:bg-blue-600 w-full font-semibold lg:px-20 py-2 rounded outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150">
            SignUp
          </button>
          <p>or</p>

          <button
            onClick={handleLogin}
            className="       font-semibold  lg:px-20 py-2 rounded border border-gray-600   focus:outline-1  mb-1 ease-linear transition-all duration-150  w-full flex items-center justify-center gap-2"
          >
            {" "}
            <img src={google} className="w-6 h-6" />
            Google
          </button>
          <div className="text-sm flex items-center justify-center gap-2 ">
            <p className="">Already have an account?</p>
            <a href="/login">
              <p className="text-blue-600 underline">Login</p>
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
