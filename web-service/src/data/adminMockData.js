import { assets } from '../assets_frontend/assets';

// Mock data for admin dashboard statistics
export const getDashboardStats = () => {
  return {
    totalDoctors: 24,
    totalAppointments: 156,
    totalPatients: 342,
    todayAppointments: 12,
    pendingAppointments: 8,
    completedAppointments: 145,
    cancelledAppointments: 3
  };
};

// Mock data for earnings by date (Event Sourcing simulation)
export const getEarningsData = () => {
  const dates = [];
  const earnings = [];
  const currentDate = new Date();
  
  // Generate data for last 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    // Random earnings between 5000 and 25000
    earnings.push(Math.floor(Math.random() * 20000) + 5000);
  }
  
  return { dates, earnings };
};

// Mock data for appointment events (Event Sourcing)
export const getAppointmentEvents = () => {
  return [
    { date: '2025-11-06 09:30', event: 'APPOINTMENT_CREATED', amount: 500, doctor: 'Dr. Smith' },
    { date: '2025-11-06 10:15', event: 'APPOINTMENT_COMPLETED', amount: 500, doctor: 'Dr. Johnson' },
    { date: '2025-11-06 11:00', event: 'PAYMENT_RECEIVED', amount: 800, doctor: 'Dr. Williams' },
    { date: '2025-11-05 14:30', event: 'APPOINTMENT_COMPLETED', amount: 600, doctor: 'Dr. Brown' },
    { date: '2025-11-05 16:45', event: 'PAYMENT_RECEIVED', amount: 700, doctor: 'Dr. Davis' },
  ];
};

// Mock data for recent appointments
export const getRecentAppointments = () => {
  return [
    {
      _id: 'apt001',
      patient: {
        name: 'Sarah Johnson',
        image: assets.profile_pic || 'https://via.placeholder.com/50'
      },
      doctor: {
        name: 'Dr. Richard James',
        image: assets.doc1,
        specialty: 'General Physician'
      },
      date: '2025-11-08',
      time: '10:00 AM',
      status: 'pending',
      amount: 500
    },
    {
      _id: 'apt002',
      patient: {
        name: 'Michael Chen',
        image: assets.profile_pic || 'https://via.placeholder.com/50'
      },
      doctor: {
        name: 'Dr. Emily Davis',
        image: assets.doc2,
        specialty: 'Gynecologist'
      },
      date: '2025-11-08',
      time: '11:30 AM',
      status: 'completed',
      amount: 600
    },
    {
      _id: 'apt003',
      patient: {
        name: 'Jessica Williams',
        image: assets.profile_pic || 'https://via.placeholder.com/50'
      },
      doctor: {
        name: 'Dr. Sarah Patel',
        image: assets.doc3,
        specialty: 'Dermatologist'
      },
      date: '2025-11-07',
      time: '02:00 PM',
      status: 'cancelled',
      amount: 450
    },
    {
      _id: 'apt004',
      patient: {
        name: 'David Martinez',
        image: assets.profile_pic || 'https://via.placeholder.com/50'
      },
      doctor: {
        name: 'Dr. Christopher Lee',
        image: assets.doc4,
        specialty: 'Pediatricians'
      },
      date: '2025-11-07',
      time: '09:00 AM',
      status: 'completed',
      amount: 550
    },
    {
      _id: 'apt005',
      patient: {
        name: 'Emma Thompson',
        image: assets.profile_pic || 'https://via.placeholder.com/50'
      },
      doctor: {
        name: 'Dr. Jennifer Garcia',
        image: assets.doc5,
        specialty: 'Neurologist'
      },
      date: '2025-11-06',
      time: '03:30 PM',
      status: 'completed',
      amount: 700
    }
  ];
};

// Mock data for all appointments
export const getAllAppointments = () => {
  return [
    ...getRecentAppointments(),
    {
      _id: 'apt006',
      patient: {
        name: 'Robert Anderson',
        image: assets.profile_pic || 'https://via.placeholder.com/50'
      },
      doctor: {
        name: 'Dr. Andrew Williams',
        image: assets.doc6,
        specialty: 'Gastroenterologist'
      },
      date: '2025-11-09',
      time: '11:00 AM',
      status: 'pending',
      amount: 650
    },
    {
      _id: 'apt007',
      patient: {
        name: 'Sophia Brown',
        image: assets.profile_pic || 'https://via.placeholder.com/50'
      },
      doctor: {
        name: 'Dr. Christopher Davis',
        image: assets.doc7,
        specialty: 'General Physician'
      },
      date: '2025-11-09',
      time: '02:00 PM',
      status: 'pending',
      amount: 500
    }
  ];
};

