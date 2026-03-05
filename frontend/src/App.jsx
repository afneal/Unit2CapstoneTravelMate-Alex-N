
import { Routes, Route } from 'react-router'
import Homepage from './components/Pages/Homepage'
import Header from './components/layout/Header'
import worldMapImage5 from './assets/worldMapImage5.jpg';
import Footer from './components/layout/Footer'
import SavedTrips from './components/Pages/SavedTrips'
import { useState } from 'react'
import './App.css'
import TravelTips from './components/Pages/TravelTips'
import BuildTrips from './components/Pages/BuildTrip';
import ExchangeRates from './components/Pages/Resources';
import { ToastContainer } from 'react-toastify';
import ItineraryForm from './components/form-components/ItineraryForm';
import AllTrips from './components/Pages/AllTrips';
import TripPage from './components/form-components/Trips.jsx/TripPage';


function App() { //App owns the states so is the parent
  const [days, setDays] = useState([]);
  // const [days, setDays] = useState([{city: "", date: "", activities: []}]);
  const [activities, setActivities] = useState([]);

  const [trips, setTrips] = useState([]);
  const [packingList, setPackingList] = useState([])
  const [list, setList] = useState([])
  const [flightData, setFlightData] = useState([]);
  const [reminderList, setReminderList] = useState([])


       //test


  return (
    <>
        <div className='App'style={{
          backgroundImage: `url(${worldMapImage5})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: "100vh", 
          margin: '0',  opacity: 0.9, backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", padding: "0 0 20px 0" }}>

          < Header />

          < ToastContainer position="top-right" autoClose={1000} />

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/traveltips" element={<TravelTips />} />
            <Route path="/buildtrips" element={<BuildTrips trips={trips} setTrips={setTrips} flightData={flightData} setFlightData={setFlightData}
              packingList={packingList} setPackingList={setPackingList} list={list} setList={setList} reminderList={reminderList} setReminderList={setReminderList}
            />} />

            <Route path="/savedtrips" element={<SavedTrips trips={trips} setTrips={setTrips} packingList={packingList} setPackingList={setPackingList}
              list={list} setList={setList} flightData={flightData} setFlightData={setFlightData} reminderList={reminderList} setReminderList={setReminderList}
            />} />

            <Route path="/resources" element={<ExchangeRates />} />

            {/* <Route path="/trips/:tripId" element={<ItineraryForm />} /> */}

            <Route path="/trippage" element={<TripPage trips={trips} setTrips={setTrips} />} />
          </Routes>

          <Footer />

        
      </div>
    </>

  )
}

export default App
