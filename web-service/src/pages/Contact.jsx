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
        <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 text-white py-20 mb-20">
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                
                <div className="relative mx-4 sm:mx-[10%] text-center animate-slideUp">
                    <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        📞 Get In Touch
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
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                <img 
                                    src={assets.contact_image} 
                                    alt="Contact" 
                                    className="relative w-full rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500" 
                                />
                            </div>

                            {/* Office Info Card */}
                            <div className="glass rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 animate-scaleIn">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-2xl">
                                        🏢
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Our Office</h2>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white transition-all">
                                            📍
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Address</p>
                                            <p className="text-gray-600">00000 Willms Station<br />Suite 000, Washington, USA</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white transition-all">
                                            📞
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Phone</p>
                                            <p className="text-gray-600">(415) 555-0132</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white transition-all">
                                            📧
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Email</p>
                                            <p className="text-gray-600">greatstackdev@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Careers Card */}
                            <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden animate-scaleIn" style={{animationDelay: '0.1s'}}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="relative">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                                            💼
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
                                        📝 Send Us a Message
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Touch</span>
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
                                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
                                    >
                                        Send Message 📤
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section (Optional Placeholder) */}
                <div className="max-w-7xl mx-auto mb-20 animate-fadeIn">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl h-96 flex items-center justify-center shadow-xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative text-center">
                            <div className="text-6xl mb-4">🗺️</div>
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
                            { icon: '💬', title: 'Live Chat', description: 'Chat with our support team', action: 'Start Chat', color: 'from-blue-600 to-cyan-500' },
                            { icon: '📞', title: 'Call Us', description: 'Available 24/7 for emergencies', action: 'Call Now', color: 'from-cyan-600 to-blue-500' },
                            { icon: '📱', title: 'WhatsApp', description: 'Quick response via WhatsApp', action: 'Message', color: 'from-blue-500 to-cyan-600' }
                        ].map((option, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-500 card-hover border border-gray-100 animate-scaleIn"
                                style={{animationDelay: `${index * 0.1}s`}}
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg`}>
                                    {option.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                                <p className="text-gray-600 mb-4">{option.description}</p>
                                <button className={`bg-gradient-to-r ${option.color} text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform`}>
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
