
import Button from "../../planner-components/Button";
import { useState } from "react";

function AddFlightCard({ tripId, getTrip, closeFlightForm }) {
    const [departureDate, setDepartureDate] = useState("");
    const [departureCode, setDepartureCode] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalCode, setArrivalCode] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");


    const handleAddFlight = async () => {
        await fetch(`http://localhost:8080/api/flights/addFlight/${tripId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ departureDate, departureCode, departureTime, arrivalCode, arrivalTime })
        });

        getTrip();

        setDepartureDate("");
        setDepartureCode("");
        setDepartureTime("");
        setArrivalCode("");
        setArrivalTime("");
        closeFlightForm(); //from TripCard
    };

    return (
        <div className="flight-card-add-card">
            <label>Departure Date:</label>
            <input
                className="planner-input"
                type="date"
                value={departureDate}
                onChange={e => setDepartureDate(e.target.value)}
            />
        <label>Departure Airport Code:</label>
            <input
                className="planner-input"
                placeholder="Departure Airport Code"
                value={departureCode}
                onChange={e => setDepartureCode(e.target.value)}
            />
            <label>Departure Time:</label>
            <input
                className="planner-input"
                type="time"
                value={departureTime}
                onChange={e => setDepartureTime(e.target.value)}
            />
            <label>Arrival Airport Code:</label>
            <input
                className="planner-input"
                placeholder="Arrival Airport Code"
                value={arrivalCode}
                onChange={e => setArrivalCode(e.target.value)}
            />
            <label>Arrival Time:</label>
            <input
                className="planner-input"
                type="time"
                value={arrivalTime}
                onChange={e => setArrivalTime(e.target.value)}
            />

            <div className="button-row">
                <Button className="save-button"
                    onClick={handleAddFlight}
                    label="Save Flight"
                    disabled={!departureDate}
                />

                <Button
                    className="cancel-button"
                    onClick={() => closeFlightForm()}
                    label="Cancel" />

            </div>
        </div>
    )


}

export default AddFlightCard;