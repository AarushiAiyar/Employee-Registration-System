import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
    <div className="home-page"> 
        <h1>Welcome to the Employee Record System</h1>
        <Link to="/login" className="link-class"> Login </Link> <br />
        <Link to="/register" className="link-class"> Register </Link>
    </div>
    );
}