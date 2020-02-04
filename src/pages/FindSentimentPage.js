import React from 'react';
import MovieDetails from '../components/MovieDetails'

class FindSentimentPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      isSubmitted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    console.log(this.state.value)
    this.setState({isSubmitted: true})
    event.preventDefault()
  }

  render() {
    if (this.state.isSubmitted === true) {
      return (
        <MovieDetails movieName={this.state.value} />
      )
    }

    return (
      <div>
        <h1>Looking forward to a new film or show?</h1>
        <h2>See what other people are saying!</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Search" />
        </form>
      </div>
    )
  }
}

export default FindSentimentPage;
