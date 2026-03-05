import { useState } from "react"


function TripForm({ trips, setTrips }) {
    const [newTripName, setNewTripName] = useState("");

    const onTripChange = (tripId, fieldName, newValue) => {
        setTrips(
            trips.map(existingTrip => existingTrip.id === tripId ?
                { ...existingTrip, [fieldName]: newValue } : existingTrip))
    }

    const handleAddNewTrip = async () => {
        try {
            const response = await fetch(
                'http://localhost:8080/api/trips/addTrip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newTripName,
                    userEmail: "test@example.com"
                })
            });
            const savedTripName = await response.json();
            setTrips([...trips, savedTripName]);
            setNewTripName("");
        } catch (error) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || `ERROR - Status ${response.status}`,
            );
        }
    }


    return (
        <div className="trip-form">
            <h2>Trips</h2>

            {trips.map(trip => (
                <div key={trip.id} className="trip-item">

                    <input
                        value={trip.name || ""} //to prevent react from switching from uncontrolled to controlled
                        placeholder="Trip Name"
                        onChange={e => onTripChange(trip.id, "name", e.target.value)}
                    />
                </div>
            ))}

            <div className="new-trip">
                <input
                    value={newTripName || ""}
                    placeholder="New Trip Name"
                    onChange={e => setNewTripName(e.target.value)}
                />
                <button onClick={handleAddNewTrip}>Add Trip</button>
            </div>
        </div>
    )
};


export default TripForm;
