import React from "react";
import MoviePoster from "../MoviePoster";
import axios from "axios"
import "../../styles/HomePageStyles.css"

class CondensedMovieView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieName : this.props.movieName,
            releaseDate : this.props.releaseDate,
            seeOrSkip : this.props.seeOrSkip,
            posterPath : ""
        }
    }

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

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                movieName : this.props.movieName,
                releaseDate : this.props.releaseDate,
                seeOrSkip : this.props.seeOrSkip,
            })
        }
    }

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
                <h4>{this.state.movieName} </h4>
                <h5>Release Date: {this.state.releaseDate}</h5>
                <h5>{this.state.seeOrSkip}</h5>
            </div>
        )
    }
}

export default CondensedMovieView;