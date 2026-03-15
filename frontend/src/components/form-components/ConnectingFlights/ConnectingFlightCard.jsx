


// import { useEffect, useState } from "react";
// import Button from "../../planner-components/Button";
// import Card from "../../planner-components/Card";

// function ConnectingFlightCard({ connectingFlight, getTrip}) {
//     const [isEditing, setIsEditing] = useState(false);
//     const [connectingCode, setConnectingCode] = useState(connectingFlight.connectingCode);
//     const [connectingTime, setConnectingTime] = useState(connectingFlight.connectingTime ?? "");//to prevent breaking of trip card's time sort(cant sort null)
    

//     const handleSaveConnectingFlight = async () => {

//         await fetch(`http://localhost:8080/api/connectingFlights/editConnectingFlights/${connectingFlight.id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ connectingCode, connectingTime })
//         });
//         await getTrip();
//         setIsEditing(false);
//     }

//     const handleDelete = async () => {
//         await fetch(`http://localhost:8080/api/connectingFlights/deleteConnectingFlight/${connectingFlight.id}`, {
//             method: "DELETE"
//         });

//         await getTrip();
//     }

 


//     return (
//         <Card className="saved-activity">

//             {/* <div onClick={() => setIsEditing(true)}> */}
//             {isEditing ? (

//                 <>
//                     <input
//                         className="planner-input"
//                         value={connectingCode}
//                         onChange={(e) => setName(e.target.value)} />
//                     <input
//                         className="planner-input"
//                         type="time"
//                         value={connectingTime ?? ""} //to prevent null data error on edit of empty input
//                         onChange={e => setTime(e.target.value)} />
                    

//                     <div className="button-row">
//                         <Button className="save-button"
//                             onClick={handleSaveConnectingFlight}
//                             label="Save Connecting Flight"
//                         />

//                         <Button className="delete-button"
//                             onClick={handleDelete}
//                             label="Delete Connecting Flight" />
//                     </div>
//                 </>

//             ) : (

//                 <div className="editable-card" onClick={() => setIsEditing(true)}>
//                     <p><strong>Connecting Airport Code:</strong> {connectingCode}</p>
//                     <p><strong>Connecting Flight Time:</strong> {connectingTime}</p>
//                     <span className="edit-icon">✎</span>
//                 </div>
//             )}

//         </Card>
//     )

// }


// export default ConnectingFlightCard; 