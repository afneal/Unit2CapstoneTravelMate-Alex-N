import { useState } from "react";

function AddActivityCard({ dayId, getTrips, closeActivityForm }) {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [notes, setNotes] = useState("");

    const handleAddActivity = async () => {
        if (!name) return;
        await fetch(`http://localhost:8080/api/activities/addActivity/${dayId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, time, notes })
        });
        
        await getTrips();
        closeActivityForm(); //from TripCard


    };


    return (
        <div className="activity-card-add-card">
            <input
                placeholder="Activity"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
            />
            <textarea
                placeholder="Notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
            />

            <button onClick={handleAddActivity}>Save</button>

        </div>
    )

}

export default AddActivityCard;