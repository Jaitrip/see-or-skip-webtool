import React from "react";
import MoviePoster from "../MoviePoster";
import axios from "axios"
import moment from "moment"
import "../../styles/HomePageStyles.css"

class CondensedMovieView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieName : this.props.movieName,
            releaseDate : moment(this.props.releaseDate).format("DD/MM/YYYY"),
            seeOrSkip : this.props.seeOrSkip,
            posterPath : ""
        }
    }

    // get poster path from tmdb api
    getPosterPath() {
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
                posterPath : apiResponse.data.results[0].poster_path,
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    // update state if props change
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                movieName : this.props.movieName,
                releaseDate : moment(this.props.releaseDate).format("DD/MM/YYYY"),
                seeOrSkip : this.props.seeOrSkip,
            })
        }
    }

    // get poster path when the component mounts
    componentDidMount() {
        this.getPosterPath()
    }
    
    render() {
        return (
            <div className="movieRow">
                <MoviePoster 
                    image_size={"w154"}
                    poster_path={this.state.posterPath}
                />
                <div className="movieDetails">
                    <h4>{this.state.movieName} </h4>
                    <h5>Release Date: {this.state.releaseDate}</h5>
                    <h5>{this.state.seeOrSkip}</h5>
                </div>

            </div>
        )
    }
}

export default CondensedMovieView;