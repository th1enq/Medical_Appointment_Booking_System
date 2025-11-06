import React from 'react';
import { Outlet } from 'react-router-dom';
import DoctorSidebar from '../components/DoctorSidebar';

const DoctorLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DoctorSidebar />
      <div className="flex-1 ml-72">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorLayout;
