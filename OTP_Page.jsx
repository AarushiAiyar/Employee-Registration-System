import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OTP_Page() {
    const navigate = useNavigate();
    const [otp, setOTP] = useState('');

    const handleChange = (e) => {
        setOTP(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const verifyRes = await fetch('http://127.0.0.1:5000/employee/verifyotp', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ entered_otp: otp })
        });

        if (verifyRes.status === 200) {
            navigate('/edit_employee_details');
        } else {
            alert("Incorrect OTP entered");
        }
    };

    const sendOTP = async () => {
        const response = await fetch('http://127.0.0.1:5000/employee/sendotp', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.status === 200) {
            alert("OTP sent successfully");
        } else {
            alert("Failed to send OTP");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <button onClick={sendOTP} className="non-form-button">Send OTP</button>
            <form className="form-class" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter OTP (timeout in 3 mins)"
                    value={otp}
                    onChange={handleChange}
                />
                <input type="submit" value="Verify OTP" />
            </form>
        </div>
    );
}