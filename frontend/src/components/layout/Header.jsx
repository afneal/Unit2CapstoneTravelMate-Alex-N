import NavMenu from "./NavMenu";
import NavIcon from "./NavIcon";
import travelMateLogo from '../../assets/travelMateLogo.png';

function Header({ isLoggedIn, setIsLoggedIn }) {
    return (


        <header>
            <img src={travelMateLogo} className="header-logo" alt="Travel Mate Logo" />

            <NavMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <NavIcon isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        </header>
    )
}

export default Header;