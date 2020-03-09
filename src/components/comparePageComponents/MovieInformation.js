import React from 'react'
import MoviePoster from '../MoviePoster.js'
import axios from 'axios'
import MovieTrailer from '../findSentimentPageComponents/MovieTrailer.js'

class MovieInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieId : "",
            movieName : this.props.movieName,
            movieOverview : "",
            movieReleaseDate : "",
            posterPath : '',
            twitterPositiveComments: '',
            twitterNegativeComments: '',
            twitterNeutralComments: '',
            youtubePositiveComments: '',
            youtubeNegativeComments: '',
            youtubeNeutralComments: '',
            seeOrSkip: '',
            dateAnalysed: ''
        }
    }

    getMovieInformation() {
        axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
                api_key : '146fa0756d99220f8811aceb8a865301',
                language : 'en-US',
                query : this.state.movieName,
                page : '1',
                include_adult : 'false' 
            }
        })
        .then(apiResponse => {
            this.setState({
                movieId : apiResponse.data.results[0].id,
                movieName : apiResponse.data.results[0].title,
                movieOverview : apiResponse.data.results[0].overview,
                movieReleaseDate : apiResponse.data.results[0].release_date,
                posterPath : apiResponse.data.results[0].poster_path,
            })
            this.getMovieSentiment()
        })
        .catch(error => {
            console.log(error)
        })
    }

    getMovieSentiment() {
        axios.get("http://localhost:5000/movieSentiment/findMovieSentiment/" + this.state.movieId)
        .then(apiResponse => {
            if (apiResponse.data !== null) {
                this.setState({
                    twitterPositiveComments: apiResponse.data.twitter_positive_comments,
                    twitterNegativeComments: apiResponse.data.twitter_negative_comments,
                    twitterNeutralComments: apiResponse.data.twitter_neutral_comments,
                    youtubePositiveComments: apiResponse.data.youtube_positive_comments,
                    youtubeNegativeComments: apiResponse.data.youtube_negative_comments,
                    youtubeNeutralComments: apiResponse.data.youtube_neutral_comments,
                    seeOrSkip: apiResponse.data.see_or_skip,
                    dateAnalysed: apiResponse.data.date_analysed
                })
            }
            this.props.handler(this.state.twitterPositiveComments, this.state.twitterNegativeComments, this.state.twitterNeutralComments, this.state.youtubePositiveComments, this.state.youtubeNegativeComments, this.state.youtubeNeutralComments) 
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getMovieInformation()
    }

    render() {
        return (
            <div>
                <div className="movieArea">
                    <MoviePoster 
                        image_size={"w185"}
                        poster_path={this.state.posterPath}
                    />
                    <div className="movieInformation">
                        <h3>{this.state.movieName}</h3>
                        <p>{this.state.movieOverview}</p>
                        <p>Release Date: {this.state.movieReleaseDate}</p>
                        <p>See or Skip?: {this.state.seeOrSkip}</p>
                    </div>
                </div>
                <MovieTrailer 
                    movie_id={this.state.movieId}
                />
            </div>
        )
    }
}

export default MovieInformation;