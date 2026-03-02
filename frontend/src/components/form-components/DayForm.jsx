


function DayForm({ tripId, days, setDays }) {

    const [isEditing, setIsEditing] = useState(true);
    const [newDay, setNewDay] = useState({ city: "", date: "" })


    const onDayChange = (dayId, fieldName, newValue) => {
        setDays(
            days.map(existingDay => existingDay.id === dayId ?
                { ...existingDay, [fieldName]: newValue } : existingDay))
    }

    const handleSaveUpdateDay = async (dayId) => {
        try {
            const updatedDay = await Promise.all(
                days.map(day =>
                    `http://localhost:8080/api/days/editDay/${day.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(day),
                }).then(response => response.json())
            );
            setDays(updatedDay);
            setIsEditing(false);
        } catch (error) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || `ERROR - Status ${response.status}`,
            );
        }
    }



    return (
        <div>

            {days.map(day => (
                <div key={day.id}>
                    {isEditing ? (

                        <>
                            <input
                                value={day.city}
                                placeholder="City"
                                onChange={e => onDayChange(day.id, 'city', e.target.value)}
                            />

                            <input
                                value={day.date}
                                type="date"
                                placeholder="Date"
                                onChange={e => onDayChange(day.id, 'date', e.target.value)}
                            />
                        <button onClick={() => handleSaveUpdateDay(day)}>Save Day</button>
                        <button onClick={() => setIsEditingDayId(null)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p>{day.city}</p>
                            <p>{day.date}</p>


                            <button onClick={() => setIsEditingDayId(day.id)}>Edit Day</button>
                        </>
                    )}
                </div>
            ))}

            {isEditing && (
                <div>
                    <input
                        placeholder="City"
                        value={newDay.city}
                        onChange={(e => setNewDay({ ...newDay, city, e.target.value }))}
                    />
                    <input
                        placeholder="Date"
                        value={newDay.date}
                        onChange={(e => setNewDay({ ...newDay, date, e.target.value }))}
                    />
                    <button onClick={() => handleAddNewDay(tripId)}>Add Day </button>
                </div>
            )}

           
        </div>
    );
}




export default DayForm;