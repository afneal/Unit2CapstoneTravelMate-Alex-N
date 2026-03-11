import { useState } from "react";
import Button from "../../planner-components/Button";

function AddTripCard({ getTrips, username }) {
    const [isAddingTrip, setIsAddingTrip] = useState(false);
    const [tripName, setTripName] = useState("");

    const handleSaveTrip = async () => {

        const trimmedTripName = tripName.trim();
        if (!trimmedTripName) return;

        await fetch("http://localhost:8080/api/trips/addTrip", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: trimmedTripName, username: username }),
        });

        setTripName("");

        setIsAddingTrip(false);
        getTrips();

    };

    return (
        <div className="add-trip-card">
            {isAddingTrip ? (

                <>
                    <input
                        type="text"
                        placeholder="Trip Name"
                        value={tripName}
                        onChange={e => setTripName(e.target.value)} />

                    <div className="button-row">
                        <Button className="save-button"
                            onClick={handleSaveTrip}
                            label="Save Trip"
                            disabled={!tripName}
                        />

                        <Button
                            className="cancel-button"
                            onClick={() => setIsAddingTrip(false)}
                            label="Cancel" />

                    </div>
                </>
            ) : (
                <Button className="add-button"
                    onClick={() => setIsAddingTrip(true)}
                    label="Add Trip"
                    
                />


            )}
        </div>
    );


}

export default AddTripCard;