import Button from "../../planner-components/Button";
import ActivityCard from "../Activities/ActivityCard";
import AddActivityCard from "../Activities/AddActivityCard";
import AddDayCard from "../Days.jsx/AddDayCard";
import DayCard from "../Days.jsx/DayCard";
import { useEffect, useState } from "react";
import Card from "../../planner-components/Card";


function TripCard({ trip, getTrips }) { //getTrips passed from TripPage
    const [isAddingDay, setisAddingDay] = useState(false);
    const [addedActivityOnDayId, setAddedActivityOnDayId] = useState(null);


    const sortedDays = [...trip.days].sort((a, b) => new Date(a.date) - new Date(b.date));
    const closeDayForm = () => setisAddingDay(false);
    const closeActivityForm = () => setAddedActivityOnDayId(null);
    //close form sets default back to null, shows button and closes the input form




    return (
        <div className="outer-wrapper-planner">
            <div className="planner-form">
                <Card className="trip-card">
                    <h1 className="trip-details">{trip.name}</h1>

                    {sortedDays.map(day => {

                        const sortedActivities = [...day.activities].sort((a, b) => {
                            const timeA = a.time ?? ""; //localeCompare cant sort null
                            const timeB = b.time ?? "";
                            return timeA.localeCompare(timeB);
                        });

                        return (
                            <div key={day.id} className="day-section">
                                
                                <DayCard day={day} trip={trip} getTrips={getTrips} />



                                <div className="activities-container">
                                    {sortedActivities.map(activity => (
                                        <ActivityCard
                                            key={activity.id}
                                            activity={activity}
                                            dayId={day.id}
                                            getTrips={getTrips}
                                            trip={trip}
                                            activities={day.activities} />

                                    ))}</div>
                                {Array.isArray(trip?.days) && trip.days.length > 1 && (
                                    <hr style={{ margin: "20px 0" }} />
                                )}


                                {addedActivityOnDayId === day.id ? ( //state defaults to null, so no match
                                    <AddActivityCard                //shows button instead which updates state to match day.id,
                                        dayId={day.id}              //which then shows activity card
                                        getTrips={getTrips}
                                        closeActivityForm={closeActivityForm} />

                                ) : (
                                    <div className="button-row">
                                        <Button className="add-button"
                                            onClick={() => setAddedActivityOnDayId(day.id)}
                                            label="Add Activity"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {isAddingDay ? (
                        <AddDayCard
                            tripId={trip.id}
                            getTrips={getTrips}
                            closeDayForm={closeDayForm} />
                    ) : (
                        <div className="button-row">
                            <Button className="add-button"
                                onClick={() => setisAddingDay(true)}
                                label="Add Day"
                            />
                        </div>

                    )}



                </Card>
            </div>
        </div>
    );
}
export default TripCard;