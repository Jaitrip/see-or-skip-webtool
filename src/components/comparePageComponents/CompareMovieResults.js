import React from 'react'
import MovieInformation from './MovieInformation'
import CompareMovieVisualisation from './CompareMovieVisualisation'
import "../../styles/CompareMovieResultsStyles.css"

class CompareMovieResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstMovieName : this.props.firstMovieToCompare,
            firstMovieTwitterPostivieComments : "",
            firstMovieTwitterNegativeComments : "",
            firstMovieTwitterNeutralComments : "",
            firstMovieYoutubePostivieComments : "",
            firstMovieYoutubeNegativeComments : "",
            firstMovieYoutubeNeutralComments : "",
            secondMovieName : this.props.secondMovieToCompare,
            secondMovieTwitterPostivieComments : "",
            secondMovieTwitterNegativeComments : "",
            secondMovieTwitterNeutralComments : "",
            secondMovieYoutubePostivieComments : "",
            secondMovieYoutubeNegativeComments : "",
            secondMovieYoutubeNeutralComments : ""
        }

        this.handleFirstMovieSentiment = this.handleFirstMovieSentiment.bind(this)
        this.handleSecondMovieSentiment = this.handleSecondMovieSentiment.bind(this)
    }

    handleFirstMovieSentiment(twitterPositiveComments, twitterNegativeComments, twitterNeutralComments, youtubePositiveComments, youtubeNegativeComments, youtubeNeutralComments) {
        this.setState({
            firstMovieTwitterPostivieComments : twitterPositiveComments,
            firstMovieTwitterNegativeComments : twitterNegativeComments,
            firstMovieTwitterNeutralComments : twitterNeutralComments,
            firstMovieYoutubePostivieComments : youtubePositiveComments,
            firstMovieYoutubeNegativeComments : youtubeNegativeComments,
            firstMovieYoutubeNeutralComments : youtubeNeutralComments
        })
    }

    handleSecondMovieSentiment(twitterPositiveComments, twitterNegativeComments, twitterNeutralComments, youtubePositiveComments, youtubeNegativeComments, youtubeNeutralComments) {
        this.setState({
            secondMovieTwitterPostivieComments : twitterPositiveComments,
            secondMovieTwitterNegativeComments : twitterNegativeComments,
            secondMovieTwitterNeutralComments : twitterNeutralComments,
            secondMovieYoutubePostivieComments : youtubePositiveComments,
            secondMovieYoutubeNegativeComments : youtubeNegativeComments,
            secondMovieYoutubeNeutralComments : youtubeNeutralComments
        })
    }

    render() {
        return (
            <div>
                <div className="movieInformationArea">
                    <MovieInformation 
                        handler={this.handleFirstMovieSentiment} 
                        movieName={this.state.firstMovieName} 
                    />
                    <MovieInformation 
                        handler={this.handleSecondMovieSentiment} 
                        movieName={this.state.secondMovieName} 
                    />
                </div>
                <div className="visualisationArea">
                    <div className="visualisationSpacing">
                        <h3>Twitter Sentiment Comparison</h3>
                        <CompareMovieVisualisation 
                            firstMovieName={this.state.firstMovieName}
                            secondMovieName={this.state.secondMovieName}
                            firstMoviePostivieComments={this.state.firstMovieTwitterPostivieComments}
                            firstMovieNegativeComments={this.state.firstMovieTwitterNegativeComments}
                            firstMovieNeutralComments={this.state.firstMovieTwitterNeutralComments}
                            secondMoviePostivieComments={this.state.secondMovieTwitterPostivieComments}
                            secondMovieNegativeComments={this.state.secondMovieTwitterNegativeComments}
                            secondMovieNeutralComments={this.state.secondMovieTwitterNeutralComments}
                        />
                    </div>
                    <div className="visualisationSpacing">
                        <h3>Youtube Sentiment Comparison</h3>
                        <CompareMovieVisualisation 
                            firstMovieName={this.state.firstMovieName}
                            secondMovieName={this.state.secondMovieName}
                            firstMoviePostivieComments={this.state.firstMovieYoutubePostivieComments}
                            firstMovieNegativeComments={this.state.firstMovieYoutubeNegativeComments}
                            firstMovieNeutralComments={this.state.firstMovieYoutubeNeutralComments}
                            secondMoviePostivieComments={this.state.secondYMovieYoutubePostivieComments}
                            secondMovieNegativeComments={this.state.secondMovieYoutubeNegativeComments}
                            secondMovieNeutralComments={this.state.secondMovieYoutubeNeutralComments}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default CompareMovieResults;