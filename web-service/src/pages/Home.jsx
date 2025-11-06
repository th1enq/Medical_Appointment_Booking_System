import React from 'react';
import { Link } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import { assets, specialityData, doctors } from '../assets_frontend/assets';

const Home = () => {
    return (
        <div className="pt-16">
            {/* Hero Section - Modern Gradient Design */}
            <section className="relative bg-linear-to-br from-blue-600 via-cyan-500 to-blue-700 text-white overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                
                <div className="relative mx-4 sm:mx-[10%] py-20 flex flex-col md:flex-row items-center gap-12">
                    {/* Left Content */}
                    <div className="flex-1 animate-slideUp">
                        <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                            Healthcare Made Easy
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Book Appointment<br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-pink-300">
                                With Trusted Doctors
                            </span>
                        </h1>
                        
                        {/* Doctor Avatars with Stats */}
                        <div className="flex items-center gap-6 mb-8">
                            <div className="relative">
                                <img src={assets.group_profiles} alt="Doctors" className="w-32" />
                                <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">100+</p>
                                <p className="text-white/80 text-sm">Verified Doctors</p>
                            </div>
                        </div>

                        <p className="text-white/90 text-lg mb-8 max-w-md">
                            Simply browse through our extensive list of trusted doctors, 
                            schedule your appointment hassle-free.
                        </p>

                        <Link 
                            to="/doctors" 
                            className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                            Book appointment
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 relative animate-fadeIn">
                        <div className="absolute inset-0 bg-linear-to-t from-blue-600/50 to-transparent rounded-3xl"></div>
                        <img 
                            src={assets.header_img} 
                            alt="Doctors" 
                            className="w-full h-full object-cover md:max-w-lg rounded-3xl shadow-2xl animate-float"
                        />
                        {/* Floating Stats Cards */}
                        <div className="absolute top-10 -left-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl animate-slideDown">
                            <p className="text-3xl font-bold text-blue-600">98%</p>
                            <p className="text-sm text-gray-600">Satisfaction</p>
                        </div>
                        <div className="absolute bottom-10 -right-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl animate-slideDown" style={{animationDelay: '0.2s'}}>
                            <p className="text-3xl font-bold text-cyan-500">24/7</p>
                            <p className="text-sm text-gray-600">Available</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Find by Speciality Section */}
            <section className="mx-4 sm:mx-[10%] py-20 relative">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                
                <div className="text-center mb-16 animate-slideUp">
                    <div className="inline-block mb-4 px-4 py-2 bg-linear-to-r from-blue-100 to-cyan-100 rounded-full text-blue-600 text-sm font-semibold">
                        Explore Specialists
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 mb-4">
                        Find by Speciality
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Simply browse through our extensive list of trusted doctors, 
                        schedule your appointment hassle-free.
                    </p>
                </div>

                {/* Speciality Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
                    {specialityData.map((item, index) => (
                        <Link
                            key={index}
                            to={`/doctors?speciality=${item.speciality}`}
                            className="group relative flex flex-col items-center gap-4 p-8 bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer card-hover overflow-hidden animate-scaleIn"
                            style={{animationDelay: `${index * 0.1}s`}}
                        >
                            {/* Gradient border effect */}
                            <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                            <div className="absolute inset-0.5 bg-white rounded-2xl"></div>
                            
                            {/* Content */}
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                                    <img src={item.image} alt={item.speciality} className="w-12" />
                                </div>
                                <span className="text-sm text-gray-700 text-center font-semibold group-hover:text-blue-600 transition-colors">
                                    {item.speciality}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Top Doctors Section */}
            <section className="mx-4 sm:mx-[10%] py-20 bg-linear-to-b from-gray-50 to-white rounded-3xl">
                <div className="text-center mb-16 animate-slideUp">
                    <div className="inline-block mb-4 px-4 py-2 bg-linear-to-r from-blue-100 to-cyan-100 rounded-full text-blue-600 text-sm font-semibold">
                        Top Doctors
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 mb-4">
                        Top Doctors to Book
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Simply browse through our extensive list of trusted doctors.
                    </p>
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12 px-4">
                    {doctors.slice(0, 10).map((doctor, index) => (
                        <div 
                            key={doctor._id}
                            className="animate-scaleIn"
                            style={{animationDelay: `${index * 0.05}s`}}
                        >
                            <DoctorCard doctor={doctor} />
                        </div>
                    ))}
                </div>

                {/* More Button */}
                <div className="text-center">
                    <Link
                        to="/doctors"
                        className="group inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white px-10 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        View All Doctors
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Banner Section - Modern CTA */}
            <section className="mx-4 sm:mx-[10%] py-20">
                <div className="relative bg-linear-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-3xl overflow-hidden shadow-2xl">
                    {/* Animated Background */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
                        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
                    </div>

                    <div className="relative flex flex-col md:flex-row items-center">
                        {/* Left Content */}
                        <div className="flex-1 p-12 lg:p-16 text-white z-10">
                            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                                Get Started Today
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                Book Appointment<br />
                                <span className="text-yellow-300">With 100+ Trusted Doctors</span>
                            </h2>
                            <p className="text-white/90 text-lg mb-8 max-w-md">
                                Start your healthcare journey with verified professionals ready to assist you.
                            </p>
                            <Link
                                to="/signup"
                                className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
                            >
                                Create account
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>

                        {/* Right Image */}
                        <div className="flex-1 relative hidden md:flex items-end justify-end h-96 p-8">
                            <img 
                                src={assets.appointment_img} 
                                alt="Doctors Group" 
                                className="w-full h-full object-contain max-w-md animate-float"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
