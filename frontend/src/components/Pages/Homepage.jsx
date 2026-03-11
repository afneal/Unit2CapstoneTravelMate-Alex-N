import React from 'react'
import { Link } from 'react-router'


function Homepage({ isLoggedIn }) {
    return (
        <main>
            <div className='homepage'>
                <h1 className='homepage-text'>Welcome to Travel Mate!</h1>
                <p>Your adventure, perfectly planned.</p> <p> Organize your journey with <span style={{ color: "#005A9C", fontSize: "25px" }}> <strong> Travel Mate!</strong></span> </p>
                {!isLoggedIn ? (
                <p>
                    <Link to="/login" className='homepage-main'>Login or Register</Link>
                </p>
                ) : (
                    <Link to="/trips" className='homepage-main'>Get Started Now!</Link>
                )}
            </div>
        </main>
    )
}

export default Homepage;