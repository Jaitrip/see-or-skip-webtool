import React from "react"
import axios from "axios"
import moment from "moment"
import "../../styles/HomePageStyles.css"
import MoviePoster from "../MoviePoster"

class HomePageMovies extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            upcomingMovies : "",
        }
    }

    // sort movie array by date
    sortByDate(firstMovie, secondMovie) {
        return moment(firstMovie.release_date) - moment(secondMovie.release_date)
    }

    // get a list of upcoming movies and get 5 upcoming ones
    getUpcomingMovies() {
        axios.get("http://localhost:5000/movieSentiment/findMovieSentiment/")
        .then(apiResponse => {
            // sort movie array
            const sorted_movies = apiResponse.data.sort(this.sortByDate)

            // filter array by movies by movies that have been out for a month or less
            const upcomingMovies = sorted_movies.filter(function(movie) {
                return moment(movie.release_date) > moment().subtract(1, "months")
            })

            // save upcoming movies to the state
            this.setState({
                upcomingMovies : upcomingMovies.slice(0, 5)
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    // when component mounts, get upcoming movies
    componentDidMount() {
        this.getUpcomingMovies()
    }

    render() {
        if (this.state.upcomingMovies !== "") {
            return (
                <div className="homePage">
                    <h2>Featured Movies</h2>
                    <div className="tableDisplay">
                        <table>
                            <thead>
                                <tr>
                                    <th>Movie Poster</th>
                                    <th>Movie Title</th>
                                    <th>Release Date</th>
                                    <th>See Or Skip?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.upcomingMovies.map((row, index) => (
                                    <tr>
                                        <td><MoviePoster image_size={"w154"} movie_title={row.movie_name}/></td>
                                        <td>{row.movie_name}</td>
                                        <td>{moment(row.release_date).format("DD/MM/YYYY")}</td>
                                        <td>{row.see_or_skip}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
