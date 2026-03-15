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




function TripCard({ trip = { days: [], flights: [] }, getTrip }) {


  const navigate = useNavigate();
  const [isAddingDay, setIsAddingDay] = useState(false);
  const [addedActivityOnDayId, setAddedActivityOnDayId] = useState(null);
  const [isAddingFlight, setIsAddingFlight] = useState(false);
  const [addedConnectingFlightOnFlightId, setAddedConnectingFlightOnFlightId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTripName, setNewTripName] = useState("");
  const [isEditingFlightId, setIsEditingFlightId] = useState(null);

  const sortedDays = [...trip.days].sort((a, b) => new Date(a.date) - new Date(b.date));
  const sortedFlights = [...(trip.flights || [])].sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate));

  const isNewTrip = sortedDays.length === 0;

  const closeDayForm = () => setIsAddingDay(false);
  const closeActivityForm = () => setAddedActivityOnDayId(null);
  const closeFlightForm = () => setIsAddingFlight(false);
  const closeConnectingFlightForm = () => setAddedConnectingFlightOnFlightId(null);
  //close form sets default back to null, shows button and closes the input form



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



              <div className="editable-card" onClick={() => {
                setNewTripName(trip.name);
                setIsEditing(true);
              }}>
                <h1 className="trip-details">{trip.name}</h1>
              </div>
            )}

            {isNewTrip && !isAddingDay && (
              <AddDayCard
                tripId={trip.id}
                getTrip={getTrip}
                closeDayForm={closeDayForm}
              />
            )}



            {sortedDays.map((day) => { //create 1 daycard for each day, pass day object as prop to daycard */}
              const sortedActivities = [...(day.activities || [])].sort((a, b) =>
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

            {isAddingDay && (//show AddDay button only for trips with existing days
              <AddDayCard
                tripId={trip.id}
                getTrip={getTrip}
                closeDayForm={closeDayForm}
                hasExistingDays={trip.days.length > 0} //dont show cancel button on first day of new trip
              />
            )}
            {!isNewTrip && !isAddingDay && (
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





              {isAddingFlight && (
                <AddFlightCard
                  tripId={trip.id}
                  getTrip={getTrip}
                  closeFlightForm={closeFlightForm}
                  formatDate={formatDate} />
              )}

              {/*flight list*/}
              {sortedFlights.map((flight) => {

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
                        />
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
              </div>




            </div>
          </div>
        </div>





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