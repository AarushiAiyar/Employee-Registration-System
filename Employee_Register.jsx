import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Employee_Register() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        birthday: '',
        department: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form,"form")
    try {
        const response = await fetch('http://127.0.0.1:5000/employee/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(form)
        });

        const data = await response.json();
        console.log(data); 

        if (response.ok == true) {
            navigate('/login');
        } else {
            alert(data.error || 'Something went wrong')
        }
        
    } catch (err) {
        console.error('Registration failed:', err.response ? err.response.data : err.message);
        alert('Registration failed: ' + (err.response?.data?.error || err.message));
    }
    };

    const handlePageChange = (e) => {
        navigate('/login');
    }

    return (
    <div>
        <button className="non-form-button" onClick={ handlePageChange }> Login Instead </button>
        
        <form onSubmit={handleSubmit} className="form-class">
        <h2> Sign Up </h2>
        <input name="name" placeholder="Name" onChange={handleChange} required /> <br />
        <input name="birthday" type="date" placeholder="Birthday" onChange={handleChange} required /> <br />
        <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} required /> <br />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required /> <br />

        <select name="department" onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="BEE">Backend Engineer</option>
            <option value="FEE">Frontend Engineer</option>
            <option value="FSE">Full Stack Engineer</option>
            <option value="IT"> IT </option>
            <option value="HR"> HR </option>
            <option value="MGT"> Management </option>
        </select> <br />

        <input name="username" placeholder="Username" onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required /> <br />
        <button type="submit">Register</button>
        </form>
    </div>
    )
}