import React from 'react';

class MovieVisualisation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movie_name : this.props.movieName,
            positive_comments: '',
            negative_comments: '',
            neutral_comments: '',
            see_or_skip: '',
            date_analysed: ''
        }
    }

    render() {
        return (
          <div>
           <h1>This is what people think about:</h1>
           <h2>{this.state.movie_name}</h2>
           <h3>{this.state.movie_overview}</h3>
           <h3>Release Date: {this.state.movie_release_date}</h3>
           <h3>Positive Comments: {this.state.positive_comments}</h3>
           <h3>Negative Comments: {this.state.negative_comments}</h3>
           <h3>Neutral Comments: {this.state.neutral_comments}</h3>
           <h3>{this.state.see_or_skip}</h3>
          </div>
        )
    }
}

export default MovieVisualisation;