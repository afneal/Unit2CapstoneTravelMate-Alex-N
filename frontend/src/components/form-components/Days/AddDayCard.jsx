import { useState } from "react";
import Button from "../../planner-components/Button";

function AddDayCard({ tripId, getTrip, closeDayForm }) {
    const [city, setCity] = useState("");
    const [date, setDate] = useState("");


    const handleAddDay = async () => {
        await fetch(`http://localhost:8080/api/days/addDay/${tripId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city, date })
        });

        getTrip();

        setCity("");
        setDate("");
        closeDayForm();//From TripCard
    };

    return (
        <div className="day-card-add-card">
            <input
                className="planner-input"
                placeholder="City"
                value={city}
                onChange={e => setCity(e.target.value)}
            />

            <input
                className="planner-input"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <div className="button-row">
                <Button className="save-button"
                    onClick={handleAddDay}
                    label="Save Day"
                    disabled={!city && !date}
                />
                <Button
                    className="cancel-button"
                    onClick={() => closeDayForm()}
                    label="Cancel" />
            </div>
        </div>
    )

}

export default AddDayCard;