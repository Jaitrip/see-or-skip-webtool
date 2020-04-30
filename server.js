// SOURCE : https://www.youtube.com/watch?v=7CqJlxBYj-M
// FUNCTION : Initalise Dependencies and setup the app
// STATUS : Changed parameters and modified the endpoint routes
// BEGIN

// Initialise dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require("path");

// Define app and port
const app = express();

app.use(cors());
app.use(express.json());

//Connect to mongo database
const uri = "mongodb+srv://see-or-skip-dev:development@seeorskipcluster-2etjz.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("connected");
})

app.use((request, result, next) => {
    result.header('Access-Control-Allow-Origin', '*');
    next();
});

//Set up routes
const movieSentimentRouter = require('./endpoint_routes/MovieSentimentRoute');
app.use('/movieSentiment', movieSentimentRouter);

const port = process.env.PORT || 5000;

//If in production, run built app
if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    app.get("*", (request, response) => {
        response.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

// Start up application
app.listen(port, () => {
    console.log("Server running");
});

// END