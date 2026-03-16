import { useParams } from "react-router";
import Button from "../../planner-components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TripCard from "./TripCard";



function TripDisplayPage() {
    const { tripId } = useParams(); //allows to access parts of the url like tripid (from the routing in App.jsx)
    const navigate = useNavigate();
    const [trip, setTrip] = useState({ name: "", days: [] }); //initialize with empty object and empty days array to prevent fetch errors

    const getTrip = async () => {
        const response = await fetch(`http://localhost:8080/api/trips/${tripId}`, {
            method: "GET"
        });
        const tripData = await response.json();
        setTrip(tripData); //updates parent App.jsx with new trip data
        return tripData;
    };

    const handleDeleteTrip = async () => {
        const confirmDelete = window.confirm("Are you sure you want to permanently delete this trip?");

        if (!confirmDelete) {
            return;
        }

        await fetch(`http://localhost:8080/api/trips/delete/${trip.id}`, {
            method: "DELETE",
        });

        navigate("/trips");
    }

    useEffect(() => { //runs when tripId changes, makes sure trip data is fetched automatically on navigation to the page
        getTrip(); //from function above
    }, [tripId]);

    return (
        <div className="back-button-container">
            <Button className="back-button"
                onClick={() => navigate("/trips")}
                label="Back to Trips"
            />
            <Button
                className="delete-button"
                onClick={handleDeleteTrip}
                label="Delete Trip"
            />


            <TripCard trip={trip} getTrip={getTrip} />

        </div>
    )

}

export default TripDisplayPage;
