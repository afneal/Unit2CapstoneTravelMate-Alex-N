import DayForm from "./DayForm";


function ActivityForm({ activities, setActivities }) {

    const [isEditing, setIsEditing] = useState(true);

    const onActivityChange = (activityId, fieldName, newValue) => {
        setActivities(
            activities.map(existingActivity => existingActivity.id === activityId ?
                { ...existingActivity, [fieldName]: newValue } : existingActivity))
    }

    const handleSave = async (activity) => {
        await ActivityService.updateActivity(activity.id, activity);
        setIsEditing(false);
    }

//testsdf

    return (
        <div>
            {isEditing ?
            activities.map(activity => (
                <div key={activity.id}>
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

                    <button onClick={() => handleSave(activity)}>Save</button>
                </div>
            ))
            : activities.map(activity => (
                <div key={activity.id}>
                    <p>{activity.name}</p>
                    <p>{activity.time}</p>
                    <p>{activity.notes}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
            ))}
        </div>
    )


}

export default ActivityForm;