const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
let data = [{ 'id': 1, 'text': 'aaaa', 'color': 'red' }, { 'id': 2, 'text': 'bbbb', 'color': 'red' }, { 'id': 3, 'text': 'cccc', 'color': 'red' }, { 'id': 4, 'text': 'dddd', 'color': 'red' }]

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

async function createCard(cardData) {
    try {
        const newCard = { ...cardData, "id": Number(cardData.id) }
        const newData = [...new Set([...data, newCard])]
        data = newData
        return;
    } catch (error) {
        throw new Error('Error creating book:', error);
    }
}

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Sample route for GET request
app.get('/api/data', (req, res) => {
    res.json(data);
});
app.post('/api/data', (req, res) => {
    createCard(req.body)
    res.json(data);
});

app.delete('/api/data/:id', (req, res) => {
    const id = Number(req.params.id)
    const newData = data.filter(item => item.id !== id)
    data = newData;
    res.json(data);
});

app.put('/api/data/:id', (req, res) => {
    const id = Number(req.params.id)
    const newCard = req.body
    const newData = data.map(card => (card.id == id ? { ...card, ...newCard } : card));
    data = newData;
    res.json(data);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});