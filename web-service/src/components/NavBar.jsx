import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from '../assets_frontend/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navLinkClass = (path) => {
        return isActive(path)
            ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-cyan-500 transition-all duration-300"
            : "text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-cyan-500 after:transition-all after:duration-300 transition-all duration-300";
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(false);
        toast.success('Logged out successfully');
        navigate('/');
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled 
                ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-100' 
                : 'bg-white/95 backdrop-blur-sm shadow-sm'
        }`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo with animation */}
                <Link to="/" className="cursor-pointer group">
                    <div className="relative">
                        <img 
                            src={assets.logo} 
                            alt="Prescripto" 
                            className="w-44 transition-transform duration-300 group-hover:scale-105" 
                        />
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
                    </div>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-10 text-sm tracking-wide">
                    <Link to="/" className={navLinkClass("/")}>
                        HOME
                    </Link>
                    <Link to="/doctors" className={navLinkClass("/doctors")}>
                        ALL DOCTORS
                    </Link>
                    <Link to="/about" className={navLinkClass("/about")}>
                        ABOUT
                    </Link>
                    <Link to="/contact" className={navLinkClass("/contact")}>
                        CONTACT
                    </Link>
                </div>

                {/* Right Side Buttons */}
                <div className="flex items-center gap-4">
                    {token ? (
                        <div className="relative">
                            <div 
                                className="flex items-center gap-3 cursor-pointer group"
                                onClick={() => setShowMenu(!showMenu)}
                            >
                                <div className="relative">
                                    <img 
                                        src={userData?.image || assets.profile_pic} 
                                        alt="Profile" 
                                        className="w-11 h-11 rounded-full object-cover border-2 border-transparent group-hover:border-blue-500 transition-all duration-300 ring-2 ring-blue-100 group-hover:ring-blue-200"
                                    />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <img 
                                    src={assets.dropdown_icon} 
                                    alt="dropdown" 
                                    className={`w-3 transition-transform duration-300 ${showMenu ? 'rotate-180' : ''}`}
                                />
                            </div>

                            {/* Dropdown Menu with animation */}
                            {showMenu && (
                                <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-2xl py-2 z-50 animate-slideDown">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-800">{userData?.name || 'User'}</p>
                                        <p className="text-xs text-gray-500 truncate">{userData?.email || 'user@example.com'}</p>
                                    </div>
                                    <Link
                                        to="/my-profile"
                                        onClick={() => setShowMenu(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 group"
                                    >
                                        <span className="text-lg">👤</span>
                                        <span className="font-medium group-hover:text-blue-600 transition-colors">My Profile</span>
                                    </Link>
                                    <Link
                                        to="/my-appointments"
                                        onClick={() => setShowMenu(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 group"
                                    >
                                        <span className="text-lg">📋</span>
                                        <span className="font-medium group-hover:text-blue-600 transition-colors">My Appointments</span>
                                    </Link>
                                    <div className="border-t border-gray-100 mt-2"></div>
                                    <button
                                        onClick={() => {
                                            setShowMenu(false);
                                            handleLogout();
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 group"
                                    >
                                        <span className="text-lg">🚪</span>
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                className="px-6 py-2.5 text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full hover:from-blue-700 hover:to-cyan-600 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blue-200"
                            >
                                Create account
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;