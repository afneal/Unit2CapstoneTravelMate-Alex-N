import { useState } from 'react';

function List({ list = [], setList }) { //pass list and setList as props from packingList

    const [inputValue, setInputValue] = useState(""); //set emtpy string to hold values


    const handleAddItem = (event) => {
        event.preventDefault();
        const newItem = [...list]; //copy array without mutating original
        newItem.push(inputValue); //add user input to array
        setList(newItem); //set state of array to inform react of change
        setInputValue(""); //clear input box
    }



    const handleDeleteItem = (itemIndex) => { //item index as parameter to find correct item to delete
        const newList = [...list];
        newList.splice(itemIndex, 1); //splice away the item from the list at item index, 1 item
        setList(newList);

    }



    return (
        <>
            <div id='list'>

                <ul>
                    {list.map((item, itemIndex) => ( //map through array of items
                        <li key={itemIndex}>{item}<button className='delete-item-button' //map adds delete button to each item input
                            type="button"
                            onClick={() => handleDeleteItem(itemIndex)}>Delete Item</button></li>
                    ))}
                    <li>
                        <input
                            id="list-item"
                            name="list-item"
                            placeholder="Add an Item"
                            value={inputValue}
                            onChange={e => {
                                setInputValue(e.target.value) //sets input value state to the user typed input
                            }}
                        />
                    </li>
                </ul>
            </div>
            <button type="button" id="add-item-button" onClick={handleAddItem}>Add</button>
        </>
    )
}

export default List;