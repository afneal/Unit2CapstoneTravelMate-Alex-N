import Button from "../../planner-components/Button";
import ActivityCard from "../Activities/ActivityCard";
import AddActivityCard from "../Activities/AddActivityCard";
import AddDayCard from "../Days/AddDayCard";
import DayCard from "../Days/DayCard";
import { useEffect, useState } from "react";
import Card from "../../planner-components/Card";
import { useNavigate } from "react-router";



function TripCard({ trip = { days: [] }, getTrip }) { //getTrip and trip passed from TripDisplayPage
  const navigate = useNavigate();
  const [isAddingDay, setIsAddingDay] = useState(false);
  const [addedActivityOnDayId, setAddedActivityOnDayId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTripName, setNewTripName] = useState(null);

  const sortedDays = [...trip.days].sort((a, b) => new Date(a.date) - new Date(b.date));
  const isNewTrip = sortedDays.length === 0;

  const closeDayForm = () => setIsAddingDay(false);
  const closeActivityForm = () => setAddedActivityOnDayId(null);
  //close form sets default back to null, shows button and closes the input form

  useEffect(() => { //runs when component renders
    setNewTripName(trip.name); //updates local state to backend prop (trip.name)
  }, [trip.name]); //dependency array, react will run useEffect when trip.name changes

  const daysToRender = isNewTrip
    ? [{ id: "new", activities: [] }]
    : sortedDays;

  const handleSave = async () => {
    await fetch(`http://localhost:8080/api/trips/editTripName/${trip.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newTripName }),
    }); //sends the body to the API endpoint(editTripName by trip.id), changes trip.name to the new name

    await getTrip(); //wait for server to update the new name
    setIsEditing(false);
  }

  const handleDeleteTrip = async () => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this trip?");

    if (!confirmDelete) {
      return;
    }

    await fetch(`http://localhost:8080/api/trips/delete/${trip.id}`, {
      method: "DELETE",
    });

    navigate("/trips");
  }


  return (
    <div className="outer-wrapper-planner">
      <div className="planner-form">
        <Card className="trip-card">
          {/* <h1 className="trip-details"> */}
          {isEditing ? (
            <>
              <input
                className="planner-input"
                value={newTripName}
                onChange={(e) => setNewTripName(e.target.value)}
              />
              <div className="button-row">
                <Button
                  className="save-button"
                  onClick={handleSave}
                  label="Save Name" />

                <Button
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                  label="Cancel" />
              </div>
            </>
          ) : (



            <div className="editable-card" onClick={() => setIsEditing(true)}>
              <h1 className="trip-details">{trip.name}</h1>
            </div>
          )}




          {daysToRender.map((day) => {
            const sortedActivities = [...(day.activities || [])].sort((a, b) => {
              const timeA = a.time ?? "";
              const timeB = b.time ?? "";
              return timeA.localeCompare(timeB);
            });

            // const isEmptyDay = sortedActivities.length === 0;
            const isFirstDayOfNewTrip = isNewTrip && day.id === "new";

            // Fake day for new trips (cant add empty activity unless day already exists)
            if (day.id === "new") {
              return (
                <div key="new" className="day-section">
                  <AddDayCard
                    tripId={trip.id}
                    getTrip={getTrip}
                    closeDayForm={closeDayForm}
                  />
                  <AddActivityCard
                    dayId={day.id}
                    getTrip={getTrip}
                    closeActivityForm={closeActivityForm}
                  />
                </div>
              );
            }

            // Real day
            return (
              <div key={day.id} className="day-section">
                <DayCard
                  tripId={trip.id}
                  day={day}
                  trip={trip}
                  getTrip={getTrip}
                  closeDayForm={closeDayForm} />

                {sortedActivities.length > 0 && (
                  <div className="activities-container">
                    {sortedActivities.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        dayId={day.id}
                        getTrip={getTrip}
                        trip={trip}
                        activities={day.activities}
                      />
                    ))}
                  </div>
                )}

                {/* AddActivityCard or Add button below the list */}
                {isFirstDayOfNewTrip || addedActivityOnDayId === day.id ? (
                  <AddActivityCard
                    dayId={day.id}
                    getTrip={getTrip}
                    closeActivityForm={closeActivityForm}
                  />
                ) : (
                  <div className="button-row">
                    <Button
                      className="add-button"
                      onClick={() => setAddedActivityOnDayId(day.id)}
                      label="Add Activity"
                    />
                  </div>
                )}

                {trip.days.length > 1 && <hr style={{ margin: "20px 0" }} />}
              </div>
            );
          })}

          {/* Show AddDay button only for trips with existing days */}
          {isAddingDay && (
            <AddDayCard
              tripId={trip.id}
              getTrip={getTrip}
              closeDayForm={closeDayForm}
            />
          )}
          {!isNewTrip && !isAddingDay && (
            <div className="button-row">
              <Button
                className="add-button"
                onClick={() => setIsAddingDay(true)}
                label="Add Day"
              />

              <Button
                className="delete-button"
                onClick={handleDeleteTrip}
                label="Delete Trip"
              />
              
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default TripCard;






//   return (
//     <div className="outer-wrapper-planner">
//       <div className="planner-form">
//         <Card className="trip-card">
//           <h1 className="trip-details">{trip.name}</h1>

//           {daysToRender.map((day) => {
//             const sortedActivities = [...(day.activities || [])].sort((a, b) => {
//               const timeA = a.time ?? "";
//               const timeB = b.time ?? "";
//               return timeA.localeCompare(timeB);
//             });

//             const isEmptyDay = sortedActivities.length === 0;


//             return (

//               <div key={day.id} className="day-section">
//                 {/* Day or fake day */}
//                 {day.id === "new" ? (
//                   <AddDayCard
//                     tripId={trip.id}
//                     getTrip={getTrip}
//                     closeDayForm={closeDayForm}
//                   />
//                 ) : (
//                   <DayCard day={day} trip={trip} getTrip={getTrip} />
//                 )}

//                 {/* Activities list */}
//                 <div className="activities-container">
//                   {sortedActivities.map((activity) => (
//                     <ActivityCard
//                       key={activity.id}
//                       activity={activity}
//                       dayId={day.id}
//                       getTrip={getTrip}
//                       trip={trip}
//                       activities={day.activities}
//                     />
//                   ))}
//                 </div>

//                 {/* AddActivityCard or button below the list */}
//                 {isEmptyDay || addedActivityOnDayId === day.id ? (
//                   <AddActivityCard
//                     dayId={day.id}
//                     getTrip={getTrip}
//                     closeActivityForm={closeActivityForm}
//                   />
//                 ) : (
//                   // Show button only for real days that are not empty
//                   day.id !== "new" && (
//                     <div className="button-row">
//                       <Button
//                         className="add-button"
//                         onClick={() => setAddedActivityOnDayId(day.id)}
//                         label="Add Activity"
//                       />
//                     </div>
//                   )
//                 )}

//                 {trip.days.length > 1 && <hr style={{ margin: "20px 0" }} />}
//               </div>

//             );
//           })}

//           {/* Show AddDay button only for trips with existing days */}
//           {!isNewTrip && !isAddingDay && (
//             <div className="button-row">
//               <Button
//                 className="add-button"
//                 onClick={() => setIsAddingDay(true)}
//                 label="Add Day"
//               />
//             </div>
//           )}
//         </Card>
//       </div>
//     </div>
//   );
// }

// export default TripCard;






//             return (
//               <div key={day.id} className="day-section">
//                 {/* Only render DayCard if it's a real day */}
//                 {day.id !== "new" && (
//                   <DayCard day={day} trip={trip} getTrip={getTrip} />
//                 )}

//                 <div className="activities-container">
//                   {sortedActivities.map((activity) => (
//                     <ActivityCard
//                       key={activity.id}
//                       activity={activity}
//                       dayId={day.id}
//                       getTrip={getTrip}
//                       trip={trip}
//                       activities={day.activities}
//                     />
//                   ))}

//                   {/* Show AddActivityCard for empty days or fake day */}
//                   {isEmptyDay || addedActivityOnDayId === day.id ? (
//                     <AddActivityCard
//                       dayId={day.id}
//                       getTrip={getTrip}
//                       closeActivityForm={closeActivityForm}
//                     />
//                   ) : (
//                     <div className="button-row">
//                       <Button
//                         className="add-button"
//                         onClick={() => setAddedActivityOnDayId(day.id)}
//                         label="Add Activity"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {trip.days.length > 1 && <hr style={{ margin: "20px 0" }} />}
//               </div>
//             );
//           })}

//           {/* AddDayCard for new trip or when user clicks "Add Day" */}
//           {isAddingDay || isNewTrip ? (
//             <AddDayCard
//               tripId={trip.id}
//               getTrip={getTrip}
//               closeDayForm={closeDayForm}
//             />
//           ) : (
//             <div className="button-row">
//               <Button
//                 className="add-button"
//                 onClick={() => setIsAddingDay(true)}
//                 label="Add Day"
//               />
//             </div>
//           )}
//         </Card>
//       </div>
//     </div>
//   );
// }

// export default TripCard;







//     useEffect(() => {
//         if (!addedActivityOnDayId) {
//       const firstEmptyDay = sortedDays.find(day => !day.activities || day.activities.length === 0);
//       if (firstEmptyDay) setAddedActivityOnDayId(firstEmptyDay.id);
//     }
//   }, [sortedDays]);

//     return (
//         <div className="outer-wrapper-planner">
//             <div className="planner-form">
//                 <Card className="trip-card">
//                     <h1 className="trip-details">{trip.name}</h1>

//                     {/* Loop through existing days */}
//                     {sortedDays.map(day => {
//                         const sortedActivities = [...(day.activities || [])].sort((a, b) => {
//                             const timeA = a.time ?? "";
//                             const timeB = b.time ?? "";
//                             return timeA.localeCompare(timeB);
//                         });

//                         const isEmptyDay = sortedActivities.length === 0;

//                         return (
//                             <div key={day.id} className="day-section">
//                                 <DayCard day={day} trip={trip} getTrip={getTrip} />

//                                 <div className="activities-container">
//                                     {sortedActivities.map(activity => (
//                                         <ActivityCard
//                                             key={activity.id}
//                                             activity={activity}
//                                             dayId={day.id}
//                                             getTrip={getTrip}
//                                             trip={trip}
//                                             activities={day.activities}
//                                         />
//                                     ))}

//                                     {/* AddActivityCard shows if day empty OR button clicked */}
//                                     {(isEmptyDay || addedActivityOnDayId === day.id) ? (
//                                         <AddActivityCard
//                                             dayId={day.id}
//                                             getTrip={getTrip}
//                                             closeActivityForm={closeActivityForm}
//                                         />
//                                     ) : (
//                                         <div className="button-row">
//                                             <Button
//                                                 className="add-button"
//                                                 onClick={() => setAddedActivityOnDayId(day.id)}
//                                                 label="Add Activity"
//                                             />
//                                         </div>
//                                     )}
//                                 </div>

//                                 {trip.days.length > 1 && <hr style={{ margin: "20px 0" }} />}
//                             </div>
//                         );
//                     })}

//                     {/* AddDayCard for new trip or when user clicks "Add Day" */}
//                     {isAddingDay || isNewTrip ? (
//                         <AddDayCard
//                             tripId={trip.id}
//                             getTrip={getTrip}
//                             closeDayForm={closeDayForm}
//                         />
//                     ) : (
//                         <div className="button-row">
//                             <Button
//                                 className="add-button"
//                                 onClick={() => setIsAddingDay(true)}
//                                 label="Add Day"
//                             />
//                         </div>
//                     )}
//                 </Card>
//             </div>
//         </div>
//     );







//         <div className="outer-wrapper-planner">
//             <div className="planner-form">
//                 <Card className="trip-card">
//                     <h1 className="trip-details">{trip.name}</h1>

//                     {sortedDays.map(day => {

//                         const sortedActivities = [...(day.activities || [])].sort((a, b) => {
//                             const timeA = a.time ?? ""; //localeCompare cant sort null
//                             const timeB = b.time ?? "";
//                             return timeA.localeCompare(timeB);
//                         });

//                         const isEmptyDay = sortedActivities.length === 0;

//                         return (
//                             <div key={day.id} className="day-section">

//                                 <DayCard day={day} trip={trip} getTrip={getTrip} />



//                                 <div className="activities-container">
//                                     {sortedActivities.map(activity => (
//                                         <ActivityCard
//                                             key={activity.id}
//                                             activity={activity}
//                                             dayId={day.id}
//                                             getTrip={getTrip}
//                                             trip={trip}
//                                             activities={day.activities} />

//                                     ))}

//                                     {(isEmptyDay || addedActivityOnDayId === day.id) ? (
//                                         <AddActivityCard
//                                             dayId={day.id}              //which then shows activity card
//                                             getTrip={getTrip}
//                                             closeActivityForm={closeActivityForm} />
//                                     ) : (
//                                         <div className="button-row">
//                                             <Button className="add-button"
//                                                 onClick={() => setAddedActivityOnDayId(day.id)}
//                                                 label="Add Activity"
//                                             />
//                                         </div>
//                                     )}
//                                 </div>
//                                 {Array.isArray(trip?.days) && trip.days.length > 1 && (
//                                     <hr style={{ margin: "20px 0" }} />
//                                 )}

//                                 {!isEmptyDay ||
//                                     addedActivityOnDayId === day.id ? ( //state defaults to null, so no match
//                                     <AddActivityCard                //shows button instead which updates state to match day.id,
//                                         dayId={day.id}              //which then shows activity card
//                                         getTrip={getTrip}
//                                         closeActivityForm={closeActivityForm} />

//                                 ) : (
//                                     <div className="button-row">
//                                         <Button className="add-button"
//                                             onClick={() => setAddedActivityOnDayId(day.id)}
//                                             label="Add Activity"
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                     {isAddingDay || isNewTrip ? (
//                         <AddDayCard
//                             tripId={trip.id}
//                             getTrip={getTrip}
//                             closeDayForm={closeDayForm} />
//                     ) : (
//                         <div className="button-row">
//                             <Button className="add-button"
//                                 onClick={() => setisAddingDay(true)}
//                                 label="Add Day"
//                             />
//                         </div>

//                     )}



//                 </Card>
//             </div>
//         </div>
//     );
// }
