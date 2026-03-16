
import { Routes, Route, useNavigate } from 'react-router'
import Homepage from './components/Pages/Homepage'
import Header from './components/layout/Header'
import worldMapImage5 from './assets/worldMapImage5.jpg';
import Footer from './components/layout/Footer'
import { useState, useEffect } from 'react'
import './App.css'
import TravelTips from './components/Pages/TravelTips'
import ExchangeRates from './components/Pages/Resources';
import UserLogin from './components/Pages/UserLogin';
import NavMenu from './components/layout/NavMenu';
import TripList from './components/form-components/Trips/TripList';
import TripDisplayPage from './components/form-components/Trips/TripDisplayPage';


function App() { //App owns the states so is the parent

  const navigate = useNavigate();
  

  const [trips, setTrips] = useState([]);
 
  const [isNewUser, setIsNewUser] = useState(false);
  const [username, setUsername] = useState("");



  const [isLoggedIn, setIsLoggedIn] = useState(() => { //useState reads "isLoggedIn" initially
    return sessionStorage.getItem("isLoggedIn") === "true"; //reads sessionStorage and checks if loggedIn is "true" then will set useState to true
  });

  useEffect(() => { //runs every time is isLoggedIn changes and keeps "isLoggedIn" updated
    sessionStorage.setItem("isLoggedIn", isLoggedIn); //sets the isLoggedIn state to sessionStorage, browser session remembers the state
  }, [isLoggedIn]); //dependecny conrolls when the effect is run

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    sessionStorage.removeItem("isLoggedIn"); //on page refresh, not considered logged in anymore because removed key from session storage
    navigate("/login")
  };





  return (
    <>
      <div className='App' style={{
        backgroundImage: `url(${worldMapImage5})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: "100vh",
        margin: '0', opacity: 0.9, backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", padding: "0 0 20px 0"
      }}>
        
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} setUsername={setUsername} />
       
       
         

        <Routes>
          <Route path="/" element={<Homepage isLoggedIn={isLoggedIn} />} />
          <Route path="/traveltips" element={<TravelTips />} />
          <Route path="/resources" element={<ExchangeRates />} />
          <Route path="/login" element={<UserLogin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isNewUser={isNewUser} setIsNewUser={setIsNewUser} username={username} setUsername={setUsername} />} />
          <Route path="/trips" element={<TripList trips={trips} setTrips={setTrips} username={username} />} />
          <Route path="/trips/:tripId" element={<TripDisplayPage />} />

        </Routes>

        <Footer />


      </div>
    </>

  )
}

export default App
