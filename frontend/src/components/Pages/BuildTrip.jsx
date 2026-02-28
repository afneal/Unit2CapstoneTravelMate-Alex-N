import FlightInfo from "../planner/FlightInfo"
import PlannerForm from "../planner/PlannerForm"
import PackingList from "../planner/PackingList";
import ReminderList from "../planner/Reminders";

function BuildTrips({ trips, setTrips, flightData, setFlightData, packingList, setPackingList, reminderList, setReminderList }) {
    return (
        <>
            <div className="outer-wrapper-buildTrips">

                <div className="trip-box-buildTrips">
                    <div className="saved-trip-data-buildTrips">
                        <PlannerForm className="planner-form-buildTrip-box" trips={trips} setTrips={setTrips} />
                    </div>
                </div>

                <div className="flights-box-buildTrips">
                    <div className="flights-container-buildTrips">
                        <FlightInfo className="flight-info-buildTrip-box" flightData={flightData} setFlightData={setFlightData} />
                    </div>
                </div>


                <div className="packing-reminder-buildTrips">

                    <div className="packing-box-buildTrips">
                        <PackingList className="packing-list-buildTrip-box" packingList={packingList} setPackingList={setPackingList} />
                    </div>

                    <div className="reminder-box-buildTrips">
                        <ReminderList className="reminder-list-buildTrip-box" reminderList={reminderList} setReminderList={setReminderList} />
                    </div>
                </div>

            </div>



        </>

    )
}

export default BuildTrips;