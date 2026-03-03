


function TripForm({ trips, setTrips }) {

    
const onTripChange = (tripId, fieldName, newValue) => {
        setTrips(
            trips.map(existingTrip => existingTrip.id === tripId ?
                { ...existingTrip, [fieldName]: newValue } : existingTrip))
    }


    return (
        <div className="trip-form">
            {trips.map(trip => (
                <div key={trip.id} className="trip-item">
                
                <input
                    value={trip.name}
                    placeholder="Trip Name"
                    onChange={e => onTripChange(trip.id, "name", e.target.value)}
                />
            </div>
            ))}
    </div>
    )};


export default TripForm;
