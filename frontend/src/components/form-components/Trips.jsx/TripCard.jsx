import Button from "../../planner-components/Button";
import ActivityCard from "../Activities/ActivityCard";
import AddActivityCard from "../Activities/AddActivityCard";
import AddDayCard from "../Days.jsx/AddDayCard";
import DayCard from "../Days.jsx/DayCard";
import { useState } from "react";
import Card from "../../planner-components/Card";


function TripCard({ trip, getTrips }) {
    const [isAddingDay, setisAddingDay] = useState(false);
    const [addedActivityOnDayId, setAddedActivityOnDayId] = useState(null);


    const sortedDays = [...trip.days].sort((a, b) => new Date(a.date) - new Date(b.date));
    const closeDayForm = () => setisAddingDay(false);
    const closeActivityForm = () => setAddedActivityOnDayId(null);
    //close form sets default back to null, shows button and closes the input form


    return (
        <Card className="trip-card">
            <h2>{trip.name}</h2>

            {sortedDays.map(day => {

                const sortedActivities = [...day.activities].sort((a, b) => {
                    const timeA = a.time ?? ""; //localeCompare cant sort null
                    const timeB = b.time ?? "";
                    return timeA.localeCompare(timeB);
                });

                return (
                    <div key={day.id} className="day-section">
                        <DayCard day={day} getTrips={getTrips} />

                        {sortedActivities.map(activity => (
                            <ActivityCard
                                key={activity.id}
                                activity={activity}
                                dayId={day.id}
                                getTrips={getTrips} />

                        ))}

                        {addedActivityOnDayId=== day.id ? ( //state defaults to null, so no match
                            <AddActivityCard                //shows button instead which updates state to match day.id,
                                dayId={day.id}              //which then shows activity card
                                getTrips={getTrips}
                                closeActivityForm={closeActivityForm} /> 

                        ) : (
                            <Button className="add-activity-button" 
                                    onClick={() => setAddedActivityOnDayId(day.id)}
                                    label="Add Activity"
                               />
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
                <Button className="add-day-button" 
                        onClick={() => setisAddingDay(true)}
                        label="Add Day"
                        />
            )}

        </Card>
    );
}
export default TripCard;