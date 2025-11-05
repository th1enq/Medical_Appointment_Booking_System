import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets_frontend/assets';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const { userData, setUserData } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [profileData, setProfileData] = useState({
        name: userData?.name || 'teothanhquang',
        image: userData?.image || assets.profile_pic,
        email: 'adminnn@gmail.com',
        phone: '000000000',
        address: {
            line1: '',
            line2: ''
        },
        gender: 'Not Selected',
        birthday: 'Not Selected'
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSaveProfile = () => {
        setUserData({
            ...userData,
            name: profileData.name,
            image: profileData.image
        });
        setIsEdit(false);
        toast.success('Profile updated successfully!');
    };

    const handleChangePassword = () => {
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            toast.error('Please fill in all password fields');
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        toast.success('Password changed successfully!');
        setShowPasswordModal(false);
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="mx-4 sm:mx-[10%]">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 animate-slideUp">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4">
                            My Profile
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Manage your personal information
                        </p>
                    </div>

                    {/* Profile Card */}
                    <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 animate-scaleIn">
                        {/* Profile Image & Name */}
                        <div className="flex flex-col items-center mb-12">
                            <div className="relative group">
                                {isEdit ? (
                                    <label htmlFor="image" className="cursor-pointer relative block">
                                        <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-blue-600 group-hover:ring-cyan-500 transition-all duration-300">
                                            <img
                                                src={profileData.image}
                                                alt="Profile"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="file"
                                            id="image"
                                            hidden
                                            onChange={(e) => {
                                                if (e.target.files[0]) {
                                                    const imageUrl = URL.createObjectURL(e.target.files[0]);
                                                    setProfileData({...profileData, image: imageUrl});
                                                }
                                            }}
                                        />
                                        <p className="text-sm text-gray-500 text-center mt-3">Click to change photo</p>
                                    </label>
                                ) : (
                                    <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-blue-600 shadow-xl">
                                        <img
                                            src={profileData.image}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                
                                {/* Online Badge */}
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                            </div>

                            {/* Name */}
                            {isEdit ? (
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                    className="mt-6 text-3xl font-bold text-center border-b-2 border-blue-600 focus:outline-none focus:border-cyan-500 px-4 py-2 bg-transparent transition-colors"
                                />
                            ) : (
                                <h2 className="mt-6 text-3xl font-bold text-gray-900">{profileData.name}</h2>
                            )}
                        </div>

                        {/* Action Buttons */}
                        {!isEdit && (
                            <div className="flex gap-4 justify-center mb-12 flex-wrap">
                                <button
                                    onClick={() => setIsEdit(true)}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Profile
                                </button>
                                <button
                                    onClick={() => setShowPasswordModal(true)}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Change Password
                                </button>
                            </div>
                        )}

                        {isEdit && (
                            <div className="flex gap-4 justify-center mb-12 flex-wrap">
                                <button
                                    onClick={handleSaveProfile}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEdit(false);
                                        setProfileData({
                                            ...profileData,
                                            name: userData?.name || 'teothanhquang',
                                            image: userData?.image || assets.profile_pic
                                        });
                                    }}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel
                                </button>
                            </div>
                        )}

                        {/* Information Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Contact Information */}
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    Contact Information
                                </h2>
                                
                                <div className="space-y-5">
                                    <div>
                                        <label className="text-sm text-gray-600 font-semibold mb-2 block">Email Address</label>
                                        {isEdit ? (
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                            />
                                        ) : (
                                            <p className="text-blue-600 font-medium text-lg">{profileData.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600 font-semibold mb-2 block">Phone Number</label>
                                        {isEdit ? (
                                            <input
                                                type="text"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium text-lg">{profileData.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600 font-semibold mb-2 block">Address</label>
                                        {isEdit ? (
                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    value={profileData.address.line1}
                                                    onChange={(e) => setProfileData({
                                                        ...profileData,
                                                        address: {...profileData.address, line1: e.target.value}
                                                    })}
                                                    placeholder="Address Line 1"
                                                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                                />
                                                <input
                                                    type="text"
                                                    value={profileData.address.line2}
                                                    onChange={(e) => setProfileData({
                                                        ...profileData,
                                                        address: {...profileData.address, line2: e.target.value}
                                                    })}
                                                    placeholder="Address Line 2"
                                                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                                />
                                            </div>
                                        ) : (
                                            <p className="text-gray-900 font-medium">
                                                {profileData.address.line1 || profileData.address.line2 ? (
                                                    <>
                                                        {profileData.address.line1 && <span className="block">{profileData.address.line1}</span>}
                                                        {profileData.address.line2 && <span className="block">{profileData.address.line2}</span>}
                                                    </>
                                                ) : (
                                                    <span className="text-gray-400">Not provided</span>
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Basic Information */}
                            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    Basic Information
                                </h2>
                                
                                <div className="space-y-5">
                                    <div>
                                        <label className="text-sm text-gray-600 font-semibold mb-2 block">Gender</label>
                                        {isEdit ? (
                                            <select
                                                value={profileData.gender}
                                                onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
                                            >
                                                <option value="Not Selected">Not Selected</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        ) : (
                                            <p className="text-gray-900 font-medium text-lg">{profileData.gender}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600 font-semibold mb-2 block">Date of Birth</label>
                                        {isEdit ? (
                                            <input
                                                type="date"
                                                value={profileData.birthday !== 'Not Selected' ? profileData.birthday : ''}
                                                onChange={(e) => setProfileData({...profileData, birthday: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium text-lg">{profileData.birthday}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scaleIn">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Current Password</label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                    placeholder="Enter current password"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={handleChangePassword}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                Change Password
                            </button>
                            <button
                                onClick={() => {
                                    setShowPasswordModal(false);
                                    setPasswordData({
                                        currentPassword: '',
                                        newPassword: '',
                                        confirmPassword: ''
                                    });
                                }}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
