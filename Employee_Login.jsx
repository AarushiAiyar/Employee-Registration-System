import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Employee_Login({ setUser }) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://127.0.0.1:5000/employee/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (!res.ok) throw new Error('Login failed');

            const data = await res.json();
            console.log(data)

            if (data.user.is_hr) {
                navigate('/hrdashboard');
            } else {
                navigate('/dashboard');
            }

        } catch (err) {
            alert('Login failed');
            console.log(err)
        }
    };

    const handlePageChange = (e) => {
        navigate('/register');
    }

    return (
        <div>
            <button className="non-form-button" onClick={ handlePageChange }> Register Instead </button>
            
            <form onSubmit={handleSubmit} className="form-class">
                <h2>Sign In</h2>
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
