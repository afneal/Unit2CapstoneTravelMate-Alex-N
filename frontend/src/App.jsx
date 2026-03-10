
import { Routes, Route } from 'react-router'
import Homepage from './components/Pages/Homepage'
import Header from './components/layout/Header'
import worldMapImage5 from './assets/worldMapImage5.jpg';
import Footer from './components/layout/Footer'
import SavedTrips from './components/Pages/SavedTrips'
import { useState, useEffect } from 'react'
import './App.css'
import TravelTips from './components/Pages/TravelTips'
import BuildTrips from './components/Pages/BuildTrip';
import ExchangeRates from './components/Pages/Resources';
import { ToastContainer } from 'react-toastify';
import UserLogin from './components/Pages/UserLogin';
// import TripPage from './components/form-components/Trips.jsx/TripPage';
import NavMenu from './components/layout/NavMenu';
import TripList from './components/form-components/Trips/TripList';
import TripDisplayPage from './components/form-components/Trips/TripDisplayPage';
import DayCard from './components/form-components/Days/DayCard';

function App() { //App owns the states so is the parent

  const [days, setDays] = useState([]);
  const [activities, setActivities] = useState([]);

  const [trips, setTrips] = useState([]);
  const [packingList, setPackingList] = useState([])
  const [list, setList] = useState([])
  const [flightData, setFlightData] = useState([]);
  const [reminderList, setReminderList] = useState([])
  const [isNewUser, setIsNewUser] = useState(false);
  


  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);





  return (
    <>
      <div className='App' style={{
        backgroundImage: `url(${worldMapImage5})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: "100vh",
        margin: '0', opacity: 0.9, backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", padding: "0 0 20px 0"
      }}>

        < Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        < ToastContainer position="top-right" autoClose={1000} />

        <Routes>
          <Route path="/" element={<Homepage isLoggedIn={isLoggedIn} />} />
          <Route path="/traveltips" element={<TravelTips />} />
          <Route path="/buildtrips" element={<BuildTrips trips={trips} setTrips={setTrips} flightData={flightData} setFlightData={setFlightData}
            packingList={packingList} setPackingList={setPackingList} list={list} setList={setList} reminderList={reminderList} setReminderList={setReminderList}
          />} />

          <Route path="/savedtrips" element={<SavedTrips trips={trips} setTrips={setTrips} packingList={packingList} setPackingList={setPackingList}
            list={list} setList={setList} flightData={flightData} setFlightData={setFlightData} reminderList={reminderList} setReminderList={setReminderList}
          />} />


          <Route path="/resources" element={<ExchangeRates />} />
          {/* <Route path="/trippage" element={<TripPage trips={trips} setTrips={setTrips} />} /> */}
          <Route path="/login" element={<UserLogin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isNewUser={isNewUser} setIsNewUser={setIsNewUser} />} />
          <Route path="/trips" element={<TripList trips={trips} setTrips={setTrips} />} />
          <Route path="/trips/:tripId" element={<TripDisplayPage />} />
        </Routes>

        <Footer />


      </div>
    </>

  )
}

export default App
