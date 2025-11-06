import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import { doctors, specialityData } from '../assets_frontend/assets';

const Doctors = () => {
    const [searchParams] = useSearchParams();
    const [filterDoc, setFilterDoc] = useState(doctors);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedSpeciality, setSelectedSpeciality] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const applyFilter = () => {
        const speciality = searchParams.get('speciality');
        if (speciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
            setSelectedSpeciality(speciality);
        } else {
            setFilterDoc(doctors);
            setSelectedSpeciality('All');
        }
    };

    useEffect(() => {
        applyFilter();
    }, [searchParams]);

    const filterBySpeciality = (speciality) => {
        setSelectedSpeciality(speciality);
        if (speciality === 'All') {
            setFilterDoc(doctors);
        } else {
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            if (selectedSpeciality === 'All') {
                setFilterDoc(doctors);
            } else {
                setFilterDoc(doctors.filter(doc => doc.speciality === selectedSpeciality));
            }
        } else {
            let filtered = selectedSpeciality === 'All' 
                ? doctors 
                : doctors.filter(doc => doc.speciality === selectedSpeciality);
            
            filtered = filtered.filter(doc => 
                doc.name.toLowerCase().includes(query.toLowerCase()) ||
                doc.speciality.toLowerCase().includes(query.toLowerCase())
            );
            setFilterDoc(filtered);
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* Header Section */}
            <div className="mx-4 sm:mx-[10%] mb-12">
                <div className="text-center mb-8 animate-slideUp">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 mb-4">
                        Find Your Doctor
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Browse through our extensive list of trusted medical specialists.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8 animate-scaleIn">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search by doctor name or speciality..."
                            className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg"
                        />
                        <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                        Showing <span className="font-bold text-blue-600">{filterDoc.length}</span> doctors
                    </p>
                    
                    {/* Mobile Filter Button */}
                    <button 
                        onClick={() => setShowFilter(!showFilter)}
                        className="md:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filters
                    </button>
                </div>
            </div>

            <div className="mx-4 sm:mx-[10%]">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filter Section */}
                    <div className={`md:w-72 shrink-0 ${showFilter ? 'block' : 'hidden md:block'} animate-slideDown`}>
                        <div className="sticky top-24">
                            <div className="glass rounded-2xl p-6 shadow-xl border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Specialities
                                </h3>
                                
                                <div className="space-y-2">
                                    <button
                                        onClick={() => filterBySpeciality('All')}
                                        className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                            selectedSpeciality === 'All'
                                                ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-105'
                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        All Specialities
                                    </button>
                                    {specialityData.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => filterBySpeciality(item.speciality)}
                                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                                selectedSpeciality === item.speciality
                                                    ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-105'
                                                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            {item.speciality}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Doctors Grid */}
                    <div className="flex-1">
                        {filterDoc.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filterDoc.map((doctor, index) => (
                                    <div 
                                        key={doctor._id}
                                        className="animate-scaleIn"
                                        style={{animationDelay: `${index * 0.05}s`}}
                                    >
                                        <DoctorCard doctor={doctor} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Doctors Found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search query</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doctors;
