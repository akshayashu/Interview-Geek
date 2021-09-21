import './HomePage.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

function HomePage() {
    return (
        <div className="home-container">
            <div className="home-top-container">
                <div className="home-header">
                    <h1 className="home-logo">Interview Geek</h1>
                    <ul className="home-page-route">

                        <p>Home</p>
                        <p>About</p>
                        <p>
                            <NavLink
                                style={{ background: 'unset', textDecoration: 'none', color: 'black' }} to="/interview">Interview</NavLink>
                        </p>
                        <p>Login</p>
                    </ul>
                </div>
                <div className="home-intro">
                    <img className="home-img"></img>
                </div>

            </div>
        </div>
    )
}

export default HomePage;