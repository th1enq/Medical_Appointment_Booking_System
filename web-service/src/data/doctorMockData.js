// Mock data cho Doctor Portal
// Khi có backend, chỉ cần thay thế các hàm này bằng API calls

// Doctor Profile Data
export const getDoctorProfile = async () => {
  // TODO: Thay bằng API call: await fetch('/api/doctor/profile')
  return {
    _id: 'doc001',
    name: 'Dr. Richard James',
    avatar: null, // Sẽ được set từ assets trong component
    specialty: 'General Physician',
    degree: 'MBBS, MD',
    experience: '8 Years',
    about: 'Dr. Richard James is a highly skilled General Physician with over 8 years of experience in treating various medical conditions. He is known for his compassionate care and thorough diagnostic approach. Dr. James specializes in preventive medicine and chronic disease management.',
    fee: 500,
    address: {
      line1: '123 Medical Center',
      line2: 'Downtown, New York, NY 10001'
    },
    status: 'Available', // Available, Busy, On Leave
    email: 'richard.james@hospital.com',
    phone: '+1 (555) 123-4567',
    education: [
      { 
        degree: 'Doctor of Medicine (MD)', 
        institution: 'Harvard Medical School', 
        year: '2015' 
      },
      { 
        degree: 'Bachelor of Medicine (MBBS)', 
        institution: 'Johns Hopkins University', 
        year: '2012' 
      }
    ],
    certifications: [
      'Board Certified in Internal Medicine',
      'Advanced Cardiac Life Support (ACLS)',
      'Basic Life Support (BLS)'
    ]
  };
};

// Dashboard Statistics
export const getDashboardStats = async () => {
  // TODO: Thay bằng API call: await fetch('/api/doctor/dashboard/stats')
  return {
    earnings: 125430,
    appointments: 347,
    patients: 892,
    growthRates: {
      earnings: 12.5,
      appointments: 8.2,
      patients: 15.3
    }
  };
};

// Chart Data for Dashboard
export const getChartData = async (timeRange = 'week') => {
  // TODO: Thay bằng API call: await fetch(`/api/doctor/dashboard/chart?range=${timeRange}`)
  const weekData = [
    { day: 'Mon', earnings: 4500, patients: 12, date: '2025-11-04' },
    { day: 'Tue', earnings: 5200, patients: 15, date: '2025-11-05' },
    { day: 'Wed', earnings: 4800, patients: 13, date: '2025-11-06' },
    { day: 'Thu', earnings: 6100, patients: 18, date: '2025-11-07' },
    { day: 'Fri', earnings: 5500, patients: 16, date: '2025-11-08' },
    { day: 'Sat', earnings: 3200, patients: 9, date: '2025-11-09' },
    { day: 'Sun', earnings: 2100, patients: 6, date: '2025-11-10' }
  ];

  const monthData = [
    { day: 'Week 1', earnings: 28500, patients: 82, date: '2025-10-01' },
    { day: 'Week 2', earnings: 31200, patients: 89, date: '2025-10-08' },
    { day: 'Week 3', earnings: 29800, patients: 85, date: '2025-10-15' },
    { day: 'Week 4', earnings: 35100, patients: 95, date: '2025-10-22' },
  ];

  return timeRange === 'week' ? weekData : monthData;
};

// Recent Events (Event Sourcing)
export const getRecentEvents = async () => {
  // TODO: Thay bằng API call: await fetch('/api/doctor/events/recent')
  return [
    { 
      id: 1, 
      type: 'APPOINTMENT_CREATED', 
      timestamp: '2025-11-06 09:15:23', 
      patient: 'John Doe',
      metadata: { appointmentId: 'apt001' }
    },
    { 
      id: 2, 
      type: 'APPOINTMENT_CONFIRMED', 
      timestamp: '2025-11-06 09:12:45', 
      patient: 'Sarah Miller',
      metadata: { appointmentId: 'apt002' }
    },
    { 
      id: 3, 
      type: 'PAYMENT_RECEIVED', 
      timestamp: '2025-11-06 08:45:12', 
      amount: 500,
      metadata: { appointmentId: 'apt003', transactionId: 'txn001' }
    },
    { 
      id: 4, 
      type: 'APPOINTMENT_CANCELLED', 
      timestamp: '2025-11-06 08:30:05', 
      patient: 'Mike Johnson',
      metadata: { appointmentId: 'apt004', reason: 'Patient request' }
    }
  ];
};

