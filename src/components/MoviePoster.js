import React from 'react';
import axios from "axios"

class MoviePoster extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            base_url : 'https://image.tmdb.org/t/p/',
            image_size : this.props.image_size,
            movie_title : this.props.movie_title,
            poster_path : ""
        }
    }

    // when component mounts, get poster path 
    componentDidMount() {
        this.getPosterPath()
    }

    // get poster path from tmdb api and save to state
    getPosterPath() {
        axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
                api_key : '146fa0756d99220f8811aceb8a865301',
                language : 'en-US',
                query : this.state.movie_title,
                page : '1',
                include_adult : 'false' 
            }
        })
        .then(apiResponse => {
            this.setState({
                poster_path : apiResponse.data.results[0].poster_path,
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    // save props update in state
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                image_size : this.props.image_size,
                movie_title : this.props.movie_title
            })
        }
    }
    
    // render movie poster
    render() {
        return (
            <img 
            src= {this.state.base_url + this.state.image_size + '/' + this.state.poster_path}
            />
        )
    }
}

export default MoviePoster;