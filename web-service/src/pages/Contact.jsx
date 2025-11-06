import React, { useState } from 'react';
import { assets } from '../assets_frontend/assets';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-linear-to-br from-blue-600 via-cyan-500 to-blue-700 text-white py-20 mb-20">
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                
                <div className="relative mx-4 sm:mx-[10%] text-center animate-slideUp">
                    <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        Get In Touch
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Contact <span className="text-yellow-300">Us</span>
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        We're here to help and answer any questions you might have
                    </p>
                </div>
            </div>

            <div className="mx-4 sm:mx-[10%]">
                {/* Main Content */}
                <div className="max-w-7xl mx-auto mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Left Side - Contact Info & Image */}
                        <div className="space-y-8 animate-slideUp">
                            {/* Contact Image */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-cyan-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                <img 
                                    src={assets.contact_image} 
                                    alt="Contact" 
                                    className="relative w-full rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500" 
                                />
                            </div>

                            {/* Office Info Card */}
                            <div className="glass rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 animate-scaleIn">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Our Office</h2>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-linear-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white transition-all">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Address</p>
                                            <p className="text-gray-600">00000 Willms Station<br />Suite 000, Washington, USA</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 shrink-0 group-hover:bg-linear-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white transition-all">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Phone</p>
                                            <p className="text-gray-600">(415) 555-0132</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-linear-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white transition-all">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Email</p>
                                            <p className="text-gray-600">greatstackdev@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Careers Card */}
                            <div className="bg-linear-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden animate-scaleIn" style={{animationDelay: '0.1s'}}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="relative">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold">Careers at Prescripto</h2>
                                    </div>
                                    <p className="mb-6 text-white/90">
                                        Learn more about our teams and job openings.
                                    </p>
                                    <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                                        Explore Jobs
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="animate-slideUp" style={{animationDelay: '0.2s'}}>
                            <div className="glass rounded-3xl p-8 shadow-xl">
                                <div className="mb-8">
                                    <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                                        Send Us a Message
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                        Get in <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Touch</span>
                                    </h2>
                                    <p className="text-gray-600">Fill out the form below and we'll get back to you shortly</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="(123) 456-7890"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us how we can help you..."
                                            rows="5"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none"
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-linear-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center gap-2"
                                    >
                                        Send Message
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section (Optional Placeholder) */}
                <div className="max-w-7xl mx-auto mb-20 animate-fadeIn">
                    <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-3xl h-96 flex items-center justify-center shadow-xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 to-cyan-500/10 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative text-center">
                            <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            <p className="text-gray-600 text-lg font-semibold">Interactive Map Coming Soon</p>
                            <p className="text-gray-500">Find our location easily</p>
                        </div>
                    </div>
                </div>

                {/* Quick Contact Options */}
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 animate-slideUp">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Contact</h2>
                        <p className="text-gray-600">Choose your preferred way to reach us</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { 
                                title: 'Live Chat', 
                                description: 'Chat with our support team', 
                                action: 'Start Chat', 
                                color: 'from-blue-600 to-cyan-500',
                                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            },
                            { 
                                title: 'Call Us', 
                                description: 'Available 24/7 for emergencies', 
                                action: 'Call Now', 
                                color: 'from-cyan-600 to-blue-500',
                                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            },
                            { 
                                title: 'WhatsApp', 
                                description: 'Quick response via WhatsApp', 
                                action: 'Message', 
                                color: 'from-blue-500 to-cyan-600',
                                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            }
                        ].map((option, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-500 card-hover border border-gray-100 animate-scaleIn"
                                style={{animationDelay: `${index * 0.1}s`}}
                            >
                                <div className={`w-16 h-16 bg-linear-to-br ${option.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                                    {option.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                                <p className="text-gray-600 mb-4">{option.description}</p>
                                <button className={`bg-linear-to-r ${option.color} text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform`}>
                                    {option.action}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
