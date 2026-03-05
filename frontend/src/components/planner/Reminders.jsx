import { useState } from 'react'
import List from "../planner-components/List";
import SubmitButton from "../planner-components/SubmitButton";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReminderList({ reminderList, setReminderList }) { //ReminderList function is child of parent App.jsx, props coming from App into ReminderList
    const [list, setList] = useState([]) //set list to empty array

    const handleSubmit = (event) => {
        event.preventDefault();
        setReminderList([...reminderList, list]);
        setList([])
        toast.success("Reminders List Successfully Saved!");
    }
    return (//pass in List and SubmitButton child components, passing {list} and {setList} props data to child <List> component
        <>

            <div className='reminder-list-input-container'>
                <h1 className="reminder-list-title">Important Reminders</h1>

                <form className="reminder-list-form">
                    <List list={list} setList={setList} />
                    <SubmitButton onClick={handleSubmit} label="Save Reminder List" className="reminder-list-submit-button" />

                </form>

            </div>
        </>//SubmitButton child component is receiving 3 props (onClick, label, className) from parent ReminderList
    )
}

export default ReminderList;




