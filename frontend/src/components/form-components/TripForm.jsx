


function TripForm({ trips, setTrips }) {

    const onTripChange = (tripId, fieldName, newValue) => {
        setTrips(
            trips.map(existingTrip => existingTrip.id === tripId ?
                { ...existingTrip, [fieldName]: newValue } : existingTrip))
    }



    return (
        <div>
            {trips.map(trip => (
                <div key={trip.id}>
                    <input
                        value={trip.name}
                        placeholder="Trip Title"
                        onChange={e => onTripChange(trip.id, 'name', e.target.value)}
                    />

                </div>
            ))}
        </div>
    )
}

export default TripForm;
