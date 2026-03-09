import { useEffect, useState } from "react";
import Button from "../../planner-components/Button";
import Card from "../../planner-components/Card";

function ActivityCard({ activity, getTrips }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(activity.name);
    const [time, setTime] = useState(activity.time ?? "");//to prevent breaking of trip card's time sort(cant sort null)
    const [notes, setNotes] = useState(activity.notes);

    const handleSaveActivity = async () => {
        setIsEditing(false);
        await fetch(`http://localhost:8080/api/activities/editActivity/${activity.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, time, notes })
        });
        await getTrips();
        

    }

    useEffect(() => {
        if (!isEditing) {
            setName(activity.name);
            setTime(activity.time ?? "");//to prevent null time
            setNotes(activity.notes);
        }
        }, [activity, isEditing]);


    return (
        <Card className="activity-card">
            {isEditing ? (
                <>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <input
                        type="time"
                        value={time ?? ""} //to prevent null data error on edit of empty input
                        onChange={e => setTime(e.target.value)} />
                    <input
                        value={notes}
                        onChange={(e => setNotes(e.target.value))} />
                        <Button className="save-activity-button"
                                onClick={handleSaveActivity}
                                label="Save Activity"
                                />
                </>
            ) : (
                <>
                    <p><strong>{name}</strong></p>
                    <p>{time}</p>
                    <p>{notes}</p>

                    <Button className="edit-activity-button"
                    onClick={() => setIsEditing(true)}
                    label="Edit Activity"
                    />

                </>
            )

            }
        </Card>
    )


}

export default ActivityCard; 