import DayForm from "./DayForm";


function ActivityForm({ dayId, activities, setActivities }) {

    const [isEditing, setIsEditing] = useState(false);
    const [newActivity, setNewActivity] = useState({ name: "", time: "", notes: "" })

    //update local state during typing
    const onActivityChange = (activityId, fieldName, newValue) => {
        setActivities(
            activities.map(existingActivity => existingActivity.id === activityId ?
                { ...existingActivity, [fieldName]: newValue } : existingActivity))
    }

    // const handleActivityDelete = async id => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/api/activities/deleteActivity/{activityId}`, {
    //             method: 'DELETE',
    //             headers: { 'Content-Type': 'application/json' },
    //         });
    //         setActivities(activities.filter(activity => activity.id !== activityId));
    //     }catch (error) {
    //          const errorData = await response.json();
    //          throw new Error(
    //         errorData.message || `ERROR - Status ${response.status}`,
    //          );
    //     }
    // }

    const handleActivityDelete = async (activityId) => {
        try {
            await fetch(`http://localhost:8080/api/activities/deleteActivity/${activityId}`, {
                method: 'DELETE',
            });
            setActivities(activities.filter(activity => activity.id !== activityId));
        } catch (error) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || `ERROR - Status ${response.status}`,
            );
        }
    }

    const handleAddNewActivity = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/activities/addActivity/${dayId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newActivity)
            });
            const savedActivity = await response.json();
            setActivities([...activities, savedActivity]);
            setNewActivity({ name: "", time: "", notes: "" });
        } catch (error) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || `ERROR - Status ${response.status}`,
            );
        }
    }

    const handleSaveUpdateActivities = async (activityId) => {
        try {
            const updatedActivities = await Promise.all(
                activities.map(activity =>
                    `http://localhost:8080/api/activities/editActivity/${activity.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(activity),
                }).then(response => response.json())
            );
            setActivities(updatedActivities);
            setIsEditing(false);
        } catch (error) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || `ERROR - Status ${response.status}`,
            );
        }
    }


    // const handleSave = async (activity) => {
    //     await ActivityService.updateActivity(activity.id, activity);
    //     setIsEditing(false);
    // }



    return (
        <div className="activity-form">
            {activities.map(activity => (
                <div key={activity.id}>
                    {isEditing ? (

                        <>
                            <input
                                value={activity.name}
                                placeholder="Activity Name"
                                onChange={e => onActivityChange(activity.id, 'name', e.target.value)}
                            />


                            <input
                                value={activity.time}
                                placeholder="Activity Time"
                                onChange={e => onActivityChange(activity.id, 'time', e.target.value)}
                            />


                            <textarea
                                value={activity.notes}
                                placeholder="Notes"
                                onChange={e => onActivityChange(activity.id, 'notes', e.target.value)}
                            />
                            <button onClick={() => handleActivityDelete(activity.id)}>Delete Activity</button>
                        </>
                    ) : (
                        <>
                            <p>{activity.name}</p>
                            <p>{activity.time}</p>
                            <p>{activity.notes}</p>
                        </>
                    )}
                </div>
            ))}

            {isEditing && (
                <div>
                    <input
                        placeholder="Name"
                        value={newActivity.name}
                        onChange={(e => setNewActivity({ ...newActivity, name: e.target.value }))}
                    />
                    <input
                        placeholder="Time"
                        value={newActivity.time}
                        onChange={(e => setNewActivity({ ...newActivity, time: e.target.value }))}
                    />
                    <input
                        placeholder="Notes"
                        value={newActivity.notes}
                        onChange={(e => setNewActivity({ ...newActivity, notes: e.target.value }))}
                    />
                    <button onClick={() => handleAddNewActivity(dayId)}>Add New Activity</button>
                </div>
            )}

            <button onClick={() => setIsEditing(isEditing)}>
                {!isEditing ? "Edit Activities" : "Cancel Edit"}
            </button>
            {isEditing &&
                <button onClick={() => handleSaveUpdateActivities(activity)}>Save Activities</button>
            }
        </div>
    );
}



export default ActivityForm;