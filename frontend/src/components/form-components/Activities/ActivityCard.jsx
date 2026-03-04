import { useEffect, useState } from "react";

function ActivityCard({ activity, dayId, getTrips }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(activity.name);
    const [time, setTime] = useState(activity.time);
    const [notes, setNotes] = useState(activity.notes);

    const handleSaveActivity = async () => {
        setIsEditing(false);
        await fetch(`http://localhost:8080/api/activities/editActivity/${activity.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, time, notes })
        });
        await getTrips();
        

    };

    useEffect(() => {
        if (!isEditing) {
            setName(activity.name);
            setTime(activity.time);
            setNotes(activity.notes);
        }
        }, [activity, isEditing]);


    return (
        <div className="activity-card">
            {isEditing ? (
                <>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <input
                        value={time}
                        onChange={e => setTime(e.target.value)} />
                    <input
                        value={notes}
                        onChange={(e => setNotes(e.target.value))} />
                        <button onClick={handleSaveActivity}>Save Activity</button>
                </>
            ) : (
                <>
                    <p><strong>{name}</strong></p>
                    <p>{time}</p>
                    <p>{notes}</p>

                    <button onClick={() => setIsEditing(true)}>Edit</button>

                </>
            )

            }
        </div>
    )


}

export default ActivityCard;