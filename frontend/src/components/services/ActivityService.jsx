


function ActivityService() {


    const fetchAllActivities = async () => {
        try {
            const response = await fetch(
                'http://localhost:8080/api/activities',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                return await response.json();

        } catch (error) {
            errorData.message || 'ERROR - Status ${response.status}'
        }
    }

    const updateActivity = async () => {
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

}

export default ActivityService;