
import DayForm from "./DayForm";
import ActivityForm from "./ActivityForm";
import TripForm from "./TripForm";
import { useParams } from "react-router";
import { useEffect } from "react";

function ItineraryForm({ trips, setTrips, days, setDays }) {
    const { tripId } = useParams(); //to get the tripid from the url


    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/trips/${tripId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const fetchedTrip = await response.json();
                setDays(fetchedTrip.days || []);
            } catch (error) {
                console.error("Error getting trip:", error.message);
            }
        };

        fetchTrip();
    }, [tripId]);


    return (

        <div className="itinerary-form">
            <h2>Trip Itinerary</h2>
            {(days || []).map(day => (
                <DayForm key={day.id || day.tempId} day={day} setDays={setDays} days={days} />
            ))}
            <button onClick={() => setDays([...days, { city: "", date: "", activities: [] }])}>
                Add Day
            </button>
        </div>
    )

}

export default ItineraryForm;




{/* <div className="itinerary-form">
        //     <TripForm
        //         trips={trips}
        //         setTrips={setTrips}
        //        />

        //     <DayForm days={days} setDays={setDays} />



        //     {days.map(day => (
        //         <ActivityForm
        //             key={day.id}
        //             activities={day.activities || []}
        //             setActivities={updatedActivities => {
        //                 const newDay = days.map(existingDay =>
        //                     existingDay.id === day.id ? {
        //                         ...existingDay, activities: updatedActivities
        //                     } : existingDay);
        //                 setDays(newDay);
        //             }
        //             }

        //         />
        //     ))}
        // </div> */}