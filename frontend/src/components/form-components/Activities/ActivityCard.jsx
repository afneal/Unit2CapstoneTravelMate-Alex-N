import { useEffect, useState } from "react";
import Button from "../../planner-components/Button";
import Card from "../../planner-components/Card";

function ActivityCard({ activity, trip, getTrip, activities }) {
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

    // useEffect(() => {
    //     if (!isEditing) {
    //         setName(activity.name);
    //         setTime(activity.time ?? "");//to prevent null time
    //         setNotes(activity.notes);
    //     }
    // }, [activity, isEditing]);


    return (
        <Card className="saved-activity">

            <div onClick={() => setIsEditing(true)}>
                {isEditing ? (
                    <>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <input
                            id="time"
                            type="time"
                            value={time ?? ""} //to prevent null data error on edit of empty input
                            onChange={e => setTime(e.target.value)} />
                        <textarea
                            value={notes}
                            onChange={(e => setNotes(e.target.value))} />

                        <div className="button-row">
                            <Button className="save-button"
                                onClick={handleSaveActivity}
                                label="Save Activity"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <p><strong>Activity: </strong>{name}</p>
                        <p><strong>Time: </strong>{time}</p>
                        <p><strong>Notes: </strong>{notes}</p>

                        {/* <Button className="edit-button"
                            onClick={() => setIsEditing(true)}
                            label="Edit Activity"
                        /> */}

                    </>




                )

                }
            </div>





        </Card>

    )



}

export default ActivityCard; 