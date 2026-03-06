import { useEffect, useState } from "react";

function DayCard({ day, getTrips }) {
    const [isEditing, setIsEditing] = useState(false);
    const [city, setCity] = useState(day.city);
    const [date, setDate] = useState(day.date);

    const handleSave = async () => {
        setIsEditing(false);
        await fetch(`http://localhost:8080/api/days/editDay/${day.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city, date })
        });

        await getTrips();
        
    };

    useEffect(() => {
        if (!isEditing) {
            setCity(day.city);
            setDate(day.date);
        }

    }, [day, isEditing]);



    return (
        <div className="day-card">
            {isEditing ? ( //use a {  because its an "embedded expression(evaluates to a value like 'yes', 'no' etc)"
                <>
                    <input
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />

                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />

                    <button onClick={handleSave}>Save</button>

                </>
            ) : (
                <>
                    <p><strong>{city}</strong></p>
                    <p>{date}</p>

                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )
            }
        </div>
    )
}

export default DayCard;