// Latest Bookings
export const getLatestBookings = async (limit = 5) => {
  // TODO: Thay bằng API call: await fetch(`/api/doctor/bookings/latest?limit=${limit}`)
  return [
    { 
      id: 1, 
      patient: 'John Doe', 
      age: 34, 
      time: '10:00 AM', 
      date: '2025-11-08', 
      fee: 500, 
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg', 
      status: 'pending',
      appointmentId: 'apt001'
    },
    { 
      id: 2, 
      patient: 'Sarah Miller', 
      age: 28, 
      time: '11:30 AM', 
      date: '2025-11-08', 
      fee: 500, 
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
      status: 'pending',
      appointmentId: 'apt002'
    },
    { 
      id: 3, 
      patient: 'Mike Johnson', 
      age: 45, 
      time: '02:00 PM', 
      date: '2025-11-08', 
      fee: 500, 
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg', 
      status: 'pending',
      appointmentId: 'apt003'
    },
    { 
      id: 4, 
      patient: 'Emma Wilson', 
      age: 31, 
      time: '03:30 PM', 
      date: '2025-11-08', 
      fee: 500, 
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg', 
      status: 'pending',
      appointmentId: 'apt004'
    },
    { 
      id: 5, 
      patient: 'David Brown', 
      age: 52, 
      time: '04:00 PM', 
      date: '2025-11-08', 
      fee: 500, 
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg', 
      status: 'pending',
      appointmentId: 'apt005'
    }
  ];
};

// All Appointments
export const getAllAppointments = async (filter = 'all') => {
  // TODO: Thay bằng API call: await fetch(`/api/doctor/appointments?filter=${filter}`)
  const allAppointments = [
    { 
      id: 1, 
      patient: 'John Doe', 
      age: 34, 
      time: '10:00 AM', 
      date: '2025-11-08', 
      fee: 500, 
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg', 
      status: 'pending', 
      type: 'Consultation',
      appointmentId: 'apt001',
      patientId: 'pat001',
      notes: ''
    },
    { 
      id: 2, 
      patient: 'Sarah Miller', 
      age: 28, 
      time: '11:30 AM', 
      date: '2025-11-08', 
      fee: 500, 
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
      status: 'confirmed', 
      type: 'Follow-up',
      appointmentId: 'apt002',
      patientId: 'pat002',
      notes: 'Follow-up for blood pressure'
    },
    { 
      id: 3, 
      patient: 'Mike Johnson', 
      age: 45, 
      time: '02:00 PM', 
      date: '2025-11-08', 
      fee: 500, 
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg', 
      status: 'pending', 
      type: 'Consultation',
      appointmentId: 'apt003',
      patientId: 'pat003',
      notes: ''
    },
    { 
      id: 4, 
      patient: 'Emma Wilson', 
      age: 31, 
      time: '03:30 PM', 
      date: '2025-11-08', 
      fee: 500, 
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg', 
      status: 'completed', 
      type: 'Consultation',
      appointmentId: 'apt004',
      patientId: 'pat004',
      notes: 'Routine checkup completed'
    },
    { 
      id: 5, 
      patient: 'David Brown', 
      age: 52, 
      time: '04:00 PM', 
      date: '2025-11-08', 
      fee: 500, 
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg', 
      status: 'pending', 
      type: 'Emergency',
      appointmentId: 'apt005',
      patientId: 'pat005',
      notes: 'Emergency consultation required'
    },
    { 
      id: 6, 
      patient: 'Lisa Anderson', 
      age: 39, 
      time: '10:00 AM', 
      date: '2025-11-09', 
      fee: 500, 
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg', 
      status: 'confirmed', 
      type: 'Consultation',
      appointmentId: 'apt006',
      patientId: 'pat006',
      notes: ''
    },
    { 
      id: 7, 
      patient: 'Tom Harris', 
      age: 41, 
      time: '11:00 AM', 
      date: '2025-11-09', 
      fee: 500, 
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg', 
      status: 'pending', 
      type: 'Follow-up',
      appointmentId: 'apt007',
      patientId: 'pat007',
      notes: 'Follow-up on medication'
    },
    { 
      id: 8, 
      patient: 'Amy Clark', 
      age: 26, 
      time: '02:30 PM', 
      date: '2025-11-09', 
      fee: 500, 
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg', 
      status: 'cancelled', 
      type: 'Consultation',
      appointmentId: 'apt008',
      patientId: 'pat008',
      notes: 'Cancelled by patient'
    }
  ];

  // Filter appointments based on status
  if (filter === 'all') return allAppointments;
  return allAppointments.filter(apt => apt.status === filter);
};

