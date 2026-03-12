
import { useState } from "react";
import Card from "../../planner-components/Card";
import Button from "../../planner-components/Button";


function ItemCard({ getTrip, item }) {
    const [inputValue, setInputValue] = useState(item.name); //set emtpy string to hold values
    const [isEditing, setIsEditing] = useState(false);


    const handleDelete = async () => { //pass in itemId as variable name, cant pass item.id becasue that is a property access
        //function knows that itemId == item.id from the onClick event below that passes in item.id
        await fetch(`http://localhost:8080/api/lists/deleteItem/${item.id}`, {
            method: "DELETE"
        });

        await getTrip();
    }

    const handleToggleCompleted = async (itemId, completed) => {
        await fetch(`http://localhost:8080/api/lists/editItem/${item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: item.name, completed: completed })
        });
        await getTrip();
    }

    const handleEdit = async () => {
        await fetch(`http://localhost:8080/api/lists/editItem/${item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: inputValue, completed: item.completed })
        });
        await getTrip();
        setIsEditing(false);

    }

    return (
        <Card className="item-card">

            <li className="list-row">
                <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={e => {
                        handleToggleCompleted(item.id, e.target.checked)
                    }} />

                {isEditing ? (
                    <input
                        className="list-item-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                ) : (
                    <span className={`item-name ${item.completed ? "completed" : ""}`}
                    >{item.name}</span>
                )}
                <div className="list-icons">
                    {isEditing ? (

                        <Button
                            className="save-button"
                            onClick={handleEdit}
                            label="Save Item" />

                    ) : (

                        <Button
                            onClick={() => setIsEditing(true)}
                            className="list-edit-icon"
                            label="✎" />
                    )}



                    <Button
                        className="list-delete-icon"
                        onClick={handleDelete}
                        label="🗑️" />
                </div>
            </li>

        </Card >
    )

}

export default ItemCard;