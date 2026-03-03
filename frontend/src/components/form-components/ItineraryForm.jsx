
import DayForm from "./DayForm";
import ActivityForm from "./ActivityForm";
import TripForm from "./TripForm";

function ItineraryForm({ trips, setTrips, days, setDays, onTripChange }) {



    // const onTripChange = (tripId, fieldName, newValue) => {
    //     setTrips(
    //         trips.map(existingTrip => existingTrip.id === tripId ?
    //             { ...existingTrip, [fieldName]: newValue } : existingTrip))
    // }

    return (

        <div className="itinerary-form">
            <TripForm
                trips={trips}
                setTrips={setTrips}
                onTripChange={onTripChange} />

            <DayForm days={days} setDays={setDays} />



            {days.map(day => (
                <ActivityForm
                    key={day.id}
                    activities={day.activities}
                    setActivities={updatedActivities => {
                        const newDay = days.map(existingDay =>
                            existingDay.id === day.id ? {
                                ...existingDay, activities: updatedActivities
                            } : existingDay);
                        setDays(newDay);
                    }
                    }

                />
            ))}
        </div>
    )

}

export default ItineraryForm;