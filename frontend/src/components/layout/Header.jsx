import NavMenu from "./NavMenu";
import NavIcon from "./NavIcon";
import travelMateLogo from '../../assets/travelMateLogo.png';

function Header() {
    return (


        <header>
            <img src={travelMateLogo} className="header-logo" alt="Travel Mate Logo" />

            <NavMenu />
            <NavIcon />

        </header>
    )
}

export default Header;