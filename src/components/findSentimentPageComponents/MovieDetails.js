import React from 'react';
import axios from 'axios';
import MovieVisualisation from './MovieVisualisation'
import MoviePoster from '../MoviePoster';
import "../../styles/FindSentimentStyles.css"
import MovieTrailer from './MovieTrailer';

class MovieDetails extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
      movie_found: false,
      movie_id: '',
      movie_name : this.props.movieName,
      movie_overview : '',
      movie_release_date : '',
      poster_path : '',
      twitter_positive_comments: '',
      twitter_negative_comments: '',
      twitter_neutral_comments: '',
      youtube_positive_comments: '',
      youtube_negative_comments: '',
      youtube_neutral_comments: '',
      see_or_skip: '',
      date_analysed: ''
     }
   }

    getMovieInformation(movieName) {
      axios.get("https://api.themoviedb.org/3/search/movie", {
       params: {
         api_key : '146fa0756d99220f8811aceb8a865301',
         language : 'en-US',
         query : movieName,
         page : '1',
         include_adult : 'false' 
       }
     }).then(apiResponse => {
        const releaseDate = apiResponse.data.results[0].release_date.split("-")
        const formattedReleaseDate = releaseDate[2] + "/" + releaseDate[1] + "/" + releaseDate[0]

       this.setState({
        movie_id : apiResponse.data.results[0].id,
        movie_name : apiResponse.data.results[0].title,
        movie_overview : apiResponse.data.results[0].overview,
        movie_release_date : formattedReleaseDate,
        poster_path : apiResponse.data.results[0].poster_path
       })
       this.checkIfMovieAnalysed(this.state.movie_id)

      })
     .catch(error => {
       console.log(error)
     })
    }

    checkIfMovieAnalysed(movie_id) {
      axios.get("http://localhost:5000/movieSentiment/findMovieSentiment/" + movie_id)
      .then(apiResponse => {
        if (apiResponse.data !== null) {
          this.setState({
            movie_found : true,
            twitter_positive_comments: apiResponse.data.twitter_positive_comments,
            twitter_negative_comments: apiResponse.data.twitter_negative_comments,
            twitter_neutral_comments: apiResponse.data.twitter_neutral_comments,
            youtube_positive_comments: apiResponse.data.youtube_positive_comments,
            youtube_negative_comments: apiResponse.data.youtube_negative_comments,
            youtube_neutral_comments: apiResponse.data.youtube_neutral_comments,
            see_or_skip: apiResponse.data.see_or_skip,
            date_analysed: apiResponse.data.date_analysed
          })
        } else {
          this.findMovieSentiment(this.state.movieName)
        }
      })
      .catch(error => {
        console.log(error)
      })
    }

    findMovieSentiment() {
      const api_url = "http://127.0.0.1:5000/see-or-skip/get_sentiment_classification"
      const data = JSON.stringify({
        movie_name : this.state.movie_name
      })
      axios.post(api_url, data ,{
        headers: {
          'Content-Type': 'application/json'
        }
      })  
      .then(apiResponse => {  
        this.setState({
          twitter_positive_comments: apiResponse.data.twitter_positive_comments,
          twitter_negative_comments: apiResponse.data.twitter_negative_comments,
          twitter_neutral_comments : apiResponse.data.twitter_neutral_comments,
          youtube_positive_comments: apiResponse.data.youtube_positive_comments,
          youtube_negative_comments: apiResponse.data.youtube_negative_comments,
          youtube_neutral_comments : apiResponse.data.youtube_neutral_comments,
          date_analysed : new Date()
        })

        const totalPositive = Number(this.state.twitter_positive_comments) + Number(this.state.youtube_positive_comments)
        const totalNegative = Number(this.state.twitter_negative_comments) + Number(this.state.youtube_negative_comments)

        if (totalPositive > totalNegative) {
          this.setState({
            see_or_skip : "See!"
          })
        } else {
          this.setState({
            see_or_skip : "Skip!"
          })
        }
        this.addMovieSentimentToDatabase()
      })
      .catch(error => {
        console.log(error.response)
      })
    }

    addMovieSentimentToDatabase() {
      const api_url = "http://localhost:5000/movieSentiment/saveMovieSentiment"
      const data = JSON.stringify({
        movie_id : this.state.movie_id,
        movie_name : this.state.movie_name,
        release_date : this.state.movie_release_date,
        twitter_positive_comments : this.state.twitter_positive_comments,
        twitter_negative_comments : this.state.twitter_negative_comments,
        twitter_neutral_comments : this.state.twitter_neutral_comments,
        youtube_positive_comments : this.state.youtube_positive_comments,
        youtube_negative_comments : this.state.youtube_negative_comments,
        youtube_neutral_comments : this.state.youtube_neutral_comments,
        see_or_skip : this.state.see_or_skip,
        date_analysed : this.state.date_analysed
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

    componentDidMount() {
      this.getMovieInformation(this.state.movie_name)
    }

   render() {
     return (
        <div>
          <h1>This is what people think about:</h1>
          <div className="findSentimentResults">
            <div className="findSentimentMovieDetails">
              <div className="movieArea">
                <MoviePoster 
                  image_size={"w185"}
                  poster_path={this.state.poster_path}
                />
                <div className="movieInformation">
                  <h3>{this.state.movie_name}</h3>
                  <p>{this.state.movie_overview}</p>
                  <p>Release Date: {this.state.movie_release_date}</p>
                  <p>You should probably: {this.state.see_or_skip}</p>
                </div>
              </div>
            </div>
            <div className="movieTrailer">
              <MovieTrailer 
                movie_id={this.state.movie_id}
              />
            </div>
            <div className="visualisationArea">
              <div className="visualisationSpacing">
                <h3>Twitter Sentiment Breakdown</h3>
                <MovieVisualisation
                  date_analysed={this.state.date_analysed}
                  positive_comments={this.state.twitter_positive_comments}
                  negative_comments={this.state.twitter_negative_comments}
                  neutral_comments={this.state.twitter_neutral_comments}
                />
              </div>
              <div className="visualisationSpacing">
                <h3>Youtube Sentiment Breakdown</h3>
                <MovieVisualisation
                  date_analysed={this.state.date_analysed}
                  positive_comments={this.state.youtube_positive_comments}
                  negative_comments={this.state.youtube_negative_comments}
                    neutral_comments={this.state.youtube_neutral_comments}
                />
              </div>
            </div>
          </div>
       </div>
     )
   }
}

export default MovieDetails;