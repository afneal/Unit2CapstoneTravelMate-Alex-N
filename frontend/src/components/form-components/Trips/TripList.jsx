import AddTripCard from "./AddTripCard";
import { Link } from "react-router";
import { useEffect } from "react";


function TripList({ trips, setTrips }) {


    const getTrips = async () => {
        const response = await fetch("http://localhost:8080/api/trips", {
            method: "GET"
        });
        const tripData = await response.json();
        setTrips(tripData);
        return tripData;
    };


    useEffect(() => {
        getTrips();
    }, []);


    return (
        <div className="trip-list">
            <h1>My Trips</h1>
            <AddTripCard getTrips={getTrips} />
            {trips.length > 0 ? (
                <p>Select a trip to see details</p>
            ) : (
                <p>No trips created yet.</p>
            )}

            {trips.map((trip) => (
                <div key={trip.id}
                    className="trip-list-item">
                    <Link to={`/trips/${trip.id}`}>{trip.name}</Link>
                </div>
            ))}

        </div>
    )
}

export default TripList;