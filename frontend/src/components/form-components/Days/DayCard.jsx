import { useState } from "react";
import Button from "../../planner-components/Button";
import Card from "../../planner-components/Card";

function DayCard({ day, trip, getTrip }) {
    const [city, setCity] = useState(day.city);
    const [date, setDate] = useState(day.date ?? "");

    //inline editing
    const [isEditingInput, setIsEditingInput] = useState(null);

    

    const handleSave = async () => {
        let body = {};

        if (isEditingInput === "city") { //send only the edited field to prevent sending a null or "" in the other field(400 bad req)
            body.city = city;
        } else if (isEditingInput === "date") {
            body.date = date;
        }

        await fetch(`http://localhost:8080/api/days/editDay/${day.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        await getTrip();
        setIsEditingInput(null);

    };



    function formatDate(dateString) { //backend defaults to YYYY-MM-DD, reformat to this
        if (!dateString) return "";
        const [year, month, day] = dateString.split("-");
        return `${month} - ${day} - ${year}`;
    }



    return (
        <Card className="day-card">


            {isEditingInput === "date" ? ( //use a {  because its an "embedded expression(evaluates to a value like 'yes', 'no' etc)"
                <div>

                    <input
                        className="planner-input"
                        type="date"
                        value={date}
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
                    <strong>Date:</strong> {formatDate(date)}
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