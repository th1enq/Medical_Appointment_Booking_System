import React, { useState, useEffect } from 'react';
import { getDashboardStats, getEarningsData, getRecentAppointments } from '../data/adminMockData';
import { assets as adminAssets } from '../assets_admin/assets';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [earningsData, setEarningsData] = useState(null);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  useEffect(() => {
    // Load dashboard data
    setStats(getDashboardStats());
    setEarningsData(getEarningsData());
    setRecentAppointments(getRecentAppointments());
  }, []);

  const handleCancelAppointment = (appointmentId) => {
    setRecentAppointments(prev =>
      prev.map(apt =>
        apt._id === appointmentId ? { ...apt, status: 'cancelled' } : apt
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const StatCard = ({ title, value, icon, color, trend }) => (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-500 text-sm font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">{value}</h3>
          {trend && (
            <div className="flex items-center gap-1 text-xs">
              <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
              <span className="text-slate-400">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <img src={icon} alt={title} className="w-7 h-7 brightness-0 invert" />
        </div>
      </div>
    </div>
  );

  const MiniChart = ({ data }) => {
    if (!data) return null;
    
    const max = Math.max(...data.earnings);
    const points = data.earnings.slice(-7).map((val, idx) => {
      const x = (idx / 6) * 100;
      const y = 100 - (val / max) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className="w-full h-16" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          className="transition-all duration-300"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back, Administrator</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right mr-3">
            <p className="text-sm text-slate-500">Today</p>
            <p className="text-lg font-semibold text-slate-800">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Doctors"
            value={stats.totalDoctors}
            icon={adminAssets.doctor_icon}
            color="bg-gradient-to-br from-blue-500 to-indigo-600"
            trend={12}
          />
          <StatCard
            title="Total Appointments"
            value={stats.totalAppointments}
            icon={adminAssets.appointments_icon}
            color="bg-gradient-to-br from-purple-500 to-pink-600"
            trend={8}
          />
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={adminAssets.patients_icon}
            color="bg-gradient-to-br from-green-500 to-emerald-600"
            trend={15}
          />
          <StatCard
            title="Today's Revenue"
            value={`$${stats.todayAppointments * 550}`}
            icon={adminAssets.earning_icon}
            color="bg-gradient-to-br from-orange-500 to-red-600"
            trend={-3}
          />
        </div>
      )}

      {/* Earnings Chart - Event Sourcing Visualization */}
      {earningsData && (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Revenue Analytics</h2>
              <p className="text-sm text-slate-500">Event Sourcing - Payment Events Over Time</p>
            </div>
            <div className="flex gap-2">
              {['7', '30', '90'].map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedPeriod === period
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {period} Days
                </button>
              ))}
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-1">
            {earningsData.earnings.slice(-parseInt(selectedPeriod)).map((earning, idx) => {
              const maxEarning = Math.max(...earningsData.earnings);
              const height = (earning / maxEarning) * 100;
              
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                      style={{ height: `${height * 2}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        ${earning}
                      </div>
                    </div>
                  </div>
                  {idx % Math.ceil(parseInt(selectedPeriod) / 7) === 0 && (
                    <span className="text-xs text-slate-400 font-medium">
                      {earningsData.dates.slice(-parseInt(selectedPeriod))[idx]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Event Sourcing Info */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">Total Events</p>
                <p className="text-2xl font-bold text-slate-800">{earningsData.earnings.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ${earningsData.earnings.reduce((a, b) => a + b, 0).toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">Avg per Event</p>
                <p className="text-2xl font-bold text-slate-800">
                  ${Math.round(earningsData.earnings.reduce((a, b) => a + b, 0) / earningsData.earnings.length)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Recent Appointments</h2>
              <p className="text-sm text-slate-500">Latest booking activities</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200">
              View All
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentAppointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={appointment.patient.image}
                        alt={appointment.patient.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
                      />
                      <span className="font-medium text-slate-800">{appointment.patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={appointment.doctor.image}
                        alt={appointment.doctor.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                      />
                      <div>
                        <p className="font-medium text-slate-800">{appointment.doctor.name}</p>
                        <p className="text-xs text-slate-500">{appointment.doctor.specialty}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-800">{appointment.date}</p>
                      <p className="text-sm text-slate-500">{appointment.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800">${appointment.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                      <button
                        onClick={() => handleCancelAppointment(appointment._id)}
                        className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
                        title="Cancel Appointment"
                      >
                        <img src={adminAssets.cancel_icon} alt="Cancel" className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
