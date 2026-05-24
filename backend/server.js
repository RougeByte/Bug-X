const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Init Middleware
// This line allows our server to accept JSON data in the body of requests.
// THIS IS THE LIKELY SOURCE OF THE ERROR. It should just be express.json().
app.use(express.json()); 
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bugs', require('./routes/bugs'));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../frontend/build'));

    // Serve the index.html file for all other routes
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));