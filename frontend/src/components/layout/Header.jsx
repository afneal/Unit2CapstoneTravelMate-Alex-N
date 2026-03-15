import NavMenu from "./NavMenu";
import NavIcon from "./NavIcon";
import travelMateLogo from '../../assets/travelMateLogo.png';

function Header({ isLoggedIn, setIsLoggedIn, setUsername, handleLogout }) {
    return (


        <header>
            <img src={travelMateLogo} className="header-logo" alt="Travel Mate Logo" />

            <NavMenu handleLogout={handleLogout} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername}/>
            <NavIcon handleLogout={handleLogout} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        </header>
    )
}

export default Header;