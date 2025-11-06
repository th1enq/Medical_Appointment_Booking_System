import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets as adminAssets } from '../assets_admin/assets';
import { assets } from '../assets_frontend/assets';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: adminAssets.home_icon
    },
    {
      name: 'Appointments',
      path: '/admin/appointments',
      icon: adminAssets.appointment_icon
    },
    {
      name: 'Add Doctor',
      path: '/admin/add-doctor',
      icon: adminAssets.add_icon
    },
    {
      name: 'Doctors List',
      path: '/admin/doctors-list',
      icon: adminAssets.list_icon
    }
  ];

  const handleLogout = () => {
    // Clear admin token and redirect
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-slate-50 to-white border-r border-slate-200 fixed left-0 top-0 z-40 shadow-sm">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <img src={adminAssets.admin_logo} alt="Admin Logo" className="w-12 h-12" />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-xs text-slate-500 font-medium">Medical Appointments</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3.5 rounded-2xl font-medium transition-all duration-300 group relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Background effect */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-10 bg-gradient-to-r from-blue-500 to-indigo-600'
                }`}></div>
                
                <img 
                  src={item.icon} 
                  alt={item.name}
                  className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 relative z-10 ${
                    isActive ? 'brightness-0 invert' : ''
                  }`}
                />
                <span className="relative z-10 text-[15px]">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section - Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-4 border border-slate-200">
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">Administrator</p>
              <p className="text-xs text-slate-500">admin@medcare.com</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-xl font-medium transition-all duration-200 border border-slate-200 hover:border-red-200 group"
          >
            <svg 
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
