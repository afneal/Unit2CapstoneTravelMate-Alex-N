import { useEffect, useState } from "react";
import Button from "../../planner-components/Button";
import Card from "../../planner-components/Card";

function DayCard({ day, getTrips }) {
    const [isEditing, setIsEditing] = useState(false);
    const [city, setCity] = useState(day.city);
    const [date, setDate] = useState(day.date ?? "");

    const handleSave = async () => {
        setIsEditing(false);
        await fetch(`http://localhost:8080/api/days/editDay/${day.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                city: city || null, //to prevent 400 bad req for submitting "" default
                date: date || null
            })
        });

        await getTrips();

    };

    useEffect(() => {
        if (!isEditing) {
            setCity(day.city);
            setDate(day.date ?? "");
        }

    }, [day, isEditing]);



    return (
        <Card className="day-card">
            {isEditing ? ( //use a {  because its an "embedded expression(evaluates to a value like 'yes', 'no' etc)"
                <>
                    <input
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />

                    <input
                        type="date"
                        value={date ?? ""} 
                        onChange={e => setDate(e.target.value)}
                    />

                    <Button className="save-day-button"
                        onClick={handleSave}
                        label="Save Day"
                    />

                </>
            ) : (
                <>
                    <p><strong>{city}</strong></p>
                    <p>{date}</p>

                    <Button className="edit-day-button"
                        onClick={() => setIsEditing(true)}
                        label="Edit Day"
                    />
                </>
            )
            }
        </Card>
    )
}

export default DayCard;