import React from 'react';
import axios from 'axios'
import Autosuggest from 'react-autosuggest'

class CompareMovieSelector extends React.Component {
    constructor() {
        super()
        this.state = {
            movie_entered : "",
            movie_suggestions : [],
            all_movies : []
        }
    }

    getAllMovies() {
        axios.get("http://localhost:5000/movieSentiment/findMovieSentiment")
        .then(apiResponse => {
            this.setState({
                all_movies : apiResponse.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getAllMovies()
    }

    getSuggestions = value => {
        const inputValue = value.toString().trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : this.state.all_movies.filter(lang =>
          lang.movie_name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };
    
    render() {
        return (
            <div>
                <label htmlFor="movie_suggestion">Choose a movie to compare!</label>
                <Autosuggest 
                    inputProps={{
                        placeholder: "Enter a movie",
                        autoComplete: "abcd",
                        name : "movie_suggestion",
                        id : "movie_suggestion",
                        value : this.state.movie_entered,
                        onChange: (event, {newValue}) => {
                            this.props.handler(newValue)
                            this.setState({
                                movie_entered: newValue
                            })
                        }
                    }} 
                    suggestions={this.state.movie_suggestions}
                    onSuggestionsFetchRequested={ ({value}) => {
                            this.setState({
                                movie_suggestions : this.getSuggestions(value)
                            })
                        }
                    }
                    onSuggestionsClearRequested={() =>  {
                        this.setState({
                            movie_suggestions : []
                        })
                    }}
                    getSuggestionValue={suggestion => suggestion.movie_name}
                    renderSuggestion={suggestion => <span>{suggestion.movie_name}</span>}
                />
            </div>
        )
    }
}

export default CompareMovieSelector;