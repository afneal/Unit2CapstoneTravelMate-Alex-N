import { useState } from "react";

function AddDayCard({ tripId, getTrips, closeDayForm }) {
    const [city, setCity] = useState("");
    const [date, setDate] = useState("");


    const handleAddDay = async () => {
        await fetch(`http://localhost:8080/api/days/addDay/${tripId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city, date })
        });

        getTrips();

        setCity("");
        setDate("");
        closeDayForm();//From TripCard
    };

    return (
        <div className="day-card-add-card">
            <input
                placeholder="City"
                value={city}
                onChange={e => setCity(e.target.value)}
            />

            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
            />

            <button onClick={handleAddDay}>Save</button>

        </div>
    )

}

export default AddDayCard;