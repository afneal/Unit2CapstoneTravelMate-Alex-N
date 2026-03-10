import { useState } from "react";
import Button from "../../planner-components/Button";

function AddActivityCard({ dayId, getTrip, closeActivityForm }) {
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

        await getTrip();
        closeActivityForm(); //from TripCard


    };


    return (
        <div className="activity-card-add-card">
            <input
                className="planner-input"
                placeholder="Activity"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                className="planner-input"
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
            />
            <textarea
                className="planner-input"
                placeholder="Notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
            />
            
                <Button className="save-button"
                    onClick={handleAddActivity}
                    label="Save Activity"
                    disabled={!name}
                />
           

        </div >

    )


}

export default AddActivityCard;