import React, { useState, useEffect } from 'react';
import { assets } from '../assets_frontend/assets';
import { 
  getDashboardStats, 
  getChartData, 
  getRecentEvents, 
  getLatestBookings 
} from '../data/doctorMockData';

const DoctorDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [stats, setStats] = useState({ earnings: 0, appointments: 0, patients: 0, growthRates: {} });
  const [chartData, setChartData] = useState([]);
  const [latestBookings, setLatestBookings] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, chartDataResult, bookingsData, eventsData] = await Promise.all([
          getDashboardStats(),
          getChartData(timeRange),
          getLatestBookings(5),
          getRecentEvents()
        ]);
        
        setStats(statsData);
        setChartData(chartDataResult);
        setLatestBookings(bookingsData);
        setRecentEvents(eventsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Update chart data when time range changes
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = await getChartData(timeRange);
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [timeRange]);

  const maxValue = chartData.length > 0 ? Math.max(...chartData.map(d => d.earnings)) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard Overview</h1>
            <p className="text-slate-500">Welcome back, Dr. Smith</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
            <span className="text-sm text-slate-600">Today: </span>
            <span className="font-semibold text-slate-800">Nov 6, 2025</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Earnings Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slideUp">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-emerald-100 text-sm font-medium mb-1">Total Earnings</p>
                <h2 className="text-4xl font-bold">${stats.earnings.toLocaleString()}</h2>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-emerald-100 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+{stats.growthRates.earnings}% from last month</span>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total Appointments</p>
                <h2 className="text-4xl font-bold">{stats.appointments}</h2>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-blue-100 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+{stats.growthRates.appointments}% from last month</span>
            </div>
          </div>

          {/* Patients Card */}
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-violet-100 text-sm font-medium mb-1">Total Patients</p>
                <h2 className="text-4xl font-bold">{stats.patients}</h2>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-violet-100 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+{stats.growthRates.patients}% from last month</span>
            </div>
          </div>
        </div>

        {/* Charts and Events Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 animate-scaleIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Performance Analytics</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setTimeRange('week')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    timeRange === 'week' 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setTimeRange('month')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    timeRange === 'month' 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Month
                </button>
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="space-y-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <span className="w-12 text-sm font-medium text-slate-600">{item.day}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                      style={{ 
                        width: `${(item.earnings / maxValue) * 100}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <span className="text-white text-xs font-semibold">${item.earnings}</span>
                    </div>
                  </div>
                  <span className="w-16 text-sm text-slate-500 text-right">{item.patients} pts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Event Sourcing - Recent Events */}
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-scaleIn" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-bold text-slate-800 mb-6">System Events</h3>
            <div className="space-y-4">
              {recentEvents.map((event, index) => (
                <div key={event.id} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 animate-slideDown" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    event.type === 'APPOINTMENT_CREATED' ? 'bg-blue-500' :
                    event.type === 'APPOINTMENT_CONFIRMED' ? 'bg-green-500' :
                    'bg-emerald-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {event.type.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {event.patient || `$${event.amount}`}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{event.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-scaleIn" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">Latest Bookings</h3>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">#</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Patient</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Age</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Date & Time</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Fee</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {latestBookings.map((booking, index) => (
                  <tr 
                    key={booking.id} 
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors animate-slideDown"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="py-4 px-4 text-sm text-slate-600">{booking.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={booking.avatar} 
                          alt={booking.patient}
                          className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
                        />
                        <span className="font-medium text-slate-800">{booking.patient}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">{booking.age}</td>
                    <td className="py-4 px-4 text-sm text-slate-600">
                      <div>{booking.date}</div>
                      <div className="text-xs text-slate-500">{booking.time}</div>
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-slate-800">${booking.fee}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        Pending
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;
