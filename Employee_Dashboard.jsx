import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Employee_Dashboard() {
  const [empl, setEmpl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5000/employee/dashboard', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then(data => {
        setEmpl(data);
        console.log('Received employee data:', data);
      })
      .catch(err => {
        console.error('Not logged in:', err);
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
        await fetch('http://127.0.0.1:5000/employee/logout', {
            method: 'POST',
            credentials: 'include'
        });
        navigate('/');
    } catch (err) {
        console.error('Logout failed:', err);
    }
    };

  if (!empl) return <p>Not logged in</p>;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {empl.name}</h1>
      <div className="dashboard-info">
        <p><strong>ID:</strong> {empl.id}</p>
        <p><strong>Email:</strong> {empl.email}</p>
        <p><strong>Phone:</strong> {empl.phone}</p>
        <p><strong>Department:</strong> {empl.department}</p>
        <p><strong>Birthday:</strong> {empl.birthday}</p>
        <p><strong>Salary:</strong> ₹{empl.salary}</p>
        <p> <strong> Status: </strong> {empl.status} </p>
      </div>
      <button className="logout-button" onClick={ handleLogout }>Logout</button>
    </div>
  );
}
