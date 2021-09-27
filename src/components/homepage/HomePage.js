import './HomePage.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/boy-laptop.png';
import handshake from '../../assets/handshake.png';
import twitter from '../../assets/twitter.png';
import fb from '../../assets/facebook.png';
import insta from '../../assets/instagram.png';
import linkedin from '../../assets/linkedin.png';
import codeEditor from '../../assets/hand-pencil.png';
import interview from '../../assets/girl-desk-laptop.png';
import screenShare from '../../assets/man-sitting-laptop.png';

function HomePage() {
    return (
        <div className="home-container">
            <div className="home-top-container">
                {/* header */}
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

                <div className="home-introduction">
                    <div className="home-intro">
                        <h2>Interview Geek</h2>
                        <p>
                            Interview Geek is the #1 rated technical recruitment platform for teams to test
                            the coding skills of developers and make evidence-based hiring decisions.
                            We can help you conduct coding interviews and test programming skills
                            of developers at scale – turning a challenge into one of your greatest opportunities.
                        </p>
                        <a>Get started</a>
                    </div>
                    <div className="home-logo-img">
                        <img
                            src={logo}></img>
                    </div>
                </div>

                <div className="home-services">
                    <h1>Services</h1>
                    <div className="home-services-wrapper">
                        <div className="home-services-code-editor">
                            <h2>Code Editor</h2>
                            <p>✔ Eat. Sleep. Code. Repeat. Be a proper geek</p>
                            <p>✔ You can code in C++, Java and Python.</p>
                            <p>✔ Accurate execution report.</p>
                            <a>Know more</a>
                            <img className="home-service-img"
                                src={codeEditor}></img>
                        </div>
                        <div className="home-services-face-time">
                            <h2>Interview</h2>
                            <p>✔ Take or give interview at anytime and anywhere</p>
                            <p>✔ Video calling is there to make your conversation beautiful</p>
                            <p>✔ Something will come here</p>
                            <a>Get started</a>
                            <img className="home-service-img"
                                src={interview}></img>
                        </div>
                        <div className="home-services-screen-share">
                            <h2>Screen Share</h2>
                            <p>✔ Interviewer can also watch interviewee activities</p>
                            <p>✔ Flag will be raised if interviewee tries to switch</p>
                            <p>✔ Honest tests, honest results</p>
                            <a>Get started</a>
                            <img className="home-service-img"
                                src={screenShare}></img>
                        </div>

                    </div>

                </div>

                {/* footer */}
                <div className="home-footer">
                    <div className="home-footer-content">
                        <div className="home-footer-links">
                            <h2>Interview Geek</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <h3>Connect with us</h3>
                            <div className="home-footer-social">
                                <a href={'https://www.instagram.com/akshay_khanna08/'}>
                                    <div className="home-footter-img-wrapper">
                                        <img src={insta}></img>
                                    </div>
                                </a>
                                <a href={'https://www.facebook.com/akshay.khanna.9231/'}>
                                    <div className="home-footter-img-wrapper">
                                        <img src={fb}></img>
                                    </div>
                                </a>
                                <a href={'https://twitter.com/AkshayK10904164'}>
                                    <div className="home-footter-img-wrapper">
                                        <img src={twitter}></img>
                                    </div>
                                </a>
                                <a href={'https://www.linkedin.com/in/akshay-khanna-972280193/'}>
                                    <div className="home-footter-img-wrapper">
                                        <img src={linkedin}></img>
                                    </div>
                                </a>
                            </div>

                        </div>
                        <div className="home-footer-logo">
                            <img
                                src={handshake}></img>
                        </div>
                    </div>
                    <p>© 2021 Copyright : Interview Geek</p>
                </div>


            </div>
        </div>
    )
}

export default HomePage;