// Accept Appointment
export const acceptAppointment = async (appointmentId) => {
  // TODO: Thay bằng API call: await fetch(`/api/doctor/appointments/${appointmentId}/accept`, { method: 'POST' })
  console.log('Accepting appointment:', appointmentId);
  return {
    success: true,
    message: 'Appointment accepted successfully',
    appointmentId
  };
};

// Cancel Appointment
export const cancelAppointment = async (appointmentId, reason = '') => {
  // TODO: Thay bằng API call: await fetch(`/api/doctor/appointments/${appointmentId}/cancel`, { method: 'POST', body: JSON.stringify({ reason }) })
  console.log('Cancelling appointment:', appointmentId, 'Reason:', reason);
  return {
    success: true,
    message: 'Appointment cancelled successfully',
    appointmentId
  };
};

// Update Doctor Profile
export const updateDoctorProfile = async (profileData) => {
  // TODO: Thay bằng API call: await fetch('/api/doctor/profile', { method: 'PUT', body: JSON.stringify(profileData) })
  console.log('Updating profile:', profileData);
  return {
    success: true,
    message: 'Profile updated successfully',
    data: profileData
  };
};

// Change Password
export const changePassword = async (currentPassword, newPassword) => {
  // TODO: Thay bằng API call: await fetch('/api/doctor/change-password', { method: 'POST', body: JSON.stringify({ currentPassword, newPassword }) })
  console.log('Changing password');
  return {
    success: true,
    message: 'Password changed successfully'
  };
};

// Upload Profile Picture
export const uploadProfilePicture = async (file) => {
  // TODO: Thay bằng API call với FormData
  console.log('Uploading profile picture:', file);
  return {
    success: true,
    message: 'Profile picture uploaded successfully',
    url: URL.createObjectURL(file)
  };
};

// Landing Page Stats
export const getLandingStats = async () => {
  // TODO: Thay bằng API call: await fetch('/api/doctor/landing/stats')
  return {
    patientsTreated: '2.5K+',
    successRate: '98%',
    yearsExperience: '8+'
  };
};

// Get Appointment Details
export const getAppointmentDetails = async (appointmentId) => {
  // TODO: Thay bằng API call: await fetch(`/api/doctor/appointments/${appointmentId}`)
  const allAppointments = await getAllAppointments();
  return allAppointments.find(apt => apt.appointmentId === appointmentId);
};

// Update Appointment Status
export const updateAppointmentStatus = async (appointmentId, status) => {
  // TODO: Thay bằng API call: await fetch(`/api/doctor/appointments/${appointmentId}/status`, { method: 'PUT', body: JSON.stringify({ status }) })
  console.log('Updating appointment status:', appointmentId, 'to', status);
  return {
    success: true,
    message: `Appointment ${status} successfully`,
    appointmentId,
    status
  };
};

export default {
  // Profile
  getDoctorProfile,
  updateDoctorProfile,
  changePassword,
  uploadProfilePicture,
  
  // Dashboard
  getDashboardStats,
  getChartData,
  getRecentEvents,
  getLatestBookings,
  
  // Appointments
  getAllAppointments,
  getAppointmentDetails,
  acceptAppointment,
  cancelAppointment,
  updateAppointmentStatus,
  
  // Landing
  getLandingStats
};
