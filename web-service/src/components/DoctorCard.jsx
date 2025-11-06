import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
    return (
        <Link 
            to={`/appointment/${doctor._id}`}
            className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer card-hover"
        >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0.5 bg-white rounded-2xl"></div>
            
            <div className="relative z-10">
                {/* Doctor Image with Overlay */}
                <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
                    <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Experience Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                        <span className="text-xs font-bold text-blue-600">{doctor.experience}</span>
                    </div>
                    
                    {/* Fees Badge */}
                    <div className="absolute bottom-3 left-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full shadow-lg">
                        <span className="text-sm font-bold">${doctor.fees}</span>
                    </div>
                </div>

                {/* Doctor Info */}
                <div className="p-5">
                    {/* Availability Status */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="relative">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping absolute"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm text-green-600 font-semibold">
                            Available Now
                        </span>
                    </div>

                    {/* Doctor Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {doctor.name}
                    </h3>

                    {/* Speciality with Icon */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                        </svg>
                        <span className="font-medium">{doctor.speciality}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(4.9)</span>
                    </div>

                    {/* Book Button - Only visible on hover */}
                    <div className="mt-4 overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-300">
                        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default DoctorCard;
