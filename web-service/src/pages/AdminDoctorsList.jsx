import React, { useState, useEffect } from 'react';
import { getAllDoctors, toggleDoctorAvailability, deleteDoctor } from '../data/adminMockData';
import { toast } from 'react-toastify';

const AdminDoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpeciality, setFilterSpeciality] = useState('all');

  useEffect(() => {
    const data = getAllDoctors();
    setDoctors(data);
    setFilteredDoctors(data);
  }, []);

  useEffect(() => {
    let filtered = doctors;

    // Filter by speciality
    if (filterSpeciality !== 'all') {
      filtered = filtered.filter(doc => doc.speciality === filterSpeciality);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, filterSpeciality, doctors]);

  const handleToggleAvailability = (doctorId) => {
    setDoctors(prev =>
      prev.map(doc =>
        doc._id === doctorId ? { ...doc, available: !doc.available } : doc
      )
    );
    toast.success('Doctor availability updated');
  };

  const handleDeleteDoctor = (doctorId, doctorName) => {
    if (window.confirm(`Are you sure you want to delete ${doctorName}?`)) {
      setDoctors(prev => prev.filter(doc => doc._id !== doctorId));
      toast.success('Doctor deleted successfully');
    }
  };

  const specialities = ['all', ...new Set(doctors.map(doc => doc.speciality))];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Doctors List</h1>
          <p className="text-slate-500">Manage all registered doctors</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 w-64"
            />
            <svg
              className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-slate-700">Filter by Speciality:</label>
        <select
          value={filterSpeciality}
          onChange={(e) => setFilterSpeciality(e.target.value)}
          className="px-4 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 bg-white"
        >
          {specialities.map(spec => (
            <option key={spec} value={spec}>
              {spec === 'all' ? 'All Specialities' : spec}
            </option>
          ))}
        </select>
        <div className="ml-auto text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-800">{filteredDoctors.length}</span> of{' '}
          <span className="font-semibold text-slate-800">{doctors.length}</span> doctors
        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Doctor Image & Availability Badge */}
              <div className="relative">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border ${
                    doctor.available
                      ? 'bg-green-100/90 text-green-700 border-green-200'
                      : 'bg-red-100/90 text-red-700 border-red-200'
                  }`}>
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-1">{doctor.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-3">{doctor.speciality}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>{doctor.degree}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{doctor.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-slate-800">${doctor.fees}</span>
                    <span className="text-slate-500">/ consultation</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 line-clamp-2 mb-4">{doctor.about}</p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleAvailability(doctor._id)}
                    className={`flex-1 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                      doctor.available
                        ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200'
                        : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                    }`}
                  >
                    {doctor.available ? 'Set Unavailable' : 'Set Available'}
                  </button>
                  <button
                    onClick={() => handleDeleteDoctor(doctor._id, doctor.name)}
                    className="px-4 py-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-medium transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-800 mb-1">No doctors found</h3>
              <p className="text-sm text-slate-500">Try adjusting your filters or search term</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDoctorsList;
