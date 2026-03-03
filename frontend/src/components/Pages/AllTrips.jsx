import { useEffect } from "react";
import { useNavigate } from "react-router";


function AllTrips({ trips, setTrips }) {

const navigate = useNavigate();

    const onTripClick = (tripId) => {
        navigate(`/trips/${tripId}`);
    };

    const fetchTrips = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/trips`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const allTrips = await response.json();
            setTrips(allTrips);
        } catch (error) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || `ERROR - Status ${response.status}`,
            );
        }
    }

    useEffect(() => {
        fetchTrips();
    }, []);

    return (
        <div className="all-trips-page">
            <h2>Your Trips</h2>
            {trips.length === 0 ? (
                <p>No trips created yet.</p>
            ) : (
                <div>
                    {trips.map(trip => (
                        <button className="trip-button" onClick={() => onTripClick(trip.id)} >
                            {trip.name}
                        </button>
                    ))}
                </div>
            )}
        </div >
    );
}

//<Route path="/trips/:tripId" element={<TripDisplay />} />
//in the display page:
//const { tripId } = useParams();

export default AllTrips;


