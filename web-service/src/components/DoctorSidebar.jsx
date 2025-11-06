import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets_frontend/assets';
import { getDoctorProfile } from '../data/doctorMockData';

const DoctorSidebar = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    name: 'Dr. Richard James',
    specialty: 'General Physician',
    avatar: assets.doc7
  });

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const data = await getDoctorProfile();
        setDoctorInfo({
          name: data.name,
          specialty: data.specialty,
          avatar: assets.doc7
        });
      } catch (error) {
        console.error('Error fetching doctor info:', error);
      }
    };

    fetchDoctorInfo();
  }, []);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/doctor/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: 'Appointments',
      path: '/doctor/appointments',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'Profile',
      path: '/doctor/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-72 min-h-screen bg-white border-r border-slate-200 fixed left-0 top-0 z-40 animate-slideDown">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <img src={assets.logo} alt="Logo" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold text-slate-800">MedCare</h1>
            <p className="text-xs text-slate-500">Doctor Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`
            }
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="transition-transform duration-200 group-hover:scale-110">
              {item.icon}
            </div>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-linear-to-br from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3 mb-3">
          <img 
            src={doctorInfo.avatar} 
            alt="Doctor" 
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-800 text-sm truncate">{doctorInfo.name}</p>
            <p className="text-xs text-slate-500">{doctorInfo.specialty}</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-medium transition-colors border border-slate-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DoctorSidebar;
