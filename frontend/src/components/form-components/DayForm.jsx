import { useState } from "react";
import ActivityForm from "./ActivityForm";


function DayForm({ day, days, setDays }) {
    const [isEditing, setIsEditing] = useState(false);

    const onDayChange = (fieldName, newValue) => {
        setDays(
            days.map(existingDay => existingDay === day ?
                { ...existingDay, [fieldName]: newValue } : existingDay));
    };

    const addActivity = () => {
        const newActivity = {name: "", time: "", notes: ""};
        setDays(days.map(existingDay === day ? {...existingDay, activities: [...existingDay.activities, newActivity]} : existingDay)); 
    };

    return (
        <div className="day">
            {isEditing ? (

                <>
                    <input
                        value={day.city}
                        placeholder="City"
                        onChange={e => onDayChange('city', e.target.value)}
                    />

                    <input
                        value={day.date}
                        type="date"
                        placeholder="Date"
                        onChange={e => onDayChange('date', e.target.value)}
                    />
                    <ActivityForm day={day} setDays={setDays} days={days} />
                    <button onClick={() => handleAddNewActivity()}>Add Activity</button>
                    <button onClick={() => setIsEditing(false)}>Save</button>
                </>
            ) : (
                <>
                    <p>{day.city} - {day.date}</p>
                    {day.activities.map(activity => (
                        <p key={activity.id}>{activity.name} - {activity.time}</p>
                    ))}


                    <button onClick={() => setIsEditingDayId(true)}>Edit Day</button>
                </>
            )}
        </div>
    );
}



export default DayForm;






// const [isAddingDay, setIsAddingDay] = useState(false);
//     // const [isEditing, setIsEditing] = useState(true);
//     const [newDay, setNewDay] = useState({ city: "", date: "", activities: [] })


//     const onDayChange = (dayId, fieldName, newValue) => {
//         setDays(
//             days.map(existingDay => existingDay.id === dayId ?
//                 { ...existingDay, [fieldName]: newValue } : existingDay))
//     }

//     const handleSaveUpdateDay = async (dayId) => {
//         try {
//             const updatedDay = await Promise.all(
//                 days.map(async day => {
//                     const response = await fetch(
//                         `http://localhost:8080/api/days/editDay/${day.id}`, {
//                         method: 'PUT',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify(day),
//                     })
//                     if (!response.ok) {
//                         const errorData = await response.json();
//                         throw new Error(
//                             errorData.message || `ERROR - Status ${response.status}`,
//                         );
//                     }
//                     return response.json();
//                 })
//             );
//             setDays(updatedDay);
//             setIsEditing(false);

//         } catch (error) {
//             console.error("Failed to save days:", error.message);
//         }


//         const handleAddNewDay = async () => {
//             try {
//                 const response = await fetch(
//                     `http://localhost:8080/api/trips/addTrip`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(newDay)
//                 }
//                 );
//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(
//                         errorData.message || `ERROR - Status ${response.status}`,
//                     );
//                 }

//                 const savedDay = await response.json();
//                 setDays([...days, savedDay]);
//                 setNewDay({ city: "", date: "" });
//             } catch (error) {
//                 console.error(error.message);

//             }
//         }


//         {
//             days.map(day => (
//                 <div key={day.id}>
//                     {isEditing ? (

//                         <>
//                             <input
//                                 value={day.city}
//                                 placeholder="City"
//                                 onChange={e => onDayChange(day.id, 'city', e.target.value)}
//                             />

//                             <input
//                                 value={day.date}
//                                 type="date"
//                                 placeholder="Date"
//                                 onChange={e => onDayChange(day.id, 'date', e.target.value)}
//                             />
//                             <button onClick={() => handleSaveUpdateDay(day)}>Save Day</button>
//                             <button onClick={() => setIsEditingDayId(null)}>Cancel</button>
//                         </>
//                     ) : (
//                         <>
//                             <p>{day.city}</p>
//                             <p>{day.date}</p>


//                             <button onClick={() => setIsEditingDayId(day.id)}>Edit Day</button>
//                         </>
//                     )}
//                 </div>
//             ))
//         }

//         {
//             isEditing && (
//                 <div>
//                     <input
//                         placeholder="City"
//                         value={newDay.city}
//                         onChange={(e => setNewDay({ ...newDay, city: e.target.value }))}
//                     />
//                     <input
//                         placeholder="Date"
//                         value={newDay.date}
//                         onChange={(e => setNewDay({ ...newDay, date: e.target.value }))}
//                     />
//                     <button onClick={() => handleAddNewDay(tripId)}>Add Day </button>
//                 </div>
//             )
//         }


//             </div >




//         return (
//         <div className="day-form">
//             {days.length == 0 ? (
//                 <p>No days added yet.</p>
//             ) : (

//                 days.map(day => (
//                     <div key={day.id}>
//                         <p>{day.dat} - {day.city}</p>
//                         <button onClick={() => handleSaveUpdateDay(day.id)}>Edit</button>
//                     </div>
//                 ))
//             )}


//             <button onClick={() => setIsAddingDay(true)}>Add Day</button>


//             {isAddingDay && (
//                 <div className="new-day-form">
//                     <input
//                         value={day.city}
//                         placeholder="City"
//                         onChange={e => onDayChange(day.id, 'city', e.target.value)}
//                     />

//                     <input
//                         value={day.date}
//                         type="date"
//                         placeholder="Date"
//                         onChange={e => onDayChange(day.id, 'date', e.target.value)}
//                     />
//                     <button onClick={() => handleSaveUpdateDay(day)}>Save Day</button>
//                     <button onClick={() => setIsEditingDayId(null)}>Cancel</button>
//                 </>
//                             </div>
//     )
// }



//     {isEditing && (
//         <div>
//             <input
//                 placeholder="City"
//                 value={newDay.city}
//                 onChange={(e => setNewDay({ ...newDay, city: e.target.value }))}
//             />
//             <input
//                 placeholder="Date"
//                 value={newDay.date}
//                 onChange={(e => setNewDay({ ...newDay, date: e.target.value }))}
//             />
//             <button onClick={() => handleAddNewDay(tripId)}>Add Day </button>
//         </div>
//     )
// }


// const handleAddNewActivity = async () => {
    //         const response = await fetch(
    //             `http://localhost:8080/api/activities/addActivity/${dayId}`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(newActivity)
    //         });
    //         const newActivity = await response.json();
    //         setActivities([...activities, savedActivity]);
    //         setNewActivity({ name: "", time: "", notes: "" });
    //     } catch (error) {
    //         const errorData = await response.json();
    //         throw new Error(
    //             errorData.message || `ERROR - Status ${response.status}`,
    //         );
    //     }
    // }
