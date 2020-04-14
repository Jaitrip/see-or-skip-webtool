import React from "react"
import axios from "axios"
import YouTube from "react-youtube"

class MovieTrailer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieId : this.props.movie_id,
            videoId : ""
            
        }
    }

    // get the youtube id for the latest movie trailer
    getVideoID() {
        if (this.state.movieId !== null) {
            const apiUrl = "http://api.themoviedb.org/3/movie/" + this.state.movieId + "/videos?api_key=146fa0756d99220f8811aceb8a865301"

            axios.get(apiUrl)
            .then(apiResponse => {
                this.setState({
                    // get latest trailer added to the list of trailers
                    videoId : apiResponse.data.results[apiResponse.data.results.length - 1].key
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    // load the trailer paused
    onReady(event) {
        event.target.pauseVideo()
    }

    // save any changes to the movie name to state
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                movieId : this.props.movie_id
            })
            this.getVideoID()
        }
    }

    // when the component mounts, get the movie id
    componentDidMount() {
        this.getVideoID();
    }

    render() {
        // video rendering options
        const options = {
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 1
            }
        }

        //only load the component if the video id is not null
        if (this.state.videoId !== "") {
            return (
                <YouTube 
                    videoId={this.state.videoId}
                    opts={options}
                    onReady={this.onReady} 
                />
            )
        } else {
            return (
                <h3>No Trailer Yet</h3>
            )
        }
    }
}

export default MovieTrailer