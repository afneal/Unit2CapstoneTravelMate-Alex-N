import { useEffect } from "react";
import { Link } from "react-router";



function AllTrips({ trips, setTrips }) {



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
            console.error("Failed to get trips:", error.message);
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
                        <Link 
                            key={trip.id}
                            to={`/trips/${trip.id}`} 
                            className='trip-name-links'>{trip.name}</Link>
                    ))}
                </div>
                
            )}
        </div >
    );
}



export default AllTrips;


