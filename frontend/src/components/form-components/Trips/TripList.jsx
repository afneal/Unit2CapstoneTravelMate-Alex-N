import AddTripCard from "./AddTripCard";
import { Link } from "react-router";
import { useEffect } from "react";


function TripList({ trips, setTrips, username }) { //trips, setTrips, username from parent App.jsx


    const getTrips = async () => {
        const response = await fetch(`http://localhost:8080/api/trips?username=${username}`, {
            method: "GET"
        });
        const tripData = await response.json();
        setTrips(tripData); //updates parent App.jsx with trips from backend, triggers rerender of trips
        return tripData;
    };


    useEffect(() => { //make sure trips are loaded when the page loads without other input from user
        if (username) { //if username exists, call getTrips from parent to fetch trips from backend
        getTrips();
        }
    }, [username]); //only runs when username changes


    return (
        <div className="my-trips-list">
            <div className="my-trips-container">
                <h1 className="my-trips-title">My Trips</h1>
                <AddTripCard getTrips={getTrips} username={username} />

                {trips.length > 0 ? (
                    <p>Select a trip to see details</p>
                ) : (
                    <p>No trips created yet.</p>
                )}

                <div className="trip-list-buttons">
                    {trips.map((trip) => (

                        <Link
                            key={trip.id}
                            className="trip-button"
                            to={`/trips/${trip.id}`} //link to trip by id
                        >{trip.name}</Link>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default TripList;