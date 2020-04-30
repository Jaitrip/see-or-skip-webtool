import React from 'react'
import CompareMovieVisualisation from './CompareMovieVisualisation'
import MovieTrailer from '../MovieTrailer'
import "../../styles/CompareMovieResultsStyles.css"
import MovieDetails from '../MovieDetails'

class CompareMovieResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstMovieName : this.props.firstMovieToCompare,
            firstMovieID : "",
            firstMovieTwitterSentiment : [],
            firstMovieYoutubeSentiment : [],
            secondMovieName : this.props.secondMovieToCompare,
            secondMovieID : "",
            secondMovieTwitterSentiment : [],
            secondMovieYoutubeSentiment : [],
        }

        // bind methods to the object
        this.handleFirstMovieSentiment = this.handleFirstMovieSentiment.bind(this)
        this.handleSecondMovieSentiment = this.handleSecondMovieSentiment.bind(this)
    }

    // callback function to save movie sentiment to state from a child component
    handleFirstMovieSentiment(movieID, twitterSentiment, youtubeSentiment) {
        this.setState({
            firstMovieID : movieID,
            firstMovieTwitterSentiment : twitterSentiment,
            firstMovieYoutubeSentiment : youtubeSentiment,
        })
    }

    // callback function to save movie sentiment to state from a child component
    handleSecondMovieSentiment(movieID, twitterSentiment, youtubeSentiment) {
        this.setState({
            secondMovieID : movieID,
            secondMovieTwitterSentiment : twitterSentiment,
            secondMovieYoutubeSentiment : youtubeSentiment,
        })
    }

    render() {
        return (
            <div>
                <div className="movieInformationArea">
                    <div>
                        <MovieDetails
                            handler={this.handleFirstMovieSentiment} 
                            component_location="compare"
                            movieName={this.state.firstMovieName} 
                        />
                    </div>
                    <div>
                        <MovieDetails
                            handler={this.handleSecondMovieSentiment} 
                            component_location="compare"
                            movieName={this.state.secondMovieName} 
                        />
                    </div>
                </div>
                <div className="trailers">
                    <div className="trailer">
                        <MovieTrailer 
                            movie_id={this.state.firstMovieID}
                        />
                    </div>
                    <div className="trailer">
                        <MovieTrailer 
                            movie_id={this.state.secondMovieID}
                        />
                    </div>
                </div>
                <div className="compareVisualisationArea">
                    <div className="visualisationSpacing">
                        <h3>Twitter Sentiment Comparison</h3>
                        <CompareMovieVisualisation 
                            firstMovieName={this.state.firstMovieName}
                            secondMovieName={this.state.secondMovieName}
                            firstMovieSentiment={this.state.firstMovieTwitterSentiment}
                            secondMovieSentiment={this.state.secondMovieTwitterSentiment}
                        />
                    </div>
                    <div className="visualisationSpacing">
                        <h3>Youtube Sentiment Comparison</h3>
                        <CompareMovieVisualisation 
                            firstMovieName={this.state.firstMovieName}
                            secondMovieName={this.state.secondMovieName}
                            firstMovieSentiment={this.state.firstMovieYoutubeSentiment}
                            secondMovieSentiment={this.state.secondMovieYoutubeSentiment}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default CompareMovieResults;