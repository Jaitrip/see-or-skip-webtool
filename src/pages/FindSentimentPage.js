import React from 'react';
import MovieDetails from '../components/MovieDetails'
import "../styles/FindSentimentStyles.css"

class FindSentimentPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieTitle: '',
      isSubmitted: false
    }

    // bind handelers to the object
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // update the state when text input changes
  handleChange(event) {
    this.setState({movieTitle : event.target.value})
  }

  // change state to submitted when user clicks search
  handleSubmit(event) {
    this.setState({isSubmitted: true})
    event.preventDefault()
  }

  render() {
    // if the user has entered the movie title and searched, display movie details
    if (this.state.isSubmitted === true) {
      return (
        <MovieDetails 
          movieName={this.state.movieTitle} 
          component_location="find"
        />
      )
    }

    return (
      <div className="findSentimentLanding">
        <div>
          <h1>Looking forward to a new film?</h1>
          <h2>Find out what people think about it!</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.movie_title} onChange={this.handleChange} />
          <input type="submit" value="Search" />
        </form>
      </div>
    )
  }
}

export default FindSentimentPage;
