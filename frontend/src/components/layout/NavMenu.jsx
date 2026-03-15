import { Link } from 'react-router';
import UserLogin from '../Pages/UserLogin';
import Button from '../planner-components/Button';
import { useNavigate } from 'react-router';


function NavMenu({ isLoggedIn, handleLogout }) {
    const navigate = useNavigate();

    if (!isLoggedIn) return null;

   

    return (
        
        <nav className='nav-menu'>


            <ul>
                
                <li><Link to="/">Home</Link></li>
                <li><Link to="/traveltips">Travel Tips</Link></li>
                <li><Link to="/resources">Resources</Link></li>
                
                <li><Link to="/trips">My Trips</Link></li>
                <li>
                    <Button className="logout-button"
                        onClick={handleLogout}
                        label="Logout"
                    />
                </li>
            </ul>
            
        </nav>
        
    )
   
}


export default NavMenu;

