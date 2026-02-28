import travelMateLogo from '../../assets/travelMateLogo.png';

function Footer() {
    let thisYear = new Date().getFullYear();
    return (
        <footer>
            <div>

                <p className='footer-text'>&copy; {thisYear}</p><img src={travelMateLogo} className="footer-logo" alt="Travel Mate Logo" />
            </div>

        </footer>

    )
}

export default Footer;