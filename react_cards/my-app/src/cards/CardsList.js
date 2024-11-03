import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import AddCard from './AddCard';

const CardList = () => {
    const [cards, setCards] = useState([]);
    const [isAdd, setIsAdd] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/data')
            .then((response) => {
                setCards(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [cards]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/data/${id}`)
            .then(() => {
                setCards((prevCards) => prevCards.filter((card) => card.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting card:', error);
            });
    };

    const handleUpdate = (id, newText) => {
        axios.put(`http://localhost:5000/api/data/${id}`, { text: newText })
            .then((response) => {
                setCards((prevCards) =>
                    prevCards.map((card) =>
                        card.id === id ? { ...card, text: response.data.text } : card
                    )
                );
            })
            .catch((error) => {
                console.error('Error updating card:', error);
            });
    };

    const handleChangeColor = (id, newColor) => {
        axios.put(`http://localhost:5000/api/data/${id}`, { color: newColor })
            .then((response) => {
                setCards((prevCards) =>
                    prevCards.map((card) =>
                        card.id === id ? { ...card, color: response.data.color } : card
                    )
                );
            })
            .catch((error) => {
                console.error('Error changing color:', error);
            });
    };

    const handleCardAdded = (newCard) => {
        setCards((prevCards) => [...prevCards, newCard]);
        setIsAdd(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        text={card.text}
                        color={card.color}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                        onChangeColor={handleChangeColor}
                    />
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                <h4>Add new Card </h4>
                {isAdd ? (
                    <div>
                        <button onClick={() => setIsAdd(false)}style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>➖</button>
                        <AddCard onCardAdded={handleCardAdded} />
                    </div>
                ) : (
                    <button onClick={() => setIsAdd(true)}style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>➕</button>
                )}
            </div>
        </div>
    );
};

export default CardList;
