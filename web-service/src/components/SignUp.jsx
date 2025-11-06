"use client"

import { useState, useContext } from "react"
import PropTypes from "prop-types"
import { Calendar, Heart, Shield, Sparkles, Eye, EyeOff } from "lucide-react"
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { use } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const INITIAL_FORM = {username: "", email:"", password:"", confirmpassword:""}
const SignUp = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(INITIAL_FORM)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.username || !formData.email || !formData.password || !formData.confirmpassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true)
    
    // Mock signup - trong thực tế sẽ gọi API
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Mock successful signup
    const mockToken = 'mock-token-' + Date.now();
    localStorage.setItem('token', mockToken);
    setToken(mockToken);
    
    toast.success('Account created successfully!');
    setIsLoading(false)
    navigate('/');
  }

  const fields = [
    {
        label: "Username",
        type: "text",
        placeholder: "John Doe",
        name: "username"
    },
    {
        label:"Email address",
        type: "email",
        placeholder: "you@example.com",
        name: "email"
    },
    {
        label: "Password",
        type: showPassword ? "text" : "password",
        placeholder: "Password",
        isPassword: true,
        name:"password"
    },
    {
        label: "Confirm password",
        type: showPassword ? "text" : "password",
        placeholder: "Confirm your password",
        isPassword: true,
        name:"confirmpassword"
    }
  ]

  return (
    <>
        <style>{`
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            @keyframes pulse-glow {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 0.6; transform: scale(1.05); }
            }
            @keyframes slide-in-left {
                from { opacity: 0; transform: translateX(-50px); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes slide-in-right {
                from { opacity: 0; transform: translateX(50px); }
                to { opacity: 1; transform: translateX(0); }
            }
            .animate-float { animation: float 6s ease-in-out infinite; }
            .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
            .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
            .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
            `}
        </style>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-purple-50 p-4 relative overflow-hidden">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left side */}
          <div className="hidden lg:flex flex-col gap-8 animate-slide-in-left">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <Heart className="w-7 h-7 text-white" fill="currentColor" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">MediCare</h1>
                  <p className="text-sm text-gray-600">Appointment System</p>
                </div>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-balance">
                Your health journey starts here
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Book appointments with top healthcare professionals in seconds. Modern, secure, and designed for your
                convenience.
              </p>
            </div>
            <div className="grid gap-4">
              <FeatureCard
                icon={<Calendar className="w-5 h-5" />}
                title="Easy Scheduling"
                description="Book appointments 24/7 with instant confirmation"
                delay="0.2s"
              />
              <FeatureCard
                icon={<Shield className="w-5 h-5" />}
                title="Secure & Private"
                description="Your health data is encrypted and protected"
                delay="0.4s"
              />
              <FeatureCard
                icon={<Sparkles className="w-5 h-5" />}
                title="Smart Reminders"
                description="Never miss an appointment with timely notifications"
                delay="0.6s"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center justify-center animate-slide-in-right">
            <div className="w-full max-w-md p-8 shadow-2xl border border-gray-200/50 backdrop-blur-sm bg-white/95 rounded-lg">
              {/* Mobile logo */}
              <div className="lg:hidden flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <Heart className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">MediCare</h1>
                  <p className="text-xs text-gray-600">Appointment System</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2 text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-gray-900">Create your account</h3>
                  <p className="text-gray-600">Get started with your healthcare journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {fields.map(({label, type, placeholder, isPassword, name}) => (
                        <div key={name} className="space-y-2 ">
                            <span className="text-sm font-medium text-gray-900 block">{label}</span>
                            <div className="w-full flex h-12 px-4  bg-white border border-gray-300 rounded-md focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-300">
                            <input type={type} placeholder={placeholder} value={formData[name]} onChange={(e) => setFormData({...formData, [name]: e.target.value})}
                             className="w-full focus:outline-none text-sm text-gray-700" required />
                            {isPassword && (
                              <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="ml-2 text-gray-500">
                                {showPassword ? <EyeOff className="w-5 h-5 mr-3 cursor-pointer" /> : <Eye className="w-5 h-5 mr-3 cursor-pointer"/>}
                              </button>
                            )}
                            </div>
                        </div>
                    ))}

                  <button
                    type="submit"
                    className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-base rounded-md shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing up...
                      </div>
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-600">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="h-11 px-4 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 hover:border-teal-500/50 transition-all duration-300 bg-transparent"
                  >
                  <FaGoogle className="w-5 h-5 mr-2"/>
                    Google
                  </button>
                  <button
                    type="button"
                    className="h-11 px-4 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 hover:border-teal-500/50 transition-all duration-300 bg-transparent"
                  >
                    <FaGithub className="w-5 h-5 mr-2"/>
                    GitHub
                  </button>
                </div>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-teal-600 hover:text-teal-700 font-semibold transition-colors">
                  Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function FeatureCard({ icon, title, description, delay }) {
  return (
    <div
      className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 group"
      style={{ animationDelay: delay }}
    >
      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  delay: PropTypes.string,
}

export default SignUp
