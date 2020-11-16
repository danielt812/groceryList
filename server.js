const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Import api routes
const items = require('./routes/api/items');

// Access to env variables
dotenv.config();

// Init express
const app = express();

// Express bodyparse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB config
const db = process.env.mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err));

// Use Routes
app.use('/api/items', items);

// If production build point to static files
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
