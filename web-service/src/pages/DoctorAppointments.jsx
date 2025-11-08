import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  getAllAppointments, 
  acceptAppointment as acceptAppointmentAPI, 
  cancelAppointment as cancelAppointmentAPI 
} from '../data/doctorMockData';
import CalendarView from '../components/CalendarView';

const DoctorAppointments = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'calendar'

  // Fetch appointments on mount and when filter changes
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await getAllAppointments(filterStatus);
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [filterStatus]);

  const filteredAppointments = appointments;

  // Handle calendar actions
  const handleCalendarAction = async (action, appointment) => {
    if (action === 'accept') {
      await handleAccept(appointment);
    } else if (action === 'cancel') {
      await handleCancel(appointment);
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-emerald-100 text-emerald-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const handleAccept = async (appointment) => {
    try {
      await acceptAppointmentAPI(appointment.appointmentId);
      toast.success(`Appointment with ${appointment.patient} accepted`);
      
      // Refresh appointments
      const data = await getAllAppointments(filterStatus);
      setAppointments(data);
    } catch (error) {
      console.error('Error accepting appointment:', error);
      toast.error('Failed to accept appointment');
    }
  };

  const handleCancel = async (appointment) => {
    try {
      await cancelAppointmentAPI(appointment.appointmentId);
      toast.success(`Appointment with ${appointment.patient} cancelled`);
      
      // Refresh appointments
      const data = await getAllAppointments(filterStatus);
      setAppointments(data);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Failed to cancel appointment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Appointments Management</h1>
          <p className="text-slate-500">Manage and track all your appointments</p>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-slideDown">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  filterStatus === 'all'
                    ? 'bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md transform scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Appointments
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">{appointments.length}</span>
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  filterStatus === 'pending'
                    ? 'bg-linear-to-r from-amber-500 to-orange-600 text-white shadow-md transform scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Pending
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {appointments.filter(a => a.status === 'pending').length}
                </span>
              </button>
              <button
                onClick={() => setFilterStatus('confirmed')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  filterStatus === 'confirmed'
                    ? 'bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-md transform scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Confirmed
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {appointments.filter(a => a.status === 'confirmed').length}
                </span>
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  filterStatus === 'completed'
                    ? 'bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-md transform scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Completed
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {appointments.filter(a => a.status === 'completed').length}
                </span>
              </button>
              <button
                onClick={() => setFilterStatus('cancelled')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  filterStatus === 'cancelled'
                    ? 'bg-linear-to-r from-red-500 to-rose-600 text-white shadow-md transform scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Cancelled
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {appointments.filter(a => a.status === 'cancelled').length}
                </span>
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Table View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Table</span>
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  viewMode === 'calendar'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Calendar View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Calendar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        {viewMode === 'calendar' ? (
          <CalendarView 
            appointments={filteredAppointments}
            onHoverAction={handleCalendarAction}
            role="doctor"
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-scaleIn">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">#</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Patient</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Age</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Type</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Date & Time</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Fee</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment, index) => (
                  <tr 
                    key={appointment.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors animate-slideDown"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="py-4 px-6 text-sm text-slate-600 font-medium">{appointment.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img 
                          src={appointment.avatar}
                          alt={appointment.patient}
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shadow-sm"
                        />
                        <div>
                          <p className="font-semibold text-slate-800">{appointment.patient}</p>
                          <p className="text-xs text-slate-500">Patient ID: {appointment.id}00</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{appointment.age} yrs</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
                        {appointment.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      <div className="font-medium text-slate-800">{appointment.date}</div>
                      <div className="text-xs text-slate-500">{appointment.time}</div>
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-slate-800">${appointment.fee}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium ${getStatusStyle(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {appointment.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAccept(appointment)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-all duration-200 hover:scale-110"
                            title="Accept"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleCancel(appointment)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-200 hover:scale-110"
                            title="Cancel"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      {appointment.status === 'confirmed' && (
                        <span className="text-xs text-slate-500">Confirmed</span>
                      )}
                      {appointment.status === 'completed' && (
                        <span className="text-xs text-slate-500">Completed</span>
                      )}
                      {appointment.status === 'cancelled' && (
                        <span className="text-xs text-slate-500">Cancelled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredAppointments.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No appointments found</h3>
              <p className="text-slate-500">There are no {filterStatus !== 'all' ? filterStatus : ''} appointments to display.</p>
            </div>
          )}
          </div>
        )}

      </div>
    </div>
  );
};

export default DoctorAppointments;
