import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase/firebaseConfig';


function App() {
  const [user, setUser]= useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
    <Navbar/>
    <ToastContainer/>
    <Outlet/>
    
    </>
  )
}

export default App
