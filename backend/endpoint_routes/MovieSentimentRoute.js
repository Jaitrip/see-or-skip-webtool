const movieSentimentRouter = require('express').Router();
let MovieSentiment = require('../schemas/movie-sentiment-schema');

movieSentimentRouter.route('/findMovieSentiment').get((request, result) => {
    MovieSentiment.find().then(movieSentiments => result.json(movieSentiments)).catch(error => result.status(400).json('Error encountered:' + error))
})

movieSentimentRouter.route('/findMovieSentiment/:movie_id').get((request, result) => {
    const request_movie_id = request.params.movie_id
    MovieSentiment.findOne({movie_id : request_movie_id}).then(movieSentiment => result.json(movieSentiment)).catch(error => result.status(400).json('Error encountered:' + error))
})

movieSentimentRouter.route('/findMovieSentiment/:movie_id').delete((request, result) => {
    const delete_movie_id = request.params.movie_id
    MovieSentiment.findOneAndDelete(delete_movie_id).then(() => result.json("movie sentiment deleted")).catch(error => result.status(400).json('Error encountered:' + error))
})

movieSentimentRouter.route('/saveMovieSentiment').post((request, result) => {
    const movie_id = request.body.movie_id
    const movie_name = request.body.movie_name
    const release_date = request.body.release_date
    const twitter_positive_comments = Number(request.body.twitter_positive_comments)
    const twitter_negative_comments = Number(request.body.twitter_negative_comments)
    const twitter_neutral_comments = Number(request.body.twitter_neutral_comments)
    const youtube_positive_comments = Number(request.body.youtube_positive_comments)
    const youtube_negative_comments = Number(request.body.youtube_negative_comments)
    const youtube_neutral_comments = Number(request.body.youtube_neutral_comments)
    const see_or_skip = request.body.see_or_skip
    const date_analysed = Date.parse(request.body.date_analysed)

    const newMovieSentiment = new MovieSentiment({
        movie_id,
        movie_name,
        release_date,
        twitter_positive_comments,
        twitter_negative_comments,
        twitter_neutral_comments,
        youtube_positive_comments,
        youtube_negative_comments,
        youtube_neutral_comments,
        see_or_skip,
        date_analysed
    });

    newMovieSentiment.save().then(() => result.json('new movie added')).catch(error => result.status(400).json('Error encountered:' + error))
});

module.exports = movieSentimentRouter;