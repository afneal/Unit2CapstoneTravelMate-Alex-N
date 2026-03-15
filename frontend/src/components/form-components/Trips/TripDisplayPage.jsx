import { useParams } from "react-router";
import Button from "../../planner-components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TripCard from "./TripCard";



function TripDisplayPage() {
    const { tripId } = useParams();
    // const [selectedTrip, setSelectedTrip] = useState({days: []});
    const navigate = useNavigate();
    const [trip, setTrip] = useState({ name: "", days: [] });

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

    useEffect(() => {
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
