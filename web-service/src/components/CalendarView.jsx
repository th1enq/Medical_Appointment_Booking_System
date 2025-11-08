import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const CalendarView = ({ appointments, onHoverAction, role = 'user' }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredAppointment, setHoveredAppointment] = useState(null);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Get today's date
  const today = new Date();
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Parse appointment date and group by day
  const appointmentsByDay = useMemo(() => {
    const grouped = {};
    
    appointments.forEach(apt => {
      let dateStr;
      
      // Handle different date formats
      if (apt.slotDate) {
        dateStr = apt.slotDate; // User appointments
      } else if (apt.date) {
        dateStr = apt.date; // Doctor/Admin appointments
      }
      
      if (!dateStr) return;
      
      // Parse date (assuming format: "DD Mon YYYY" or similar)
      const date = new Date(dateStr);
      
      // Check if date is in current month
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        const day = date.getDate();
        if (!grouped[day]) {
          grouped[day] = [];
        }
        grouped[day].push(apt);
      }
    });
    
    return grouped;
  }, [appointments, currentMonth, currentYear]);

  // Get status color
  const getStatusColor = (appointment) => {
    // For user appointments
    if (appointment.cancelled) {
      return 'bg-red-100 text-red-700 border-red-300';
    }
    if (appointment.payment) {
      return 'bg-green-100 text-green-700 border-green-300';
    }
    
    // For doctor/admin appointments
    if (appointment.status === 'cancelled') {
      return 'bg-red-100 text-red-700 border-red-300';
    }
    if (appointment.status === 'completed') {
      return 'bg-green-100 text-green-700 border-green-300';
    }
    if (appointment.status === 'confirmed') {
      return 'bg-blue-100 text-blue-700 border-blue-300';
    }
    if (appointment.status === 'pending') {
      return 'bg-amber-100 text-amber-700 border-amber-300';
    }
    
    return 'bg-blue-100 text-blue-700 border-blue-300';
  };

  // Get appointment time
  const getAppointmentTime = (appointment) => {
    return appointment.slotTime || appointment.time || '';
  };

  // Get appointment name/description
  const getAppointmentLabel = (appointment) => {
    if (role === 'user') {
      return appointment.docName || 'Appointment';
    } else if (role === 'doctor') {
      return appointment.patient || 'Patient';
    } else {
      return `${appointment.patient?.name || 'Patient'} - ${appointment.doctor?.name || 'Doctor'}`;
    }
  };

  // Render calendar grid
  const renderCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-[120px] bg-gray-50 border border-gray-200"></div>
      );
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayAppointments = appointmentsByDay[day] || [];
      const isTodayDate = isToday(day);
      
      days.push(
        <div
          key={day}
          className={`min-h-[120px] border border-gray-200 p-2 transition-colors ${
            isTodayDate ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className={`text-sm font-semibold mb-2 ${
            isTodayDate ? 'text-blue-600' : 'text-gray-700'
          }`}>
            {isTodayDate && (
              <span className="inline-block w-7 h-7 bg-blue-600 text-white rounded-full text-center leading-7">
                {day}
              </span>
            )}
            {!isTodayDate && day}
          </div>
          
          <div className="space-y-1 relative">
            {dayAppointments.map((apt, index) => (
              <div
                key={apt._id || apt.appointmentId || index}
                className="relative"
              >
                <div
                  className={`text-xs p-2 rounded-md border cursor-pointer transition-all duration-200 hover:shadow-md ${getStatusColor(apt)}`}
                  onMouseEnter={() => setHoveredAppointment(apt)}
                  onMouseLeave={() => setHoveredAppointment(null)}
                >
                  <div className="font-medium truncate">{getAppointmentTime(apt)}</div>
                  <div className="truncate text-[10px] mt-0.5">{getAppointmentLabel(apt)}</div>
                </div>
                
                {/* Hover actions - show buttons inline with hover area extended */}
                {hoveredAppointment === apt && onHoverAction && (
                  <div 
                    className="absolute left-0 right-0 top-0 pt-[52px] z-50"
                    onMouseEnter={() => setHoveredAppointment(apt)}
                    onMouseLeave={() => setHoveredAppointment(null)}
                  >
                    <div className="flex gap-1 bg-white p-1 rounded-md shadow-xl border border-gray-300">
                      {role === 'user' && (
                        <>
                          {!apt.cancelled && !apt.payment && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onHoverAction('pay', apt);
                                setHoveredAppointment(null);
                              }}
                              className="flex-1 px-2 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-[10px] font-semibold transition-all"
                              title="Pay Online"
                            >
                              💳 Pay
                            </button>
                          )}
                          {!apt.cancelled && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onHoverAction('cancel', apt);
                                setHoveredAppointment(null);
                              }}
                              className="flex-1 px-2 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-semibold transition-all"
                              title="Cancel Appointment"
                            >
                              ❌ Cancel
                            </button>
                          )}
                        </>
                      )}
                      
                      {role === 'doctor' && (
                        <>
                          {apt.status === 'pending' && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onHoverAction('accept', apt);
                                  setHoveredAppointment(null);
                                }}
                                className="flex-1 px-2 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-semibold transition-all"
                                title="Accept Appointment"
                              >
                                ✓ Accept
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onHoverAction('cancel', apt);
                                  setHoveredAppointment(null);
                                }}
                                className="flex-1 px-2 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-semibold transition-all"
                                title="Cancel Appointment"
                              >
                                ❌ Cancel
                              </button>
                            </>
                          )}
                        </>
                      )}
                      
                      {role === 'admin' && (
                        <>
                          {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onHoverAction('cancel', apt);
                                setHoveredAppointment(null);
                              }}
                              className="flex-1 px-2 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-semibold transition-all"
                              title="Cancel Appointment"
                            >
                              ❌ Cancel
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <p className="text-sm text-gray-600 mt-1">UTC time</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={goToPreviousMonth}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Previous Month"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            Today
          </button>
          
          <button
            onClick={goToNextMonth}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Next Month"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Day Names Header */}
      <div className="grid grid-cols-7 gap-px mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center font-semibold text-sm text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
          <span className="text-xs text-gray-600">Upcoming</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-100 border border-amber-300 rounded"></div>
          <span className="text-xs text-gray-600">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span className="text-xs text-gray-600">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span className="text-xs text-gray-600">Cancelled</span>
        </div>
      </div>
    </div>
  );
};

CalendarView.propTypes = {
  appointments: PropTypes.array.isRequired,
  onHoverAction: PropTypes.func,
  role: PropTypes.oneOf(['user', 'doctor', 'admin']).isRequired
};

export default CalendarView;
