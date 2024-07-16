import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import google from "../assets/google2.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { setDoc, doc, getDoc } from 'firebase/firestore';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    try {
      // Create user with email and password
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      if (user) {
        // Send email verification
        await sendEmailVerification(auth.currentUser);

        // Display success message
        toast.success("Verification email sent. Please check your inbox.", {
          position: "top-center",
        });

        // Clear form fields
        setName("");
        setEmail("");
        setPassword("");
        setRole("");

        setIsSubmitting(false); // Set submitting state to false after operation
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error("Error: " + error.message, {
        position: "bottom-center",
      });
      setIsSubmitting(false); // Set submitting state to false in case of error
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if email is verified
      if (user && !user.emailVerified) {
        toast.error("Please verify your email before logging in.", {
          position: "bottom-center",
        });
        return;
      }

      // Continue with login if email is verified
      navigate("/");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload(); // Refresh the user data
        if (user.emailVerified) {
          // Check if user data is already in Firestore
          const userDoc = await getDoc(doc(db, "Users", user.uid));
          if (!userDoc.exists()) {
            // Save additional user details in Firestore
            await setDoc(doc(db, "Users", user.uid), {
              email: user.email,
              fullname: name,
              role: role
            });
            toast.success("Registration successful! Redirecting to home page.", {
              position: "top-center",
            });
            navigate("/");
          }
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, name, role]);

  return (
    <form onSubmit={handleSignUp} className="h-screen bgLogin">
      <ToastContainer />
      <div className="p-4">
        <button
          onClick={handleBack}
          className="flex items-center justify-center text-white border px-2 py-1 rounded-lg"
        >
          <IoMdArrowRoundBack /> Back
        </button>
      </div>
      <div className="grid place-items-center">
        <div className="text-center w-full lg:w-1/3 border-gray-500 p-6 rounded-lg lg:pt-40">
          <h1 className="lg:text-3xl text-2xl font-bold text-black">Sign Up</h1>

          {/* Role Selection */}
          <div className="lg:pt-5 w-full flex justify-center gap-x-6">
            <div className="mb-4">
              <input 
                type="radio" 
                id="jobSeeker" 
                name="role" 
                value="Job Seeker" 
                onChange={(e) => setRole(e.target.value)} 
                required 
              />
              <label htmlFor="jobSeeker" className="ml-2">Job Seeker</label>
            </div>
            <div className="mb-4">
              <input 
                type="radio" 
                id="jobGiver" 
                name="role" 
                value="Job Giver" 
                onChange={(e) => setRole(e.target.value)} 
                required 
              />
              <label htmlFor="jobGiver" className="ml-2">Job Giver</label>
            </div>
          </div>

          <div className="lg:pt-5 w-full ">
            <div>
              <label className="text-start font-semibold block mb-3">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="mb-4 w-full rounded-md py-2 pl-3 text-black border border-gray-400 focus:outline-none"
              />
            </div>
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
                placeholder="Password"
                required
                className="mb-4 w-full rounded-md py-2 pl-3 border text-black border-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="text-white bg-blue-500 hover:bg-blue-600 w-full font-semibold lg:px-20 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
            disabled={isSubmitting} // Disable button when submitting
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
          <p>or</p>

          <button
            onClick={handleLogin}
            className="font-semibold lg:px-20 py-2 rounded border border-gray-600 focus:outline-1 mb-1 ease-linear transition-all duration-150 w-full flex items-center justify-center gap-2"
          >
            <img src={google} className="w-6 h-6" alt="Google" />
            Google
          </button>
          <div className="text-sm flex items-center justify-center gap-2">
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
