import { useState } from 'react';
import Button from './Button';
import ItemCard from '../form-components/Lists/ItemCard';

function List({ list, getTrip, tripId }) {
    if (!list || list.id == null) return null; //wait for backend to initialize empty list before getting list.id (fix undefined list.id responses)

    const [inputValue, setInputValue] = useState("");

    const handleAddItem = async () => {
        if (!inputValue.trim()) return; //prevent empty items submitting


        await fetch(`http://localhost:8080/api/lists/${list.id}/addItem`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: inputValue, completed: false })
        });

        await getTrip();
        setInputValue("");

    }




    return (
        <div className="list-card">
            <div className="list-title">
                <h2>{list.listType}</h2>
            </div>
            <ul className="list-items">
                {(list.items || []).map((item) => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        getTrip={getTrip}
                    />


                ))}
            </ul>
            <div className="add-item">
                <input
                    value={inputValue}
                    placeholder="Add Item"
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <Button
                    className="add-button"
                    onClick={handleAddItem}
                    label="Add Item" />
            </div>
        </div>


    )
}

export default List;



