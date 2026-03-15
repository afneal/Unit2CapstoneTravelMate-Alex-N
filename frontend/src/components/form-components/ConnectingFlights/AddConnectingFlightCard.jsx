import { useState } from "react";
import Button from "../../planner-components/Button";

function AddConnectingFlightCard({ flightId, getTrip, closeConnectingFlightForm }) {
    const [connectingCode, setConnectingCode] = useState("");
    const [connectingTime, setConnectingTime] = useState("");
    

    const handleAddConnectingFlight = async () => {
        if (!connectingCode) return;
        await fetch(`http://localhost:8080/api/connectingFlights/addConnectingFlight/${flightId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ connectingCode, connectingTime })
        });

        await getTrip();
        closeConnectingFlightForm(); //from TripCard


    };


    return (
        <div className="activity-card-add-card">
            <label>Connecting Airport Code:</label>
            <input
                className="planner-input"
                placeholder="Connecting Airport Code"
                value={connectingCode}
                onChange={e => setConnectingCode(e.target.value)}
            />
            <label>Connecting Time:</label>
            <input
                className="planner-input"
                type="time"
                value={connectingTime}
                onChange={e => setConnectingTime(e.target.value)}
            />
            
            <div className="button-row">
                <Button className="save-button"
                    onClick={handleAddConnectingFlight}
                    label="Save Connecting Flight"
                    disabled={!connectingCode}
                />
                <Button
                    className="cancel-button"
                    onClick={() => closeConnectingFlightForm()}
                    label="Cancel" />

            </div>


        </div >

    )


}

export default AddConnectingFlightCard;