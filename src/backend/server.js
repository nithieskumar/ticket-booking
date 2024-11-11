const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://nithies60:3RmvG7oPngMvfEaJ@cluster0.pct0dve.mongodb.net/MOVIES', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
const Order = mongoose.model('Order', new mongoose.Schema({
    movie: String,
    day: String,
    hour: String,
    seats: [String],
    name: String,
    cpf: String
}));
app.post('/api/orders', async (req, res) => {
    const { movie, day, hour, seats, name, cpf } = req.body;
    try {
        console.log(req.body)
        const savedOrder = await Order(req.body);
        savedOrder.save()
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
