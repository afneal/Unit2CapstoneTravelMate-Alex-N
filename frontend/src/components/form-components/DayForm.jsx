


function DayForm({ days, setDays }) {

const [isEditing, setIsEditing] = useState(true);


    const onDayChange = (dayId, fieldName, newValue) => {

        setDays(
            days.map(existingDay => existingDay.id === dayId ?
                { ...existingDay, [fieldName]: newValue } : existingDay))
    }
//testddddfdfdsfsdfgfgsgsdg
    const handleSave = async (day) => {
        await DayService.updateDay(day.id, day);
        setIsEditing(false);
    }



    return (
        <div>
            {isEditing ? 
            days.map(day => (
                <div key={day.id}>
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
                    <button onClick={() => handleSave(day)}>Save</button>

                </div>
            ))
        : days.map(day => (
            <div key={day.id}>
                <p>{day.city}</p>
                <p>{day.date}</p>
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
            ))}
        </div>
    )
}
        
    




export default DayForm;