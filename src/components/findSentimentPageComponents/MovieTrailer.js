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

    getVideoID() {
        if (this.state.movieId !== null) {
            const apiUrl = "http://api.themoviedb.org/3/movie/" + this.state.movieId + "/videos?api_key=146fa0756d99220f8811aceb8a865301"
            console.log(apiUrl)
            axios.get(apiUrl)
            .then(apiResponse => {
                console.log(apiResponse)
                this.setState({
                    videoId : apiResponse.data.results[apiResponse.data.results.length - 1].key
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    onReady(event) {
        event.target.pauseVideo()
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                movieId : this.props.movie_id
            })
            this.getVideoID()
        }
    }

    componentDidMount() {
        this.getVideoID();
    }

    render() {
        const options = {
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 1
            }
        }

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