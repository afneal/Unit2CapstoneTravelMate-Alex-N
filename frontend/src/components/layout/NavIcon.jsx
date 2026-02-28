import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

function NavIcon() {
    const [isExpanded, setIsExpanded] = useState(false); //set initial state to closed navIcon window



    useEffect(() => {
        const handleWindowResize = () => { //when window size is equal or larger than 768, and the menu is expanded, will setIsExpanded to false to close menu
            if (window.innerWidth >= 768 && isExpanded) {
                setIsExpanded(false);
            }
        }
        window.addEventListener('resize', handleWindowResize);//on 'resize of window' eventListener, will handle function
    })



    return (
        <nav className={isExpanded ? 'isExpanded' : ''}>
            <button className='nav-icon-button' onClick={() => setIsExpanded(!isExpanded)}><FaBars /></button>

            {isExpanded && ( //onClick sets isExpanded to opposite of its current value, toggles the menu open and closed, ifExpanded then shows navMenu links
                <>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/traveltips">Travel Tips</Link></li>
                        <li><Link to="/resources">Resources</Link></li>
                        <li><Link to="/buildtrips">Build Trip</Link></li>
                        <li><Link to="/savedtrips">Saved Trips</Link></li>
                    </ul>
                </>
            )}
        </nav>


    )
}

export default NavIcon;