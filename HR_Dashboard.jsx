import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HR_Dashboard() {
    const navigate = useNavigate()

    const [empl, setEmpl] = useState(null);

    const [form, setForm] = useState({
            look_up_field: ''
        });

    useEffect(() => {
        const fetchHR = async () => {
            try {
                const res = await fetch('http://127.0.0.1:5000/employee/dashboard', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!res.ok) throw new Error('Not logged in');

                const data = await res.json();
                setEmpl(data);
            } catch (err) {
                console.error('Not logged in:', err);
                navigate('/login');
            }
        };

        fetchHR(); 
    }, []);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

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

    return (
        <div>
            {empl ? (
                <div className="dashboard-container">
                    <h1>Welcome, {empl.name}</h1>
                    <div className="dashboard-info">
                        <p><strong>ID:</strong> {empl.id}</p>
                        <p><strong>Email:</strong> {empl.email}</p>
                        <p><strong>Phone:</strong> {empl.phone}</p>
                        <p><strong>Department:</strong> {empl.department}</p>
                        <p><strong>Birthday:</strong> {empl.birthday}</p>
                        <p><strong>Salary:</strong> ₹{empl.salary}</p>
                        <button className="logout-button" onClick= { handleLogout }>Logout</button> <br /> <br />
                        <button onClick={() => navigate('/otp_page')} className="logout-button"> View or Edit Employee Details </button> <br />
                    </div>
                </div>
            ) : <p>Loading dashboard...</p>}
        </div>
    )
}