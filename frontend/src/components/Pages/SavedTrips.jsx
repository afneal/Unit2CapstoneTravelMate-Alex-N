



function SavedTrips({ trips, flightData, packingList, reminderList }) { //pass props from parent app to this child

    return (
        <>
            <div className="outer-wrapper-trips">
                <div className="main-trip-container">


                    <div className="trip-box">


                        <div id="saved-trip-data">
                            <h1 className="destination-text">Destination</h1>

                            {trips && trips.length > 0 ? (
                                trips.map((trip, tripIndex) => ( //trips is an array of objects so must use map to display
                                    //map must have unique key
                                    <div key={tripIndex} className="saved-trip">

                                        {trip.map((day, dayIndex) => ( //nested day map inside trip 
                                            <div key={dayIndex} className="saved-day">
                                                <div className="trip-date-box">
                                                    <strong> Date:</strong> {day.date}
                                                </div>

                                                <p> <strong> City:</strong> {day.city}</p>




                                                <div id="saved-activity-data">
                                                    {day.activities.map((activity, activityIndex) => ( //nested activity map inside day inside trip
                                                        <div key={activityIndex} className="saved-activity">
                                                            <p> <strong>Activity:</strong> {activity.activity}</p>

                                                            <p>  <strong>Time: </strong>{activity.time}</p>

                                                            <p>   <strong> Notes:</strong> {activity.notes}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {trip.length > 1 && ( //add divider between multiple trips
                                                    <hr style={{ margin: "20px 0" }} />)}
                                            </div>
                                        ))}

                                    </div>
                                ))
                            ) : (
                                <div className="saved-day">
                                    <p>No trips saved yet.</p>
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="packing-box">



                        <div className="packing-list-container">
                            <h1 className="packing-list-text">Packing List</h1>
                            {packingList && packingList.length > 0 ? ( //run code if item is added to packingList
                                packingList.map((list, listIndex) => (
                                    <div key={listIndex} className="saved-packing-list" >

                                        <ul className="saved-packing-list-bullet">
                                            {list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <p>No items added yet.</p>
                            )}
                        </div>
                    </div>
                </div>




                <div className="flights-reminders-container">

                    <div className="flights-box">

                        <div className="flights-container">
                            <h1 className="flights-text">Flights</h1>

                            {flightData && flightData.length > 0 ? (
                                <div id="saved-flights-data">

                                    {flightData.map((flight, flightIndex) => (
                                        <div key={flightIndex} className="saved-flight" >
                                            <div className="flight-date-box">
                                                <strong> Date:</strong> {flight.date}
                                            </div>
                                            <p>  <strong> Departure Airport Code:</strong> {flight.departureAirportCode}</p>
                                            <p>  <strong>Departure Time:</strong>  {flight.departureTime}</p>

                                            {flight.connections && flight.connections.length > 0 && ( //run code and display only if there are connections added
                                                <div className="saved-connections-data">

                                                    {flight.connections.map((connection, connectionIndex) => (
                                                        <div key={connectionIndex} className="saved-connection">
                                                            <p>   <strong> Connecting Airport Code:</strong> {connection.connectingAirportCode}</p>

                                                            <p>   <strong>Connecting Flight Time:</strong>  {connection.connectingFlightTime}</p>
                                                        </div>
                                                    ))}

                                                </div>
                                            )}
                                            <p> <strong> Arrival Airport Code:</strong>  {flight.arrivalAirportCode}</p>
                                            <p><strong> Arrival Time: </strong> {flight.arrivalTime}</p>
                                            <p> <strong> Seat Number: </strong> {flight.seatNumber}</p>
                                            {flightData.length > 1 && ( //add divider between flights
                                                <hr style={{ margin: "20px 0" }} />)}
                                        </div>


                                    ))}


                                </div>
                            ) : (
                                <p>No flights saved yet.</p>
                            )}
                        </div>
                    </div>
                    <div className="reminder-box">

                        <div className="reminder-list-container">
                            <h1 className="reminder-list-text">Reminder List</h1>
                            {reminderList && reminderList.length > 0 ? (


                                reminderList.map((reminderElement, elementIndex) => (
                                    <div key={elementIndex} className="reminder-list">
                                        <ul className="saved-reminder-list-bullet">
                                            {reminderElement.map((element, reminderIndex) => (
                                                <li key={reminderIndex}>{element}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))

                            ) : (
                                <p>No reminders added yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default SavedTrips;