// Mock data for all doctors
export const getAllDoctors = () => {
  return [
    {
      _id: 'doc1',
      name: 'Dr. Richard James',
      image: assets.doc1,
      speciality: 'General Physician',
      degree: 'MBBS',
      experience: '4 Years',
      about: 'Dr. Richard has a strong commitment to delivering comprehensive medical care',
      fees: 500,
      address: '17th Cross, Richmond Circle, Ring Road, London',
      email: 'richard@example.com',
      available: true
    },
    {
      _id: 'doc2',
      name: 'Dr. Emily Davis',
      image: assets.doc2,
      speciality: 'Gynecologist',
      degree: 'MBBS',
      experience: '3 Years',
      about: 'Dr. Emily specializes in women\'s health and reproductive medicine',
      fees: 600,
      address: '27th Cross, Westminster, London',
      email: 'emily@example.com',
      available: true
    },
    {
      _id: 'doc3',
      name: 'Dr. Sarah Patel',
      image: assets.doc3,
      speciality: 'Dermatologist',
      degree: 'MBBS',
      experience: '1 Years',
      about: 'Dr. Sarah is dedicated to providing expert skin care services',
      fees: 450,
      address: '37th Cross, Camden Town, London',
      email: 'sarah@example.com',
      available: true
    },
    {
      _id: 'doc4',
      name: 'Dr. Christopher Lee',
      image: assets.doc4,
      speciality: 'Pediatricians',
      degree: 'MBBS',
      experience: '2 Years',
      about: 'Dr. Christopher is committed to children\'s health and development',
      fees: 550,
      address: '47th Cross, Shoreditch, London',
      email: 'christopher@example.com',
      available: false
    },
    {
      _id: 'doc5',
      name: 'Dr. Jennifer Garcia',
      image: assets.doc5,
      speciality: 'Neurologist',
      degree: 'MBBS',
      experience: '4 Years',
      about: 'Dr. Jennifer specializes in brain and nervous system disorders',
      fees: 700,
      address: '57th Cross, Notting Hill, London',
      email: 'jennifer@example.com',
      available: true
    },
    {
      _id: 'doc6',
      name: 'Dr. Andrew Williams',
      image: assets.doc6,
      speciality: 'Gastroenterologist',
      degree: 'MBBS',
      experience: '4 Years',
      about: 'Dr. Andrew focuses on digestive system health',
      fees: 650,
      address: '57th Cross, Chelsea, London',
      email: 'andrew@example.com',
      available: true
    },
    {
      _id: 'doc7',
      name: 'Dr. Christopher Davis',
      image: assets.doc7,
      speciality: 'General Physician',
      degree: 'MBBS',
      experience: '4 Years',
      about: 'Dr. Christopher provides comprehensive healthcare services',
      fees: 500,
      address: '17th Cross, Kensington, London',
      email: 'chris@example.com',
      available: true
    },
    {
      _id: 'doc8',
      name: 'Dr. Timothy White',
      image: assets.doc8,
      speciality: 'Gynecologist',
      degree: 'MBBS',
      experience: '3 Years',
      about: 'Dr. Timothy is dedicated to women\'s health care',
      fees: 600,
      address: '27th Cross, Hammersmith, London',
      email: 'timothy@example.com',
      available: true
    },
    {
      _id: 'doc9',
      name: 'Dr. Ava Mitchell',
      image: assets.doc9,
      speciality: 'Dermatologist',
      degree: 'MBBS',
      experience: '1 Years',
      about: 'Dr. Ava provides expert dermatological care',
      fees: 450,
      address: '37th Cross, Brixton, London',
      email: 'ava@example.com',
      available: true
    },
    {
      _id: 'doc10',
      name: 'Dr. Jeffrey King',
      image: assets.doc10,
      speciality: 'Pediatricians',
      degree: 'MBBS',
      experience: '2 Years',
      about: 'Dr. Jeffrey specializes in pediatric care',
      fees: 550,
      address: '47th Cross, Hackney, London',
      email: 'jeffrey@example.com',
      available: true
    }
  ];
};

// Function to add new doctor
export const addDoctor = (doctorData) => {
  // In real app, this would make an API call
  console.log('Adding doctor:', doctorData);
  return {
    success: true,
    message: 'Doctor added successfully',
    doctorId: `doc${Date.now()}`
  };
};

// Function to update doctor
export const updateDoctor = (doctorId, updateData) => {
  console.log('Updating doctor:', doctorId, updateData);
  return {
    success: true,
    message: 'Doctor updated successfully'
  };
};

// Function to delete doctor
export const deleteDoctor = (doctorId) => {
  console.log('Deleting doctor:', doctorId);
  return {
    success: true,
    message: 'Doctor deleted successfully'
  };
};

// Function to toggle doctor availability
export const toggleDoctorAvailability = (doctorId) => {
  console.log('Toggling availability for doctor:', doctorId);
  return {
    success: true,
    message: 'Doctor availability updated'
  };
};

// Function to cancel appointment
export const cancelAppointment = (appointmentId) => {
  console.log('Cancelling appointment:', appointmentId);
  return {
    success: true,
    message: 'Appointment cancelled successfully'
  };
};
