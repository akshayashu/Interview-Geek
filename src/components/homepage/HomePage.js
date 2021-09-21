import './HomePage.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

function HomePage() {
    return (
        <div className="container">
            <div className="top-Container">
                <div className="header">
                    <h1 className="logo">Interview Geek</h1>
                    <ul className="page-route">

                        <p>Home</p>
                        <p>About</p>
                        <p>
                            <NavLink
                                style={{ textDecoration: 'none', color: 'black' }} to="/interview">Interview</NavLink>
                        </p>
                        <p>Login</p>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default HomePage;