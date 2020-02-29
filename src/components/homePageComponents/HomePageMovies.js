import React from "react"
import axios from "axios"
import CondensedMovieView from "./CondensedMovieView"
import "../../styles/HomePageStyles.css"

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
          console.log(this.state.upcomingMovies)
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getUpcomingMovies()
    }

    render() {
        if (this.state.upcomingMovies !== "") {
            return (
                <div className="rowDisplay">
                    <CondensedMovieView 
                        movieName={this.state.upcomingMovies[0].movie_name}
                        releaseDate={this.state.upcomingMovies[0].release_date}
                        seeOrSkip={this.state.upcomingMovies[0].see_or_skip}
                    />

                    <CondensedMovieView 
                        movieName={this.state.upcomingMovies[1].movie_name}
                        releaseDate={this.state.upcomingMovies[1].release_date}
                        seeOrSkip={this.state.upcomingMovies[1].see_or_skip}
                    />

                    <CondensedMovieView 
                        movieName={this.state.upcomingMovies[2].movie_name}
                        releaseDate={this.state.upcomingMovies[2].release_date}
                        seeOrSkip={this.state.upcomingMovies[2].see_or_skip}
                    />

                    <CondensedMovieView 
                        movieName={this.state.upcomingMovies[3].movie_name}
                        releaseDate={this.state.upcomingMovies[3].release_date}
                        seeOrSkip={this.state.upcomingMovies[3].see_or_skip}
                    />

                    <CondensedMovieView 
                        movieName={this.state.upcomingMovies[4].movie_name}
                        releaseDate={this.state.upcomingMovies[4].release_date}
                        seeOrSkip={this.state.upcomingMovies[4].see_or_skip}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Getting Upcoming Movies!</h2>
                </div>
            )
        }
    }
}

export default HomePageMovies;
