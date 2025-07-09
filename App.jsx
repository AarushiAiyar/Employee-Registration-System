import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Employee_Register from './components/Employee_Register';
import Employee_Login from './components/Employee_Login';
import Employee_Dashboard from './components/Employee_Dashboard';
import HR_Dashboard from './components/HR_Dashboard';
import OTP_Page from './components/OTP_Page';
import Edit_Employee_Details from './components/Edit_Employee_Details';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Employee_Register />} />
      <Route path="/login" element={<Employee_Login/>} />
      <Route path="/dashboard" element={<Employee_Dashboard />}/>
      <Route path="/hrdashboard" element={<HR_Dashboard />}/>
      <Route path="/otp_page" element={<OTP_Page />}/>
      <Route path="/edit_employee_details" element={<Edit_Employee_Details />}/>
    </Routes>
  )
}