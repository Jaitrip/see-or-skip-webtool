import React from 'react'
import MovieInformation from '../components/MovieInformation'
import CompareMovieVisualisation from './CompareMovieVisualisation'

class CompareMovieResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstMovieName : this.props.firstMovieToCompare,
            firstMoviePostivieComments : "",
            firstMovieNegativeComments : "",
            firstMovieNeutralComments : "",
            secondMovieName : this.props.secondMovieToCompare,
            secondMoviePostivieComments : "",
            secondMovieNegativeComments : "",
            secondMovieNeutralComments : ""
        }

        this.handleFirstMovieSentiment = this.handleFirstMovieSentiment.bind(this)
        this.handleSecondMovieSentiment = this.handleSecondMovieSentiment.bind(this)
    }

    handleFirstMovieSentiment(positiveComments, negativeComments, neutralComments) {
        this.setState({
            firstMoviePostivieComments : positiveComments,
            firstMovieNegativeComments : negativeComments,
            firstMovieNeutralComments :  neutralComments,
        })
    }

    handleSecondMovieSentiment(positiveComments, negativeComments, neutralComments) {
        this.setState({
            secondMoviePostivieComments : positiveComments,
            secondMovieNegativeComments : negativeComments,
            secondMovieNeutralComments :  neutralComments,
        })
    }

    render() {
        return (
            <div>
                <MovieInformation 
                    handler={this.handleFirstMovieSentiment} 
                    movieName={this.state.firstMovieName} 
                />
                <MovieInformation 
                    handler={this.handleSecondMovieSentiment} 
                    movieName={this.state.secondMovieName} 
                />

                <CompareMovieVisualisation 
                    firstMovieName={this.state.firstMovieName}
                    secondMovieName={this.state.secondMovieName}
                    firstMoviePostivieComments={this.state.firstMoviePostivieComments}
                    firstMovieNegativeComments={this.state.firstMovieNegativeComments}
                    firstMovieNeutralComments={this.state.firstMovieNeutralComments}
                    secondMoviePostivieComments={this.state.secondMoviePostivieComments}
                    secondMovieNegativeComments={this.state.secondMovieNegativeComments}
                    secondMovieNeutralComments={this.state.secondMovieNeutralComments}
                />

            </div>
        )
    }
}

export default CompareMovieResults;