



const onActivityChange = (dayIndex, activityIndex, fieldName, newValue) => {
        
        const daysCopy = [...days];
        const dayObjectCopy = {...days[dayIndex]};
        const activitiesCopy = [...dayObjectCopy.activities];
        const activityObjectCopy = {...activities[activityIndex]}

        activityObjectCopy[fieldName] = newValue;
        activitiesCopy[activityIndex] = activityObjectCopy; 

        const updatedDay = {...days[dayIndex], activities: activitiesCopy };
        daysCopy[dayIndex] = updatedDay
        setDays(daysCopy);  //update reacts state to let it know that data was updated to re-render that portion
    }

}



const fetchAllActivities = async () => {
        try {
            const response = await fetch(
                'http://localhost:8080/api/activities',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

        } catch (error) {
            errorData.message || 'ERROR - Status ${response.status}'
        }
        fetchAllActivities();
    }

    const addActivity = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/activities/addActivity/{dayId}', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
            });
            const savedActivity = await response.json();
            setActivities([...activities, savedActivity]);
        } catch (error) {
            errorData.message || `ERROR - Status ${response.status}`
        }
    };