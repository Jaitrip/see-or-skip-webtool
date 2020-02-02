const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSentimentSchemea = new Schema({
    movie_id: {type: String, required: true},
    movie_name: {type: String, required: true},
    release_date: {type: String, required: true},
    positive_comments: {type: Number, required: true},
    negative_comments: {type: Number, required: true},
    neutral_comments: {type: Number, required: true},
    see_or_skip: {type: String, required: true},
    date_analysed: {type: Date, required: true}
})

const MovieSentiment = mongoose.model('Movie Sentiment', movieSentimentSchemea);

module.exports = MovieSentiment;