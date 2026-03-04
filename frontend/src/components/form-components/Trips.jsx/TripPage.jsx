//pass props from app.jsx to tripspage

import { useState, useEffect } from "react";
import TripCard from "./TripCard";
import AddTripCard from "./AddTripCard";



function TripPage({ trips, setTrips }) {
    const [selectedTripId, setSelectedTripId] = useState(null);


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


    const selectedTrip = trips.find(trip => trip.id === selectedTripId);

    return (
        <div className="trips-page">
            <div className="trip-list">
                <h1>My Trips</h1>
                <AddTripCard getTrips={getTrips} />

                    {trips.map(trip => (
                        <div
                            key={trip.id}
                            onClick={() => setSelectedTripId(trip.id)}
                        >
                            {trip.name}
                        </div>
                    ))}
            </div>


            <div className="trip-card-display">
                {selectedTrip ? (
                    <TripCard
                        trip={selectedTrip}
                        getTrips={getTrips}  />
                ) : trips.length > 0 ? (
                    <p>Select a trip to see details</p>
                    ) : (
                        <p>No trips created yet.</p>
                    )
                }
            </div>
        </div>
    );

}

export default TripPage;