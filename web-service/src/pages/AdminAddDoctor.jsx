import React, { useState } from 'react';
import { assets as adminAssets } from '../assets_admin/assets';
import { addDoctor } from '../data/adminMockData';
import { toast } from 'react-toastify';

const AdminAddDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    experience: '1 Year',
    fees: '',
    speciality: 'General Physician',
    degree: '',
    address: '',
    about: ''
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const specialities = [
    'General Physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ];

  const experiences = [
    '1 Year',
    '2 Years',
    '3 Years',
    '4 Years',
    '5 Years',
    '10+ Years'
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!image) {
      toast.error('Please upload a doctor image');
      return;
    }

    if (!formData.name || !formData.email || !formData.password || !formData.fees || !formData.degree || !formData.address || !formData.about) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      // In real app, would upload image and send data to API
      const result = addDoctor({
        ...formData,
        image: imagePreview
      });

      if (result.success) {
        toast.success('Doctor added successfully!');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          experience: '1 Year',
          fees: '',
          speciality: 'General Physician',
          degree: '',
          address: '',
          about: ''
        });
        setImage(null);
        setImagePreview(null);
      }
    } catch (error) {
      toast.error('Failed to add doctor. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Add New Doctor</h1>
        <p className="text-slate-500">Fill in the details to add a new doctor to the system</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        {/* Image Upload */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Doctor Image <span className="text-red-500">*</span>
          </label>
          <div className="flex items-start gap-6">
            <label className="cursor-pointer group">
              <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 flex items-center justify-center overflow-hidden transition-all duration-200 bg-slate-50 group-hover:bg-blue-50">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <img src={adminAssets.upload_area} alt="Upload" className="w-12 h-12 opacity-50" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <div className="flex-1">
              <p className="text-sm text-slate-600 mb-2">
                Upload a professional photo of the doctor
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Recommended size: 400x400 pixels</li>
                <li>• Format: JPG, PNG or WebP</li>
                <li>• Max file size: 5MB</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Doctor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dr. John Smith"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="doctor@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Speciality */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Speciality <span className="text-red-500">*</span>
            </label>
            <select
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 bg-white"
            >
              {specialities.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Degree */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Degree <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="MBBS, MD"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Experience <span className="text-red-500">*</span>
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 bg-white"
            >
              {experiences.map(exp => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>

          {/* Fees */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Consultation Fees <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="500"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
                required
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="17th Cross, Richmond Circle, Ring Road, London"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
            required
          />
        </div>

        {/* About */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            About Doctor <span className="text-red-500">*</span>
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Brief description about the doctor's expertise and experience..."
            rows="4"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: '',
                email: '',
                password: '',
                experience: '1 Year',
                fees: '',
                speciality: 'General Physician',
                degree: '',
                address: '',
                about: ''
              });
              setImage(null);
              setImagePreview(null);
            }}
            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all duration-200"
          >
            Reset Form
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddDoctor;
