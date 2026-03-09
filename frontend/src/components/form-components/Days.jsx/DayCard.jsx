import { useEffect, useState } from "react";
import Button from "../../planner-components/Button";
import Card from "../../planner-components/Card";

function DayCard({ day, trip, getTrips }) {
    const [isEditingInput, setIsEditingInput] = useState(null);
    const [city, setCity] = useState(day.city);
    const [date, setDate] = useState(day.date ?? "");

    const handleSave = async () => {
        await fetch(`http://localhost:8080/api/days/editDay/${day.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                city: city || null, //to prevent 400 bad req for submitting "" default
                date: date || null
            })
        });

        await getTrips();
        setIsEditingInput(null);

    };



    // useEffect(() => {
    //     if (!isEditingInput) {
    //         setCity(day.city);
    //         setDate(day.date ?? "");
    //     }

    // }, [day, isEditingInput]);



    return (
        <Card className="day-card">


            {isEditingInput === "date" ? ( //use a {  because its an "embedded expression(evaluates to a value like 'yes', 'no' etc)"
                <div>

                    <input
                        className="planner-input"
                        type="date"
                        value={date ?? ""}
                        onChange={e => setDate(e.target.value)}
                    />

                    <div className="button-row">
                        <Button className="save-button"
                            onClick={handleSave}
                            label="Save Date"
                        />
                    </div>
                </div>
            ) : (
                <div className="trip-date-box" onClick={() => setIsEditingInput("date")}>
                    <strong>Date:</strong> {date}
                    </div>
                    )}

                    {isEditingInput === "city" ? (
                        <div>
                            < input
                                className="planner-input"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />

                            <div className="button-row">
                                <Button className="save-button"
                                    onClick={handleSave}
                                    label="Save Day"
                                />
                            </div>
                        </div>

                    ) : (

                        <p onClick={() => setIsEditingInput("city")}><strong>City: </strong>{city}</p>


                    )}

                </Card >
        
                )
                }



export default DayCard;