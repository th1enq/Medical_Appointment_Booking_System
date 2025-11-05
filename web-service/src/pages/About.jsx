import React from 'react';
import { assets } from '../assets_frontend/assets';

const About = () => {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 text-white py-20 mb-20">
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                
                <div className="relative mx-4 sm:mx-[10%] text-center animate-slideUp">
                    <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        🏥 About Our Platform
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        About <span className="text-yellow-300">Prescripto</span>
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        Your trusted partner in modern healthcare management
                    </p>
                </div>
            </div>

            <div className="mx-4 sm:mx-[10%]">
                {/* Our Story Section */}
                <div className="max-w-7xl mx-auto mb-20">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="flex-1 relative group animate-fadeIn">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <img 
                                src={assets.about_image} 
                                alt="About" 
                                className="relative w-full rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500" 
                            />
                            {/* Floating Stats */}
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl animate-float">
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-blue-600">98%</p>
                                    <p className="text-sm text-gray-600">Satisfaction</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex-1 space-y-6 animate-slideUp">
                            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                                📖 Our Story
                            </div>
                            
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Prescripto</span>
                            </h2>
                            
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Welcome to Prescripto, your trusted partner in managing your healthcare needs 
                                conveniently and efficiently. At Prescripto, we understand the challenges 
                                individuals face when it comes to scheduling doctor appointments and managing 
                                their health records.
                            </p>
                            
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Prescripto is committed to excellence in healthcare technology. We continuously 
                                strive to enhance our platform, integrating the latest advancements to improve 
                                user experience and deliver superior service. Whether you're booking your first 
                                appointment or managing ongoing care, Prescripto is here to support you every 
                                step of the way.
                            </p>

                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-l-4 border-blue-600">
                                <p className="font-bold text-gray-900 text-xl mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🎯</span>
                                    Our Vision
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Our vision at Prescripto is to create a seamless healthcare experience for 
                                    every user. We aim to bridge the gap between patients and healthcare providers, 
                                    making it easier for you to access the care you need, when you need it.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="max-w-7xl mx-auto mb-20">
                    <div className="text-center mb-16 animate-slideUp">
                        <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full text-blue-600 text-sm font-semibold mb-4">
                            ⭐ Our Advantages
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4">
                            Why Choose Us
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            We provide the best healthcare solutions with cutting-edge technology
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '⚡',
                                title: 'EFFICIENCY',
                                description: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
                                color: 'from-blue-600 to-cyan-500'
                            },
                            {
                                icon: '🎯',
                                title: 'CONVENIENCE',
                                description: 'Access to a network of trusted healthcare professionals in your area.',
                                color: 'from-cyan-600 to-blue-500'
                            },
                            {
                                icon: '👤',
                                title: 'PERSONALIZATION',
                                description: 'Tailored recommendations and reminders to help you stay on top of your health.',
                                color: 'from-blue-500 to-cyan-600'
                            }
                        ].map((item, index) => (
                            <div 
                                key={index}
                                className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 card-hover animate-scaleIn border border-gray-100"
                                style={{animationDelay: `${index * 0.1}s`}}
                            >
                                {/* Gradient Border Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
                                <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                                
                                {/* Content */}
                                <div className="relative z-10">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="max-w-7xl mx-auto mb-20">
                    <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
                        {/* Background Animation */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl"></div>
                        
                        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { number: '100+', label: 'Verified Doctors', icon: '👨‍⚕️' },
                                { number: '10K+', label: 'Happy Patients', icon: '😊' },
                                { number: '50+', label: 'Specialties', icon: '🏥' },
                                { number: '24/7', label: 'Support', icon: '📞' }
                            ].map((stat, index) => (
                                <div key={index} className="text-center animate-fadeIn" style={{animationDelay: `${index * 0.1}s`}}>
                                    <div className="text-4xl mb-2">{stat.icon}</div>
                                    <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                                    <div className="text-white/90">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
