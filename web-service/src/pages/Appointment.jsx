import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctors } from '../assets_frontend/assets';
import { assets } from '../assets_frontend/assets';
import DoctorCard from '../components/DoctorCard';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Appointment = () => {
    const { docId } = useParams();
    const navigate = useNavigate();
    const { token, bookAppointment } = useContext(AppContext);
    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    // Fetch doctor info
    const fetchDocInfo = () => {
        const doctor = doctors.find(doc => doc._id === docId);
        setDocInfo(doctor);
    };

    // Generate available time slots for next 7 days
    const getAvailableSlots = () => {
        const slots = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            // Set end time to 9 PM
            const endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0);

            // Set start time based on current time or 10 AM
            if (i === 0) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            const timeSlots = [];
            while (currentDate < endTime) {
                const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                });

                // Increment by 1 hour
                currentDate.setMinutes(currentDate.getMinutes() + 60);
            }

            slots.push(timeSlots);
        }

        setDocSlots(slots);
    };

    // Get related doctors (same speciality)
    const relatedDoctors = doctors.filter(doc => 
        doc.speciality === docInfo?.speciality && doc._id !== docId
    ).slice(0, 5);

    useEffect(() => {
        fetchDocInfo();
    }, [docId]);

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots();
        }
    }, [docInfo]);

    const handleBookAppointment = async () => {
        if (!slotTime) {
            toast.warning('Please select a time slot');
            return;
        }

        const date = docSlots[slotIndex][0]?.datetime;
        const slotDate = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`;

        // Book appointment
        const success = bookAppointment(docId, slotDate, slotTime);
        
        if (success) {
            toast.success('Appointment booked successfully!');
            navigate('/my-appointments');
        } else {
            toast.error('Failed to book appointment. Please try again.');
        }
    };

    if (!docInfo) {
        return (
            <div className="mx-4 sm:mx-[10%] py-16">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="mx-4 sm:mx-[10%] py-16 mt-10">
            {/* Doctor Details */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
                {/* Doctor Image */}
                <div className="bg-blue-600 rounded-lg overflow-hidden w-full md:w-64 shrink-0">
                    <img 
                        src={docInfo.image} 
                        alt={docInfo.name}
                        className="w-full bg-blue-600"
                    />
                </div>

                {/* Doctor Info */}
                <div className="flex-1 border border-gray-300 rounded-lg p-8 bg-white">
                    {/* Name and Degree */}
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-semibold text-gray-900">
                            {docInfo.name}
                        </h1>
                        <img src={assets.verified_icon} alt="verified" className="w-5" />
                    </div>

                    {/* Degree and Speciality */}
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <span>{docInfo.degree} - {docInfo.speciality}</span>
                        <button className="px-2 py-1 border border-gray-300 rounded-full text-xs">
                            {docInfo.experience}
                        </button>
                    </div>

                    {/* About */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <h2 className="text-lg font-semibold text-gray-900">About</h2>
                            <img src={assets.info_icon} alt="info" className="w-4" />
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {docInfo.about}
                        </p>
                    </div>

                    {/* Appointment Fee */}
                    <div className="text-gray-700">
                        <span className="font-medium">Appointment fee: </span>
                        <span className="font-semibold text-gray-900">${docInfo.fees}</span>
                    </div>
                </div>
            </div>

            {/* Booking Slots */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Booking slots</h2>
                
                {/* Date Selection */}
                <div className="flex gap-3 overflow-x-auto pb-4 mb-6">
                    {docSlots.length > 0 && docSlots.map((slots, index) => {
                        const date = slots[0]?.datetime;
                        return (
                            <div
                                key={index}
                                onClick={() => setSlotIndex(index)}
                                className={`text-center py-6 px-4 min-w-16 rounded-full cursor-pointer transition-all ${
                                    slotIndex === index 
                                        ? 'bg-blue-600 text-white' 
                                        : 'border border-gray-300 hover:bg-blue-50'
                                }`}
                            >
                                <p className="text-sm font-medium">
                                    {date?.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                                </p>
                                <p className="text-2xl font-bold">
                                    {date?.getDate()}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Time Slots */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-6">
                    {docSlots.length > 0 && docSlots[slotIndex]?.map((slot, index) => (
                        <button
                            key={index}
                            onClick={() => setSlotTime(slot.time)}
                            className={`text-sm py-2 px-3 rounded-full border transition-all ${
                                slot.time === slotTime
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'border-gray-300 hover:bg-blue-50 text-gray-700'
                            }`}
                        >
                            {slot.time}
                        </button>
                    ))}
                </div>

                {/* Book Appointment Button */}
                <button
                    onClick={handleBookAppointment}
                    className="bg-blue-600 text-white px-12 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                    Book an appointment
                </button>
            </div>

            {/* Related Doctors */}
            {relatedDoctors.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Related Doctors</h2>
                    <p className="text-gray-600 mb-8">
                        Simply browse through our extensive list of trusted doctors.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        {relatedDoctors.map((doctor) => (
                            <DoctorCard key={doctor._id} doctor={doctor} />
                        ))}
                    </div>

                    {/* More Button - Only show if there are more than 5 related doctors */}
                    {doctors.filter(doc => doc.speciality === docInfo?.speciality && doc._id !== docId).length > 5 && (
                        <div className="text-center">
                            <button
                                onClick={() => navigate(`/doctors?speciality=${docInfo.speciality}`)}
                                className="bg-blue-100 text-blue-600 px-12 py-3 rounded-full font-medium hover:bg-blue-200 transition-colors"
                            >
                                more
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Appointment;
