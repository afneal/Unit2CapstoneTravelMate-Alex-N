import { useState } from 'react';
import SubmitButton from '../planner-components/SubmitButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FlightInfo({ flightData, setFlightData }) {

    const [flights, setFlights] = useState([ //array of objects to map through flights
        {
            date: "",
            departureAirportCode: "",
            departureTime: "",
            arrivalAirportCode: "",
            arrivalTime: "",
            seatNumber: "",
            connections: [

            ]
        }]
    );




    const handleSubmit = (event) => {
        event.preventDefault();
        setFlightData([...flightData, ...flights]); //make copy of empty flightData array and add flights to it, updates the parent state (setFlightData)
        setFlights([{ //resets flights form
            date: "",
            departureAirportCode: "",
            departureTime: "",
            arrivalAirportCode: "",
            arrivalTime: "",
            seatNumber: "",
            connections: []
        }])

        toast.success("Flight Details Successfully Saved!");
    }



    const handleAddFlight = () => {
        setFlights([...flights, { //makes copy of flights array, add empty object 
            date: "",
            departureAirportCode: "",
            departureTime: "",
            arrivalAirportCode: "",
            arrivalTime: "",
            seatNumber: "",
            connections: []
        }])

    }



    const handleFlightDelete = (flightIndex) => { //at specific index parameter, copy array, then splice out that index value. Set state to new array
        const delFlight = [...flights];
        delFlight.splice(flightIndex, 1);
        setFlights(delFlight);
    }



    const handleAddConnection = (flightIndex) => { //adds empty connections object to connections array in flights array
        const newConn = [...flights];
        newConn[flightIndex].connections.push({
            connectingAirportCode: "",
            connectingFlightTime: ""
        })
        setFlights(newConn);
    }


    const handleConnectionDelete = (flightIndex, connectionIndex) => { //at specific index parameter, copy array, then splice out that index value. Set state to new array
        const delConnection = [...flights];
        delConnection[flightIndex].connections.splice(connectionIndex, 1);
        setFlights(delConnection);
    }



    return (
        <>
            <div className='outer-flight-wrapper'>

                <form className='flight-form' onSubmit={handleSubmit}>
                    <h1 className='flight-details'>Flight Details</h1>
                    {flights.map((flightElement, flightIndex) => (

                        <fieldset key={flightIndex}>
                            <legend>Flight Information</legend>
                            <label>Date of Flight:</label>
                            <input
                                id="date"
                                name="date"
                                placeholder="Date of Flight"
                                value={flightElement.date} //access date from flight object, value tells what user text to display in input field
                                onChange={e => {
                                    const newFlight = [...flights]; //shallow copy of whole flights array
                                    newFlight[flightIndex] = { ...newFlight[flightIndex], date: e.target.value } //shallow copy of the specific flight object in array, set date to user input
                                    setFlights(newFlight);
                                }}
                            />

                            <label>Departure Airport Code:</label>
                            <input
                                id="deptCode"
                                name="deptCode"
                                placeholder="Departure Airport Code"
                                value={flightElement.departureAirportCode}
                                onChange={e => {
                                    const newFlight = [...flights];
                                    newFlight[flightIndex] = { ...newFlight[flightIndex], departureAirportCode: e.target.value }
                                    setFlights(newFlight);
                                }}
                            />

                            <label>Departure Time:</label>
                            <input
                                id="deptTime"
                                name="deptTime"
                                placeholder='Departure Time'
                                value={flightElement.departureTime}
                                onChange={e => {
                                    const newFlight = [...flights];
                                    newFlight[flightIndex] = { ...newFlight[flightIndex], departureTime: e.target.value }
                                    setFlights(newFlight);
                                }}
                            />
                            {flightElement.connections.length > 0 ? <legend>Connecting Flights</legend> : ""}




                            {flightElement.connections.length > 0 && ( //if connecting flights button adds empty element, then run this code
                                <div className='flight-connections-box'>
                                    {flightElement.connections.map((connection, connectionIndex) => ( //maps through connecting flight inputs and updates text on change
                                        <div key={connectionIndex}>
                                            <label>Connecting Airport Code:</label>
                                            <input
                                                id="connCode"
                                                name="connCode"
                                                placeholder='Connecting Airport Code'
                                                value={connection.connectingAirportCode} //accessing airportcode element at each connection object in connection array
                                                onChange={e => {
                                                    const newConnection = [...flights]; //store copy of connection array in variable
                                                    newConnection[flightIndex].connections[connectionIndex].connectingAirportCode = e.target.value;
                                                    //...newConnection[index] to copy OBJECT in array and update airportCode to target value, then set that value in the old empty array
                                                    setFlights(newConnection);

                                                }}


                                            />

                                            <label>Connecting Flight Departure Time:</label>
                                            <input
                                                id="connTime"
                                                name='connTime'
                                                placeholder='Connecting Flight Departure Time'
                                                value={connection.connectingFlightTime}
                                                onChange={e => {
                                                    const newConnection = [...flights];
                                                    newConnection[flightIndex].connections[connectionIndex].connectingFlightTime = e.target.value
                                                    setFlights(newConnection);

                                                }}
                                            />
                                            <button
                                                className='delete-connection-button'
                                                type="button" //Arguements: Delete the specific connection at the specific index
                                                onClick={() => handleConnectionDelete(flightIndex, connectionIndex)}>Delete Connection</button>
                                        </div>

                                    ))}


                                </div>

                            )}


                            <label>Arrival Airport Code:</label>
                            <input
                                id="arrCode"
                                name="arrCode"
                                placeholder='Arrival Airport Code'
                                value={flightElement.arrivalAirportCode}
                                onChange={e => {
                                    const newFlight = [...flights];
                                    newFlight[flightIndex] = { ...newFlight[flightIndex], arrivalAirportCode: e.target.value }
                                    setFlights(newFlight);
                                }}
                            />

                            <label>Arrival Time:</label>
                            <input
                                id="arrTime"
                                name="arrTime"
                                placeholder='Arrival Time'
                                value={flightElement.arrivalTime}
                                onChange={e => {
                                    const newFlight = [...flights];
                                    newFlight[flightIndex] = { ...newFlight[flightIndex], arrivalTime: e.target.value }
                                    setFlights(newFlight);
                                }}
                            />

                            <label>Seat Number:</label>
                            <input
                                id="seatNumber"
                                name="seatNumber"
                                placeholder='Seat Number'
                                value={flightElement.seatNumber}
                                onChange={e => {
                                    const newFlight = [...flights];
                                    newFlight[flightIndex] = { ...newFlight[flightIndex], seatNumber: e.target.value }
                                    setFlights(newFlight);
                                }}
                            />


                            <button type="button" onClick={() => handleAddConnection(flightIndex)} className='add-connecting-button'>Add Connecting Flight</button>

                            <button
                                className='delete-flight-button'
                                type="button" //Arguements: Delete the specific flight at the specific index
                                onClick={() => handleFlightDelete(flightElement, flightIndex)}>Delete Flight</button>
                        </fieldset>
                    ))}
                    <button type="button" onClick={handleAddFlight} className='add-flight-button'>Add New Flight</button>

                    <SubmitButton onClick={handleSubmit} label="Save Flight Details" className='flight-submit-button' />
                </form>

            </div>

        </>
    )
}

export default FlightInfo;

