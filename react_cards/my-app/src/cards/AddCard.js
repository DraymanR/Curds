import React, { useState } from 'react';
import axios from 'axios';

const AddCard = ({ onCardAdded }) => {
    const [id, setId] = useState('');
    const [text, setText] = useState('');
    const [color, setColor] = useState('#ffffff');
    const colors = ['red', 'green', 'yellow', 'blue'];

    const handleSubmit = (e) => {
        e.preventDefault();
        setColor(color)
        // New ticket data
        const newCard = { id, text, color };
        console.log(newCard);

        // Send POST request to add the ticket
        axios.post('http://localhost:5000/api/data', newCard)
            .then((response) => {
                console.log(response.data);

                // onCardAdded(response.data); // assuming the API returns the created ticket
                setId('')
                setText(''); // Clear input fields
                setColor('#ffffff');
            })
            .catch((error) => {
                console.error('Error adding ticket:', error);
            });
    };
    function handleOptionChange(changeEvent) {
        setColor(
            changeEvent.target.value
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{
            marginBottom: '20px',
            // border: '2px solid #2d0404',
            // width: '300px',
            // height: '120px',
        }}>

            <input
                id={id}
                type="number"
                placeholder="Enter ticket id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
            />
            <input
                id={id}
                type="text"
                placeholder="Enter ticket text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />
            <div style={{ marginTop: '10px' }}>
                {colors.map((clr) => (
                    <label key={clr} style={{ backgroundColor: clr }}>
                        <input
                            type='radio'
                            key={clr}
                            value={clr}
                            checked={color === clr}
                            onChange={handleOptionChange}
                            style={{
                                backgroundColor: clr,
                                width: '20px',
                                height: '20px',
                                margin: '0 5px',
                                borderRadius: '50%',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        />{clr}
                    </label>
                ))}
            </div>
            <button type="submit">Add Ticket</button>
        </form>
    );
};

export default AddCard;
