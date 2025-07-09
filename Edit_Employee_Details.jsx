import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function EditEmployeeDetails() {
    const navigate = useNavigate();

    const [value, setValue] = useState('');
    const [employee, setEmployee] = useState(null);
    const [message, setMessage] = useState('');

    const handleLookup = async (e) => {
        e.preventDefault();
        setEmployee(null)

        const res = await fetch('http://127.0.0.1:5000/employee/lookup', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value: value })
        });

        const data = await res.json();
        if (res.ok) {
            setEmployee(data);
            setMessage('');
        } else {
            setMessage(data.error || 'Something went wrong');
        }
    };

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://127.0.0.1:5000/employee/edit', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });

        const data = await res.json();
        if (res.ok) {
            setMessage(data.success);
        } else {
            setMessage(data.error || 'Update failed');
        }
    };

    const handleNavigate = (e) => {
        navigate('/hrdashboard');
    }

    return (
        <div>
            <form onSubmit={handleLookup} className="form-class">
                <h2>Edit Employee Details</h2>
                <input
                    type="text"
                    placeholder="Enter Employee ID or Name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                />
                <button type="submit">Lookup</button> <br />
            </form>

            <button className="non-form-button" onClick={ handleNavigate }> Return to Dashboard </button>

            {employee && (
                <form onSubmit={handleSubmit} className="form-class">
                    <p> <strong> Employee ID: </strong> { employee.id }</p>
                    <input
                        name="name"
                        value={employee.name || ''}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    <input
                        name="email"
                        value={employee.email || ''}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        name="phone"
                        value={employee.phone || ''}
                        onChange={handleChange}
                        placeholder="Phone"
                    />
                    <select name="department" value={employee.department|| ''} onChange={handleChange} required>
                        <option value="BEE">Backend Engineer</option>
                        <option value="FEE">Frontend Engineer</option>
                        <option value="FSE">Full Stack Engineer</option>
                        <option value="IT"> IT </option>
                        <option value="HR"> HR </option>
                        <option value="MGT"> Management </option>
                    </select>
                    <input
                        name="salary"
                        type="number"
                        value={employee.salary || ''}
                        onChange={handleChange}
                        placeholder="Salary"
                    />
                    <button type="submit">Save Changes</button>
                </form>
            )}

            {message && <p className="dashboard-info p">{message}</p>}
            
        </div>
    );
}