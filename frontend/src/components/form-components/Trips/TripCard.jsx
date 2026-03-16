import Button from "../../planner-components/Button";
import ActivityCard from "../Activities/ActivityCard";
import AddActivityCard from "../Activities/AddActivityCard";
import AddDayCard from "../Days/AddDayCard";
import DayCard from "../Days/DayCard";
import { useState } from "react";
import Card from "../../planner-components/Card";
import { useNavigate } from "react-router";
import List from "../../planner-components/List";
import AddFlightCard from "../MainFlights/AddFlightCard";
import FlightCard from "../MainFlights/FlightCard";
import AddConnectingFlightCard from "../ConnectingFlights/AddConnectingFlightCard";




function TripCard({ trip = { days: [], flights: [] }, getTrip }) { //props default to empty arrays to prevent errors, getTrip from TripDisplayPage to refresh the trip data


  const navigate = useNavigate();
  const [isAddingDay, setIsAddingDay] = useState(false);
  const [addedActivityOnDayId, setAddedActivityOnDayId] = useState(null); //track which day is adding new activity
  const [isAddingFlight, setIsAddingFlight] = useState(false);
  const [addedConnectingFlightOnFlightId, setAddedConnectingFlightOnFlightId] = useState(null); //track which flight is adding new connection
  const [isEditing, setIsEditing] = useState(false);
  const [newTripName, setNewTripName] = useState("");
  const [isEditingFlightId, setIsEditingFlightId] = useState(null); //track which flight is being edited

  //sort days and flight chronologically
  const sortedDays = [...trip.days].sort((a, b) => new Date(a.date) - new Date(b.date)); //trip.days from backend
  const sortedFlights = [...(trip.flights || [])].sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate)); //trip.flights from backend

  const isNewTrip = sortedDays.length === 0;

  //close form sets default back to null, shows button and closes the input form
  const closeDayForm = () => setIsAddingDay(false);
  const closeActivityForm = () => setAddedActivityOnDayId(null);
  const closeFlightForm = () => setIsAddingFlight(false);
  const closeConnectingFlightForm = () => setAddedConnectingFlightOnFlightId(null);




  const handleSave = async () => {
    const trimmedTripName = newTripName.trim(); //prevent submitting empty trip name or "   " name(trim handles that edge case by removing white space)
    if (!trimmedTripName) return;

    await fetch(`http://localhost:8080/api/trips/editTripName/${trip.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmedTripName }),
    }); //sends the body to the API endpoint(editTripName by trip.id), changes trip.name to the new name

    await getTrip(); //wait for server to update the new name
    setIsEditing(false);
    setIsEditingFlightId(null);
  }


  //find lists by listType and pass to List compenent
  //find: searches list for matching listType field, set in trip controller on new trip creation
  //lists?: only try to "find" if trip.lists not null or not undefined. 
  //go through the array list of lists until a listType matches, then return that list
  const packingList = trip.lists?.find(list => list.listType === "Packing");
  const remindersList = trip.lists?.find(list => list.listType === "Reminders");

  function formatDate(dateString) { //backend defaults to YYYY-MM-DD, reformat to this
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${month}-${day}-${year}`;
  }



  return (
    <div className="outer-wrapper-planner">
      <Card className="trip-card">

        <div className="flights-days-container">
          <div className="planner-form planner-days">

            {/*Edit trip name */}
            {isEditing ? ( //isEditing: show input, save button, cancel. Handle save function above
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
              //notEditing: show trip name
              <div className="editable-card" onClick={() => {
                setNewTripName(trip.name);
                setIsEditing(true);
              }}>
                <h1 className="trip-details">{trip.name}</h1>
              </div>
            )}

            {/*automatically show addDayForm for newly created trip*/}
            {isNewTrip && !isAddingDay && (
              <AddDayCard
                tripId={trip.id}
                getTrip={getTrip}
                closeDayForm={closeDayForm}
              />
            )}


            {/*show days*/}
            {sortedDays.map((day) => { //iterates thru each day in trip, creates <DayCard> for each day, pass day object as prop to daycard */}
              const sortedActivities = [...(day.activities || [])].sort((a, b) => //sort activities by time for each day
                (a.time ?? "").localeCompare(b.time ?? ""));

              return (
                <div key={day.id} className="day-section">
                  <DayCard
                    tripId={trip.id}
                    day={day} //from sortedDays day map
                    trip={trip}
                    getTrip={getTrip}
                    formatDate={formatDate}
                    closeDayForm={closeDayForm} />

                  {/*maps through activities and shows activites for that specific day (already sorted from above function)*/}
                  {sortedActivities.length > 0 && (
                    <div className="activities-container">
                      {sortedActivities.map((activity) => (
                        <ActivityCard
                          key={activity.id} //need uniqe key to map over lists
                          activity={activity} //rom sortedActivites map, data for each activity, ActivityCard needs to know what to display
                          dayId={day.id} //track days that each activity is attached to, from backend
                          getTrip={getTrip}
                          trip={trip}
                          activities={day.activities} //list of all activities for the day
                        />
                      ))}
                    </div>
                  )}

                  {/*on "add activity" button click, sets state to the day.id, since state matches the day.id,
                   will open the AddActivity form for that day only */}
                  {addedActivityOnDayId === day.id ? (
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

            {/*show AddDayCard if addingDay is true (on button click)*/}
            {isAddingDay && (
              <AddDayCard
                tripId={trip.id}
                getTrip={getTrip}
                closeDayForm={closeDayForm}
                hasExistingDays={trip.days.length > 0} //dont show cancel button on first day of new trip
              />
            )}
            {!isNewTrip && !isAddingDay && ( //show AddDay button only for trips with existing days, changes state and displays AddDayCard
              <div className="button-row">
                <Button
                  className="add-button"
                  onClick={() => setIsAddingDay(true)}
                  label="Add Day"
                />
              </div>
            )}
          </div>



          <div className="planner-form planner-flights">
            <div className="flights-container">
              <h1 className="trip-details">Flights</h1>

            {/*show AddFlightCard if addingFlights state is true (on addFLight button click)*/}
              {isAddingFlight && (
                <AddFlightCard
                  tripId={trip.id}
                  getTrip={getTrip}
                  closeFlightForm={closeFlightForm}
                  formatDate={formatDate} />
              )}


              {/*flight list*/}
              {sortedFlights.map((flight) => { //map through sortedFlights and display FlightCard for each flight
                return (
                  <div key={flight.id}
                    className="flight-section">

                    <FlightCard
                      flight={flight}
                      getTrip={getTrip}
                      closeFlightForm={closeFlightForm}
                      connectingFlights={flight.connectingFlights}
                      isEditingFlightId={isEditingFlightId}
                      setIsEditingFlightId={setIsEditingFlightId}
                      formatDate={formatDate} />

                    {/*on button click, sets state to flight.id, adds AddConnectingFlightCard to that flight*/}
                    {addedConnectingFlightOnFlightId === flight.id ? (
                      <AddConnectingFlightCard
                        flightId={flight.id}
                        getTrip={getTrip}
                        closeConnectingFlightForm={closeConnectingFlightForm}
                      />
                    ) : (
                      <div className="button-row">
                        <Button
                          className="add-button"
                          onClick={() => setAddedConnectingFlightOnFlightId(flight.id)}
                          disabled={isEditingFlightId !== null || isAddingFlight || (addedConnectingFlightOnFlightId !== flight.id && addedConnectingFlightOnFlightId !== null)}
                          label="Add Connecting Flight"
                        /> {/*disable add button if is already adding flight, if is already editing flight, if already adding another connection */}
                      </div>

                    )}
                    {trip.flights.length > 1 && <hr style={{ margin: "20px 0" }} />}

                  </div>
                );
              })}


              <div className="button-row">
                <Button
                  className="add-button"
                  label="Add Flight"
                  onClick={() => setIsAddingFlight(true)}
                  disabled={isAddingFlight || isEditingFlightId !== null || addedConnectingFlightOnFlightId !== null} />
              </div> {/*disable add flight button if is already adding flight, if is already editing flight, if is already adding connections*/}
            </div>
          </div>
        </div>


          {/*display lists*/}
        <div className="lists-container">
          <List
            list={packingList || []}
            tripId={trip.id}
            getTrip={getTrip} />

          <List
            list={remindersList || []}
            tripId={trip.id}
            getTrip={getTrip} />
        </div>
      </Card >
    </div >

  );
}

export default TripCard;