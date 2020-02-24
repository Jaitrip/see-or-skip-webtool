import React from "react"
import axios from "axios"
import CondensedMovieView from "./CondensedMovieView"

class HomePageMovies extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            upcomingMovies : ""
        }
    }

    sortByDate(firstMovie, secondMovie) {
        const firstMovieReleaseDate = new Date(firstMovie.release_date).getTime()
        const secondMovieReleaseDate = new Date(secondMovie.release_date).getTime()
      
        return firstMovieReleaseDate - secondMovieReleaseDate
    }

    getUpcomingMovies() {
        axios.get("http://localhost:5000/movieSentiment/findMovieSentiment/")
        .then(apiResponse => {
          this.setState({
            upcomingMovies : apiResponse.data.sort(this.sortByDate).slice(0, 5)
          })
          console.log(this.state.upcomingMovies[0].movie_name)
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getUpcomingMovies()
    }

    render() {
        return (
            <div>
                <h2>{this.state.upcomingMovies}</h2>
            </div>
        )
    }
}

export default HomePageMovies;