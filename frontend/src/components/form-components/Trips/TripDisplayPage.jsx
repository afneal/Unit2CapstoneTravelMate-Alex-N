import { useParams } from "react-router";
import Button from "../../planner-components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TripCard from "./TripCard";



function TripDisplayPage() {
    const { tripId } = useParams();
    // const [selectedTrip, setSelectedTrip] = useState({days: []});
    const navigate = useNavigate();
    const [trip, setTrip] = useState({ name: "", days: []});

    const getTrip = async () => {
        const response = await fetch(`http://localhost:8080/api/trips/${tripId}`, {
            method: "GET"
        });
        const tripData = await response.json();
        setTrip(tripData);
        return tripData;
    };

    useEffect(() => {
        getTrip(); //from function above
    }, [tripId]);

    return (
        <div className="back-button-container">
            <Button className="back-button" 
                    onClick={() => navigate("/trips")}
                    label="Back to Trips"
                    />


            <TripCard trip={trip} getTrip={getTrip} />

        </div>
    )

    }

    export default TripDisplayPage;
