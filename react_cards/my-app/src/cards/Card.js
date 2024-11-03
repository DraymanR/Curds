import React, { useState } from 'react';

const colors = ['red', 'green', 'yellow', 'blue'];

const Card = ({ id, text, color, onDelete, onUpdate, onChangeColor }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(text);
    const [colorMenuOpen, setColorMenuOpen] = useState(false);

    const handleSaveClick = () => {
        onUpdate(id, newText);
        setIsEditing(false);
    };

    const toggleColorMenu = () => setColorMenuOpen(!colorMenuOpen);

    const handleColorChange = (newColor) => {
        onChangeColor(id, newColor);
        setColorMenuOpen(false);
    };

    return (
        <div style={{
            backgroundColor: color,
            padding: '20px',
            margin: '10px',
            width: '150px',
            height: '100px',
            borderRadius: '5px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {isEditing ? (
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onBlur={handleSaveClick}
                    autoFocus
                    style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'white' }}
                />
            ) : (
                <p onClick={() => setIsEditing(true)} style={{ color: 'white', cursor: 'pointer' }}>{text}</p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={toggleColorMenu} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>🎨</button>
                <button onClick={() => onDelete(id)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>🗑️</button>
            </div>

            {colorMenuOpen && (
                <div style={{ position: 'absolute', bottom: '40px', left: '10px', display: 'flex', gap: '5px' }}>
                    {colors.map((clr) => (
                        <button
                            key={clr}
                            onClick={() => handleColorChange(clr)}
                            style={{
                                backgroundColor: clr,
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Card;
