import { useState } from 'react'
import List from "../planner-components/List";
import SubmitButton from "../planner-components/SubmitButton";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PackingList({ packingList, setPackingList }) { //PackingList function is child of parent App.jsx, props coming from App into PackingList
    const [list, setList] = useState([]); //set emtpy array


    const handleSubmit = (event) => {
        event.preventDefault();
        setPackingList([...packingList, list]);
        setList([]);
        toast.success("Packing List Successfully Saved!");

    }



    return (

        //pass in List and SubmitButton child components, passing {list} and {setList} props data to child <List> component
        <>


            <div className='packing-list-input-container'>
                <h1 className='packing-list-title'>Packing List</h1>

                <form className='packing-list-form' >
                    <List list={list} setList={setList} />

                    <SubmitButton onClick={handleSubmit} label="Save Packing List" className='packing-list-submit-button' />
                </form>
            </div >
        </>//SubmitButton child component is receiving 3 props (onClick, label, className) from parent ReminderList
    )
}

export default PackingList;



