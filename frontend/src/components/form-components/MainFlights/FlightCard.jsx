import { useEffect, useState } from "react";
import Card from "../../planner-components/Card";
import Button from "../../planner-components/Button";

//need to getTrip props in other files
function FlightCard({ flight, getTrip, formatDate, connectingFlights = [], isEditingFlightId, setIsEditingFlightId }) {
    const isEditing = isEditingFlightId === flight.id; //isEditing is true only when editing id matches flight.id

    const [departureDate, setDepartureDate] = useState(flight.departureDate ?? "");
    const [departureCode, setDepartureCode] = useState(flight.departureCode);
    const [departureTime, setDepartureTime] = useState(flight.departureTime ?? "");
    const [arrivalCode, setArrivalCode] = useState(flight.arrivalCode);
    const [arrivalTime, setArrivalTime] = useState(flight.arrivalTime ?? "");
    const [connections, setConnections] = useState(flight.connectingFlights || []);

    //update flightcard after tripcard updates with a connecting flight (fixed bug where edit form did not show new connecitons)
    useEffect(() => {
        setConnections(connectingFlights);
    }, [connectingFlights]);


    const handleSave = async () => {
        await fetch(`http://localhost:8080/api/flights/editFlight/${flight.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                departureDate: departureDate,
                departureCode: departureCode,
                departureTime: departureTime,
                arrivalCode: arrivalCode,
                arrivalTime: arrivalTime
            }),
        });

        await getTrip();

        setIsEditingFlightId(null);
    };


    const handleDelete = async () => {
        await fetch(`http://localhost:8080/api/flights/deleteFlight/${flight.id}`, {
            method: "DELETE",
        });
        await getTrip();
    }

    const sortedConnections = [...(connectingFlights || [])].sort((a, b) => (a.connectingTime ?? "").localeCompare(b.connectingTime ?? ""));



    return (
        <Card className="editable-day-card">
            {isEditing ? (
                //edit form
                <>
                    <h3>Flight Departure</h3>
                    <label>Departure Airport Code:</label>
                    <input
                        className="planner-input"
                        value={departureCode}
                        onChange={(e) => setDepartureCode(e.target.value)}
                        placeholder="Departure Airport Code"
                    />
                    <label>Departure Date:</label>
                    <input
                        className="planner-input"
                        type="date"
                        value={departureDate ?? ""}
                        onChange={(e) => setDepartureDate(e.target.value)}
                    />
                    <label>Departure Time:</label>
                    <input
                        className="planner-input"
                        type="time"
                        value={departureTime ?? ""} //to prevent null data error on edit of empty input
                        onChange={(e) => setDepartureTime(e.target.value)}
                    />

                    <div className="connections-container">
                        {connections.map((conn, index) => (

                            <div key={conn.id} className="planner-connection">
                                <h3>Connection {index + 1}</h3>
                                <label>Connecting Airport Code:</label>
                                <input
                                    className="planner-input"
                                    value={conn.connectingCode}
                                    onChange={(e) => {
                                        const newConnections = [...connections];
                                        newConnections[index].connectingCode = e.target.value;
                                        setConnections(newConnections);
                                    }}
                                    placeholder="Connecting Airport Code"
                                />
                                <label>Connecting Time:</label>
                                <input
                                    className="planner-input"
                                    type="time"
                                    value={conn.connectingTime ?? ""}
                                    onChange={(e) => {
                                        const newConnections = [...connections];
                                        newConnections[index].connectingTime = e.target.value;
                                        setConnections(newConnections);
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <h3>Flight Arrival</h3>
                    <label>Arrival Airport Code:</label>
                    <input
                        className="planner-input"
                        value={arrivalCode}
                        onChange={(e) => setArrivalCode(e.target.value)}
                    />
                    <label>Arrival Time:</label>
                    <input
                        className="planner-input"
                        type="time"
                        value={arrivalTime ?? ""}
                        onChange={(e) => setArrivalTime(e.target.value)}
                    />



                    <div className="button-row">
                        <Button
                            className="save-button"
                            onClick={handleSave}
                            label="Save Flight" />

                        <Button
                            className="cancel-button"
                            onClick={() => setIsEditingFlightId(null)}
                            label="Cancel" />

                        <Button
                            className="delete-button"
                            onClick={handleDelete}
                            label="Delete Flight" />
                    </div>
                </>
            ) : (
                // display form
                <div className="editable-day-card" onClick={() => setIsEditingFlightId(flight.id)}>
                    <p><strong>Departure Date:</strong> {formatDate(departureDate)}</p>
                    <p><strong>Departure Airport Code:</strong> {departureCode}</p>
                    <p><strong>Departure Time:</strong> {departureTime}</p>

                    {flight.connectingFlights?.length > 0 && ( //only show this container if there are conn flights

                        <div className="connections-display">

                            {sortedConnections.map((connection) => (
                                <div key={connection.id} className="saved-connection">
                                    <p><strong>Connecting Airport Code: </strong>{connection.connectingCode}</p>
                                    <p><strong>Connecting Flight Time: </strong>{connection.connectingTime}</p>

                                </div>
                            ))}
                        </div>
                    )}



                    <p><strong>Arrival Airport Code:</strong> {arrivalCode}</p>
                    <p><strong>Arrival Time:</strong> {arrivalTime}</p>
                    <span className="edit-icon">✎</span>

                </div>
            )}
        </Card>
    );

}

export default FlightCard;









