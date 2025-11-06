import { useCallback } from 'react'
import LoginPage from './components/Login'
import {Route, Routes, useLocation} from "react-router-dom"
import SignUp from './components/Signup'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import DoctorLayout from './components/DoctorLayout'
import DoctorLanding from './pages/DoctorLanding'
import DoctorDashboard from './pages/DoctorDashboard'
import DoctorAppointments from './pages/DoctorAppointments'
import DoctorProfile from './pages/DoctorProfile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  const location = useLocation();
  
  // Check if current route is login, signup, or doctor routes
  const hideLayout = location.pathname === '/login' || 
                     location.pathname === '/signup' || 
                     location.pathname.startsWith('/doctor');

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <NavBar />}
      
      <main className="grow">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:speciality" element={<Doctors />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment/:docId" element={<Appointment />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Doctor Routes */}
            <Route path="/doctor" element={<DoctorLanding />} />
            <Route path="/doctor" element={<DoctorLayout />}>
              <Route path="dashboard" element={<DoctorDashboard />} />
              <Route path="appointments" element={<DoctorAppointments />} />
              <Route path="profile" element={<DoctorProfile />} />
            </Route>
        </Routes>
      </main>

      {!hideLayout && <Footer />}
      <ToastContainer />
    </div>
  )
  
}
export default App
