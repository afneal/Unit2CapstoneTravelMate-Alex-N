import { useState } from "react";
import Button from "../../planner-components/Button";

function AddTripCard({ getTrips }) {
    const [isAddingTrip, setIsAddingTrip] = useState(false);
    const [tripName, setTripName] = useState("");

    const handleSaveTrip = async () => {

        await fetch("http://localhost:8080/api/trips/addTrip", {
            method: "POST",
            headers: { "Content-Type" : "application/json" }, 
            body: JSON.stringify({ name: tripName }),
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

            <Button className="save-trip-button"
                    onClick={handleSaveTrip}
                    label="Save Trip"
                    />
            </>
        ) : (
            <Button className="add-trip-button"
                    onClick={() => setIsAddingTrip(true)}
                    label="Add Trip"
                    />
        )}
    </div>
);


}

export default AddTripCard;