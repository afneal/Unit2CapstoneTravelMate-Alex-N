import ActivityCard from "../Activities/ActivityCard";
import AddActivityCard from "../Activities/AddActivityCard";
import AddDayCard from "../Days.jsx/AddDayCard";
import DayCard from "../Days.jsx/DayCard";
import { useState } from "react";


function TripCard({ trip, getTrips, onDone }) {
    const [isAddingDay, setisAddingDay] = useState(false);
    const [isAddingActivityForDayId, setIsAddingActivityForDayId] = useState(null);


    const sortedDays = trip.days.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="trip-card">
            <h2>{trip.name}</h2>

            {sortedDays.map(day => {

                const sortedActivities = day.activities.slice().sort((a, b) => {
                    return a.time.localeCompare(b.time);
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

                        {isAddingActivityForDayId === day.id ? (
                            <AddActivityCard
                                dayId={day.id}
                                getTrips={getTrips}
                                onDone={() => setIsAddingActivityForDayId(null)} />

                        ) : (
                            <button onClick={() => setIsAddingActivityForDayId(day.id)}>
                                Add Activity
                            </button>
                        )};
                    </div>
                );
            })}
            {isAddingDay ? (
                <AddDayCard
                    tripId={trip.id}
                    getTrips={getTrips}
                    onDone={() => setisAddingDay(false)} />
            ) : (
                <button onClick={() => setisAddingDay(true)}>Add Day</button>
            )}

        </div>
    );
}
export default TripCard;