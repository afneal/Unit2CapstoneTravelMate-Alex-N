import NavMenu from "./NavMenu";
import NavIcon from "./NavIcon";
import travelMateLogo from '../../assets/travelMateLogo.png';

function Header({ isLoggedIn }) {
    return (


        <header>
            <img src={travelMateLogo} className="header-logo" alt="Travel Mate Logo" />

            <NavMenu isLoggedIn={isLoggedIn}/>
            <NavIcon isLoggedIn={isLoggedIn}/>

        </header>
    )
}

export default Header;