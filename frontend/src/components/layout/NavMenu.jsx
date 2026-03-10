import { Link } from 'react-router';
import UserLogin from '../Pages/UserLogin';
import Button from '../planner-components/Button';


function NavMenu({ isLoggedIn, setIsLoggedIn }) {
    if (!isLoggedIn) return null;

    return (
        <nav className='nav-menu'>

            <ul>
                
                <li><Link to="/">Home</Link></li>
                <li><Link to="/traveltips">Travel Tips</Link></li>
                <li><Link to="/resources">Resources</Link></li>
                <li><Link to="/buildtrips">Build Trip</Link></li>
                <li><Link to="/savedtrips">Saved Trips</Link></li>
                <li><Link to="/itineraryform">View Trips</Link></li>
                <li><Link to="/trips">All Trips</Link></li>
                <li>
                    <Button className="logout-button"
                        onClick={() => setIsLoggedIn(false)}
                        label="Logout"
                    />
                </li>
            </ul>
        </nav>
    )
}


export default NavMenu;

