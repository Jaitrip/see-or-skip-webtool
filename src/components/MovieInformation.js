import React from 'react'
import MoviePoster from './MoviePoster.js'
import axios from 'axios'

class MovieInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieId : "",
            movieName : this.props.movieName,
            movieOverview : "",
            movieReleaseDate : "",
            posterPath : '',
            positiveComments: '',
            negativeComments: '',
            neutralComments: '',
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
                    positiveComments: apiResponse.data.positive_comments,
                    negativeComments: apiResponse.data.negative_comments,
                    neutralComments: apiResponse.data.neutral_comments,
                    seeOrSkip: apiResponse.data.see_or_skip,
                    dateAnalysed: apiResponse.data.date_analysed
                })
            }
            this.props.handler(this.state.positiveComments, this.state.negativeComments, this.state.neutralComments) 
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
                <MoviePoster 
                    image_size={"w185"}
                    poster_path={this.state.posterPath}
                />
                <h2>{this.state.movieName}</h2>
                <h3>Synopsis: {this.state.movieOverview}</h3>
                <h3>Release Date: {this.state.movieReleaseDate}</h3>
                <h3>See or Skip?: {this.state.seeOrSkip}</h3>
            </div>
        )
    }
}

export default MovieInformation;