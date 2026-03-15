import { useState } from "react";
import Button from "../../planner-components/Button";

function AddActivityCard({ dayId, getTrip, closeActivityForm }) { //dayId passed from TripCard as day.id
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
            <label>Activity Name:</label>
            <input
                className="planner-input"
                placeholder="Activity"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <label>Activity Time:</label>
            <input
                className="planner-input"
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
            />
            <label>Notes:</label>
            <textarea
                className="planner-input"
                placeholder="Notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
            />
            <div className="button-row">
                <Button className="save-button"
                    onClick={handleAddActivity}
                    label="Save Activity"
                    disabled={!name}
                />
                <Button
                    className="cancel-button"
                    onClick={() => closeActivityForm()}
                    label="Cancel" />

            </div>


        </div >

    )


}

export default AddActivityCard;