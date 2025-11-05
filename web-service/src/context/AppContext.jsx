import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    // Mock user authentication - trong thực tế sẽ lấy từ localStorage hoặc API
    const [token, setToken] = useState(localStorage.getItem('token') || false);
    const [userData, setUserData] = useState(null);

    // Mock appointments data
    const [appointments, setAppointments] = useState([
        {
            _id: 'apt1',
            docId: 'doc8',
            slotDate: '7 Dec 2025',
            slotTime: '11:00',
            cancelled: false,
            payment: false,
            isCompleted: false
        },
        {
            _id: 'apt2',
            docId: 'doc9',
            slotDate: '9 Dec 2025',
            slotTime: '11:00',
            cancelled: false,
            payment: false,
            isCompleted: false
        },
        {
            _id: 'apt3',
            docId: 'doc1',
            slotDate: '6 Dec 2025',
            slotTime: '10:30',
            cancelled: true,
            payment: false,
            isCompleted: false
        }
    ]);

    // Load user data when token exists
    useEffect(() => {
        if (token) {
            // Mock user data - trong thực tế sẽ gọi API
            setUserData({
                name: 'John Doe',
                email: 'john@example.com',
                image: 'https://via.placeholder.com/150'
            });
        } else {
            setUserData(null);
        }
    }, [token]);

    // Book appointment
    const bookAppointment = (docId, slotDate, slotTime) => {
        const newAppointment = {
            _id: `apt${Date.now()}`,
            docId,
            slotDate,
            slotTime,
            cancelled: false,
            payment: false,
            isCompleted: false
        };
        
        setAppointments(prev => [...prev, newAppointment]);
        return true;
    };

    // Cancel appointment
    const cancelAppointment = (appointmentId) => {
        setAppointments(prev => 
            prev.map(apt => 
                apt._id === appointmentId 
                    ? { ...apt, cancelled: true } 
                    : apt
            )
        );
    };

    // Pay for appointment
    const payForAppointment = (appointmentId) => {
        setAppointments(prev => 
            prev.map(apt => 
                apt._id === appointmentId 
                    ? { ...apt, payment: true } 
                    : apt
            )
        );
    };

    const value = {
        token,
        setToken,
        userData,
        setUserData,
        appointments,
        setAppointments,
        bookAppointment,
        cancelAppointment,
        payForAppointment
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
