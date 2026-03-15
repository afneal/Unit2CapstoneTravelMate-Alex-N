import { useEffect, useState } from "react";
import Button from "../../planner-components/Button";
import Card from "../../planner-components/Card";

function ActivityCard({ activity, trip, getTrip, activities }) {//activity from tripcard map, getTrip from tripdisplaypage
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(activity.name);
    const [time, setTime] = useState(activity.time ?? "");//to prevent breaking of trip card's time sort(cant sort null)
    const [notes, setNotes] = useState(activity.notes);

    const handleSaveActivity = async () => {

        await fetch(`http://localhost:8080/api/activities/editActivity/${activity.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, time, notes })
        });
        await getTrip();
        setIsEditing(false);
    }

    const handleDelete = async () => {
        await fetch(`http://localhost:8080/api/activities/deleteActivity/${activity.id}`, {
            method: "DELETE"
        });

        await getTrip();
    }




    return (
        <Card className="saved-activity">

            {/* <div onClick={() => setIsEditing(true)}> */}
            {isEditing ? (

                <>
                    <label>Activity Name:</label>
                    <input
                        className="planner-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <label>Activity Time:</label>
                    <input
                        className="planner-input"
                        type="time"
                        value={time ?? ""} //to prevent null data error on edit of empty input
                        onChange={e => setTime(e.target.value)} />
                    <label>Notes:</label>
                    <textarea
                        className="planner-input"
                        value={notes}
                        onChange={(e => setNotes(e.target.value))} />

                    <div className="button-row">
                        <Button className="save-button"
                            onClick={handleSaveActivity}
                            label="Save Activity"
                        />

                        <Button className="delete-button"
                            onClick={handleDelete}
                            label="Delete Activity" />
                    </div>
                </>

            ) : (

                <div className="editable-card" onClick={() => setIsEditing(true)}>
                    <p><strong>Activity:</strong> {name}</p>
                    <p><strong>Time:</strong> {time}</p>
                    <p><strong>Notes:</strong> {notes}</p>
                    <span className="edit-icon">✎</span>
                </div>
            )}

        </Card>
    )

}


export default ActivityCard; 