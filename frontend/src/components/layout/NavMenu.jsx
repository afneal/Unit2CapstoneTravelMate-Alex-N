import { Link } from 'react-router';



function NavMenu() {

    return (
        <nav className='nav-menu'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/traveltips">Travel Tips</Link></li>
                <li><Link to="/resources">Resources</Link></li>
                <li><Link to="/buildtrips">Build Trip</Link></li>
                <li><Link to="/savedtrips">Saved Trips</Link></li>
                <li><Link to="/itineraryform">View Trips</Link></li>
            </ul>
        </nav>
    )
}

export default NavMenu;

