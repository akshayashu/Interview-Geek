import './HomePage.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/boy-laptop.png'

function HomePage() {
    return (
        <div className="home-container">
            <div className="home-top-container">
                <div className="home-header">
                    <h1 className="home-logo">Interview Geek</h1>
                    <ul className="home-page-route">
                        <li><a className="home-active">Home</a></li>
                        <li><a>About</a></li>
                        <p>
                            <NavLink
                                style={{ background: 'unset', textDecoration: 'none', color: 'black' }} to="/interview">Interview</NavLink>
                        </p>
                        <li><a>login</a></li>
                    </ul>
                </div>
                <div className="home-section1">
                    <div className="home-intro">
                        <h2>Interview Geek</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <a>Get started</a>
                    </div>
                    <div className="home-logo-img">
                        <img 
                        src={logo}></img>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default HomePage;