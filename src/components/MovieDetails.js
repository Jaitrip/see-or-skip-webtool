import React from 'react';
import axios from 'axios';
import MovieVisualisation from './findSentimentPageComponents/MovieVisualisation.js'
import MoviePoster from './MoviePoster.js';
import "../styles/FindSentimentStyles.css"
import "../styles/CompareMovieResultsStyles.css"
import MovieTrailer from './MovieTrailer.js';
import moment from 'moment';

class MovieDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieFound: false,
      component_location : this.props.component_location,
      movieId: '',
      movieName : this.props.movieName,
      movieOverview : '',
      movieReleaseDate : '',
      reviewScore : '',
      twitterSentiment : [],
      youtubeSentiment : [],
      seeOrSkip: '',
      dateAnalysed: ''
    }
  }

  // get movie details from tmdb api
  getMovieInformation(movieName) {
    axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key : '146fa0756d99220f8811aceb8a865301',
        language : 'en-US',
        query : movieName,
        page : '1',
        include_adult : 'false' 
      }
    })
    .then(apiResponse => {
      if (apiResponse.data.results !== []) {
        var reviewScore = ""

        // if movie has reviews then save them
        if (Number(apiResponse.data.results[0].vote_average) !== 0) {
          reviewScore = apiResponse.data.results[0].vote_average
        } else {
          reviewScore = "No Reviews Yet"
        }

        this.setState({
          movieFound : true,
          movieId : apiResponse.data.results[0].id,
          movieName : apiResponse.data.results[0].title,
          movieOverview : apiResponse.data.results[0].overview,
          movieReleaseDate : apiResponse.data.results[0].release_date,
          reviewScore : reviewScore,
        })

        this.checkIfMovieAnalysed(this.state.movieId)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  // check if the movie has been analysed and stored in the db
  checkIfMovieAnalysed(movie_id) {
    axios.get("http://localhost:5000/movieSentiment/findMovieSentiment/" + movie_id)
    .then(apiResponse => {
      if (apiResponse.data !== null) {

        // if the movie was analysed less than 14 days ago, then save the sentiment to state
        if (moment().subtract(14, "days").startOf("day").isBefore(apiResponse.data.date_analysed)) {
          this.setState({
            movieFound : true,
            twitterSentiment : [Number(apiResponse.data.twitter_positive_comments), Number(apiResponse.data.twitter_neutral_comments), Number(apiResponse.data.twitter_negative_comments)],
            youtubeSentiment : [Number(apiResponse.data.youtube_positive_comments), Number(apiResponse.data.youtube_neutral_comments), Number(apiResponse.data.youtube_negative_comments)],
            seeOrSkip: apiResponse.data.see_or_skip,
            dateAnalysed: apiResponse.data.date_analysed
          })

          // callback to compare movies component if its being displayed on the compare page
          if (this.state.component_location === "compare") {
            this.props.handler(this.state.movieId, this.state.twitterSentiment, this.state.youtubeSentiment)
          }
        } else {
          // if movie has not been analysed, find sentiment
          this.findMovieSentiment(true)
        }
      } else {
        this.findMovieSentiment(false)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  // find the movie sentiment on youtube and twitter
  findMovieSentiment(isUpdate) {
    const api_url = "http://127.0.0.1:5000/see-or-skip/get_sentiment"
    const data = JSON.stringify({
      movie_name : this.state.movieName
    })

    // make a post request to the sentiment analysis api with the movie name
    axios.post(api_url, data ,{
      headers: {
        'Content-Type': 'application/json'
      }
    })  
    .then(apiResponse => {  
      // save movie sentiment
      this.setState({
        twitterSentiment : [Number(apiResponse.data.twitter_positive_comments), Number(apiResponse.data.twitter_neutral_comments), Number(apiResponse.data.twitter_negative_comments)],
        youtubeSentiment : [Number(apiResponse.data.youtube_positive_comments), Number(apiResponse.data.youtube_neutral_comments), Number(apiResponse.data.youtube_negative_comments)],
        dateAnalysed : new Date()
      })

      // if the component is being displayed on the compare page, call back to the parent component
      if (this.state.component_location === "compare") {
        this.props.handler(this.state.movieId, this.state.twitterSentiment, this.state.youtubeSentiment)        
      }

      // calculate see or skip
      const totalPositive = Number(this.state.twitterSentiment[0]) + Number(this.state.youtubeSentiment[0])
      const totalNegative = Number(this.state.twitterSentiment[2]) + Number(this.state.youtubeSentiment[2])

      if (totalPositive > totalNegative) {
        this.setState({
          seeOrSkip : "See!"
        })
      } else {
        this.setState({
          seeOrSkip : "Skip!"
        })
      }

      // save / update movie sentiment
      if (isUpdate) {
        this.updateMovieSentiment()
      } else {  
        this.addMovieSentimentToDatabase()
      }

    })
    .catch(error => {
      console.log(error.response)
    })
  }

  // add a new movie sentiment to the database
  addMovieSentimentToDatabase() {
    // make a post request to the backend server with movie details
    const api_url = "http://localhost:5000/movieSentiment/saveMovieSentiment"
    const data = JSON.stringify({
      movie_id : this.state.movieId,
      movie_name : this.state.movieName,
      release_date : this.state.movieReleaseDate,
      twitter_positive_comments : this.state.twitterSentiment[0],
      twitter_negative_comments : this.state.twitterSentiment[2],
      twitter_neutral_comments : this.state.twitterSentiment[1],
      youtube_positive_comments : this.state.youtubeSentiment[0],
      youtube_negative_comments : this.state.youtubeSentiment[2],
      youtube_neutral_comments : this.state.youtubeSentiment[1],
      see_or_skip : this.state.seeOrSkip,
      date_analysed : this.state.dateAnalysed
    })
    axios.post(api_url, data ,{
      headers: {
        'Content-Type': 'application/json'
      }
    })  
    .then(apiResponse => console.log(apiResponse))
    .catch(error => {
      console.log(error.response)
    })
  }

  // update movie sentiment in db
  updateMovieSentiment() {
    const api_url = "http://localhost:5000/movieSentiment/updateMovieSentiment"
    const data = JSON.stringify({
      movie_id : this.state.movieId,
      movie_name : this.state.movieName,
      release_date : this.state.movieReleaseDate,
      twitter_positive_comments : this.state.twitterSentiment[0],
      twitter_negative_comments : this.state.twitterSentiment[2],
      twitter_neutral_comments : this.state.twitterSentiment[1],
      youtube_positive_comments : this.state.youtubeSentiment[0],
      youtube_negative_comments : this.state.youtubeSentiment[2],
      youtube_neutral_comments : this.state.youtubeSentiment[1],
      see_or_skip : this.state.seeOrSkip,
      date_analysed : this.state.dateAnalysed
    })

    // make post request to backend server to update the movie sentiment
    axios.post(api_url, data ,{
      headers: {
        'Content-Type': 'application/json'
      }
    })  
    .then(apiResponse => console.log(apiResponse))
    .catch(error => {
      console.log(error.response)
    })
  }

  // when the component mounts, get the movie sentiment
  componentDidMount() {
    this.getMovieInformation(this.state.movieName)
  }

  render() {
    // if component is being displayed on the find sentiment page, display these objects
    if (this.state.component_location === "find" && this.state.movieFound === true) {
      return (
        <div>
          <div className="findSentimentResults">
            <h3>{this.state.movieName}</h3>
            <div className="findSentimentMovieDetails">
              <div className="movieArea">
                <MoviePoster 
                  image_size={"w342"}
                  movie_title={this.state.movieName}
                />
                <div className="movieInformation">
                  <p>{this.state.movieOverview}</p>
                  <p>Release Date: {moment(this.state.movieReleaseDate).format("DD/MM/YYYY")}</p>
                  <p>Review Score: {this.state.reviewScore}</p>
                  <p>You should probably: {this.state.seeOrSkip}</p>
                </div>
              </div>
            </div>
            <div className="movieTrailer">
              <MovieTrailer 
                movie_id={this.state.movieId}
              />
            </div>
            <div className="visualisationArea">
              <MovieVisualisation
                twitter_sentiment={this.state.twitterSentiment}
                youtube_sentiment={this.state.youtubeSentiment}
              />
            </div>
          </div>
       </div>
     )
    } else if (this.state.component_location === "compare" && this.state.movieFound === true) {
      // if component is being displayed on the compare page, display these components 
      return (
        <div>
            <h3>{this.state.movieName}</h3>
            <div className="movieArea">
                <MoviePoster 
                    image_size={"w185"}
                    movie_title={this.state.movieName}
                />
                <div className="compareMovieInformation">
                    <p>{this.state.movieOverview}</p>
                    <p>Release Date: {moment(this.state.movieReleaseDate).format("DD/MM/YYYY")}</p>
                    <p>Review Score: {this.state.reviewScore}</p>
                    <p>You should probably: {this.state.seeOrSkip}</p>
                </div>
            </div>
        </div>
      )
    } else {
      return (
        <h3>Movie Not Found</h3>
      )
    }
  }
}

export default MovieDetails;