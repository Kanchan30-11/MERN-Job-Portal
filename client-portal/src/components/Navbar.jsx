import React, { useState, useEffect, useRef } from 'react';
import logo from '../../public/images/Group 67.png';
import { Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import '../App.css';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import defaultImg from '../assets/ava.png'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userRole, setUserRole] = useState(null); // State to track user role
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setImageURL(docSnap.data().photoURL || defaultImg);
                    setUserRole(docSnap.data().role); // Set user role from Firestore
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleDropdownToggler = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        auth.signOut();
        console.log("User Logged Out Successfully")
        navigate("/login")
    };

    // Define navItems based on userRole
    const navItems = [
        { path: "/", title: "Start a search" },
        { path: "/my-job", title: "My Jobs" },
        { path: "/salary", title: "Salary Estimate" },
        userRole === "Job Giver" && { path: "/post-job", title: "Post A Job" }, // Conditionally include "Post A Job"
    ].filter(Boolean); // Filter out falsy values (null, undefined)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <nav className='flex justify-between items-center py-6'>
                <a href="/" className='flex items-center gap-2 text-2xl text-black'>
                    <img src={logo} className='h-6' alt="logo" />
                    <span>GetHired</span>
                </a>

                <ul className='hidden md:flex gap-12'>
                    {navItems.map(({ path, title }) => (
                        <li key={path} className='text-base text-primary'>
                            <NavLink
                                to={path}
                                className={({ isActive }) => isActive ? "active" : ""}>
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
                    {!user ? (
                        <>
                            <Link to="/login" className='py-2 px-5 border rounded'>Log In</Link>
                            <Link to="/signup" className='py-2 px-5 border rounded bg-bbbb text-white'>Sign up</Link>
                        </>
                    ) : (
                        <div ref={dropdownRef} className='relative flex items-center gap-2'>
                            <button onClick={handleDropdownToggler} className='flex items-center gap-2 focus:outline-none'>
                                <img src={imageURL} alt="User Profile" className='h-8 w-8 rounded-full' />
                                <span>{user.displayName}</span>
                            </button>
                            {isDropdownOpen && (
                                <div className='absolute top-12 right-0 w-48 bg-white shadow-md rounded-md'>
                                    <Link to="/userProfile" className='block px-4 py-2 text-black hover:bg-gray-200'>Profile</Link>
                                    <button 
                                        onClick={handleLogout} 
                                        className='w-full text-left px-4 py-2 text-black hover:bg-gray-200'>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className='md:hidden block'>
                    <button onClick={handleMenuToggler}>
                        {isMenuOpen ? <FaXmark className=' w-5 h-5 text-primary' /> : <FaBarsStaggered className=' w-5 h-5 text-primary' />}
                    </button>
                </div>
            </nav>

            <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
                <ul>
                    {navItems.map(({ path, title }) => (
                        <li key={path} className='text-base text-white first-text-white py-1'>
                            <NavLink
                                to={path}
                                className={({ isActive }) => isActive ? "active" : ""}>
                                {title}
                            </NavLink>
                        </li>
                    ))}
                    <li className='text-white py-1'><Link to="/login">Log In</Link></li>
                </ul>
            </div>
        </header>
    );
}

export default Navbar;
