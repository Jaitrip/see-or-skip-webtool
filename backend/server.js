// Initialise dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Define app and port
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Connect to mongo database
const uri = "mongodb+srv://see-or-skip-dev:development@seeorskipcluster-2etjz.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("connected");
})

//Set up routes
const movieSentimentRouter = require('./endpoint_routes/MovieSentimentRoute');
app.use('/movieSentiment', movieSentimentRouter);

// Start up application
app.listen(port, () => {
    console.log("Server running");
});