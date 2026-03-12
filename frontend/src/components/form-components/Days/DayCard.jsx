import { useState } from "react";
import Button from "../../planner-components/Button";
import Card from "../../planner-components/Card";


function DayCard({ day, trip, getTrip }) {
    //inline editing
  const [isEditing, setIsEditing] = useState(false);

  const [city, setCity] = useState(day.city ?? "");
  const [date, setDate] = useState(day.date ?? "");

  const handleSave = async () => {
    await fetch(`http://localhost:8080/api/days/editDay/${day.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: city || null, date: date || null }),
    });

    await getTrip();
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:8080/api/days/deleteDay/${day.id}`, {
        method: "DELETE",
    });
    await getTrip();

  }

  function formatDate(dateString) { //backend defaults to YYYY-MM-DD, reformat to this
         if (!dateString) return "";
        const [year, month, day] = dateString.split("-");
         return `${month}-${day}-${year}`;
     }

  return (
    <Card className="day-card">
      {isEditing ? (
        //edit form
        <>
          <input
            className="planner-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
          <input
            className="planner-input"
            type="date"
            value={date ?? ""}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="button-row">
            <Button 
              className="save-button" 
              onClick={handleSave} 
              label="Save Day" />

            <Button 
              className="cancel-button" 
              onClick={() => setIsEditing(false)} 
              label="Cancel" />

            <Button
              className="delete-button"
              onClick={handleDelete}
              label="Delete Day" />
          </div>
        </>
      ) : (
        // display form
        <div className="editable-day-card" onClick={() => setIsEditing(true)}>
          <p><strong>City:</strong> {city}</p>
          <p><strong>Date:</strong> {formatDate(date)}</p>
          <span className="edit-icon">✎</span>
        </div>
      )}
    </Card>
  );
}

export default DayCard;































// function DayCard({ day, trip, getTrip }) {
//     const [city, setCity] = useState(day.city);
//     const [date, setDate] = useState(day.date ?? "");

//     //inline editing
//     const [isEditingInput, setIsEditingInput] = useState(null);

    

//     const handleSave = async () => {
//         let body = {};

//         if (isEditingInput === "city") { //send only the edited field to prevent sending a null or "" in the other field(400 bad req)
//             body.city = city;
//         } else if (isEditingInput === "date") {
//             body.date = date;
//         }

//         await fetch(`http://localhost:8080/api/days/editDay/${day.id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(body)
//         });

//         await getTrip();
//         setIsEditingInput(null);

//     };



//     function formatDate(dateString) { //backend defaults to YYYY-MM-DD, reformat to this
//         if (!dateString) return "";
//         const [year, month, day] = dateString.split("-");
//         return `${month} - ${day} - ${year}`;
//     }



//     return (
//         <Card className="day-card">


//             {isEditingInput === "date" ? ( //use a {  because its an "embedded expression(evaluates to a value like 'yes', 'no' etc)"
//                 <div>

//                     <input
//                         className="planner-input"
//                         type="date"
//                         value={date}
//                         onChange={e => setDate(e.target.value)}
//                     />

//                     <div className="button-row">
//                         <Button className="save-button"
//                             onClick={handleSave}
//                             label="Save Date"
//                         />
//                     </div>
//                 </div>
//             ) : (
//                 <div className="trip-date-box" onClick={() => setIsEditingInput("date")}>
//                     <strong>Date:</strong> {formatDate(date)}
//                     </div>
//                     )}

//                     {isEditingInput === "city" ? (
//                         <div>
//                             < input
//                                 className="planner-input"
//                                 value={city}
//                                 onChange={e => setCity(e.target.value)}
//                             />

//                             <div className="button-row">
//                                 <Button className="save-button"
//                                     onClick={handleSave}
//                                     label="Save Day"
//                                 />
//                             </div>
//                         </div>

//                     ) : (

//                         <p onClick={() => setIsEditingInput("city")}><strong>City: </strong>{city}</p>


//                     )}

//                 </Card >
        
//                 )
//                 }



// export default DayCard;