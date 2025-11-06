import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { doctors } from '../assets_frontend/assets';
import { toast } from 'react-toastify';

const MyAppointments = () => {
    const navigate = useNavigate();
    const { appointments, cancelAppointment, payForAppointment } = useContext(AppContext);
    const [filter, setFilter] = useState('all'); // all, upcoming, completed, cancelled

    const handleCancelAppointment = (appointmentId) => {
        cancelAppointment(appointmentId);
        toast.success('Appointment cancelled successfully');
    };

    const handlePayment = (appointmentId) => {
        payForAppointment(appointmentId);
        toast.success('Payment completed successfully');
    };

    const getFilteredAppointments = () => {
        switch (filter) {
            case 'upcoming':
                return appointments.filter(apt => !apt.cancelled && !apt.payment);
            case 'completed':
                return appointments.filter(apt => apt.payment);
            case 'cancelled':
                return appointments.filter(apt => apt.cancelled);
            default:
                return appointments;
        }
    };

    const filteredAppointments = getFilteredAppointments();

    const getStatusBadge = (appointment) => {
        if (appointment.cancelled) {
            return (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    Cancelled
                </div>
            );
        }
        if (appointment.payment) {
            return (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Completed
                </div>
            );
        }
        return (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Upcoming
            </div>
        );
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header Section */}
            <div className="mx-4 sm:mx-[10%] mb-12">
                <div className="animate-slideUp">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4">
                        My Appointments
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Manage your healthcare appointments
                    </p>
                </div>

                {/* Filter Tabs */}
                {appointments.length > 0 && (
                    <div className="flex gap-3 mt-8 flex-wrap animate-scaleIn">
                        {[
                            { value: 'all', label: 'All Appointments' },
                            { value: 'upcoming', label: 'Upcoming' },
                            { value: 'completed', label: 'Completed' },
                            { value: 'cancelled', label: 'Cancelled' }
                        ].map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setFilter(tab.value)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    filter === tab.value
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="mx-4 sm:mx-[10%]">
                {appointments.length === 0 ? (
                    <div className="text-center py-20 animate-fadeIn">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No Appointments Yet</h3>
                        <p className="text-gray-600 mb-8">Start your healthcare journey by booking an appointment</p>
                        <button
                            onClick={() => navigate('/doctors')}
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <span>Book an Appointment</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                ) : filteredAppointments.length === 0 ? (
                    <div className="text-center py-20 animate-fadeIn">
                        <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No {filter} appointments</h3>
                        <p className="text-gray-600">Try selecting a different filter</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredAppointments.map((appointment, index) => {
                            const doctor = doctors.find(doc => doc._id === appointment.docId);
                            if (!doctor) return null;

                            return (
                                <div
                                    key={appointment._id}
                                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 animate-scaleIn"
                                    style={{animationDelay: `${index * 0.1}s`}}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-6">
                                        {/* Doctor Image */}
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                                            <div className="absolute inset-0.5 bg-white rounded-2xl overflow-hidden">
                                                <img
                                                    src={doctor.image}
                                                    alt={doctor.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <img
                                                src={doctor.image}
                                                alt={doctor.name}
                                                className="w-full h-full object-cover rounded-2xl opacity-0"
                                            />
                                        </div>

                                        {/* Appointment Details */}
                                        <div className="flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                            {doctor.name}
                                                        </h2>
                                                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                                                            <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                                                            </svg>
                                                            <span className="font-medium">{doctor.speciality}</span>
                                                        </div>
                                                    </div>
                                                    {getStatusBadge(appointment)}
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                    {/* Date & Time */}
                                                    <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                                                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-600 mb-1">Appointment Date</p>
                                                            <p className="font-bold text-gray-900">{appointment.slotDate}</p>
                                                            <p className="text-sm text-blue-600 font-semibold">{appointment.slotTime}</p>
                                                        </div>
                                                    </div>

                                                    {/* Location */}
                                                    <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl">
                                                        <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center shrink-0">
                                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-600 mb-1">Location</p>
                                                            <p className="text-sm text-gray-900 font-medium">{doctor.address.line1}</p>
                                                            <p className="text-sm text-gray-600">{doctor.address.line2}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Fee */}
                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
                                                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="font-bold text-gray-900">Consultation Fee: ${doctor.fees}</span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 mt-6 flex-wrap">
                                                {appointment.cancelled ? (
                                                    <div className="flex items-center gap-3 text-red-600 bg-red-50 px-6 py-3 rounded-xl border-2 border-red-200">
                                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="font-semibold">This appointment was cancelled</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {!appointment.payment ? (
                                                            <button
                                                                onClick={() => handlePayment(appointment._id)}
                                                                className="flex-1 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                                </svg>
                                                                Pay Online
                                                            </button>
                                                        ) : (
                                                            <div className="flex-1 px-8 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-2 border-green-500 rounded-xl font-bold flex items-center justify-center gap-2">
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                                Payment Completed
                                                            </div>
                                                        )}
                                                        <button
                                                            onClick={() => handleCancelAppointment(appointment._id)}
                                                            className="px-8 py-3 bg-white border-2 border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;
