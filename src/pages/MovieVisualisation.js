import React from 'react';
import axios from 'axios';

class MovieVisualisation extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
      error : null,
      apiResultsObtained: false,
      movieName : this.props.movieName,
      movieOverview : '',
      movieReleaseDate : '',
     }
   }

    getMovieInformation(movieName) {
      axios.get("https://api.themoviedb.org/3/search/movie", {
       params: {
         api_key : '146fa0756d99220f8811aceb8a865301',
         language : 'en-US',
         query : movieName,
         page : '1',
         include_adult : 'false' 
       }
     }).then(apiResponse => this.setState({
       error : false,
       apiResultsObtained : true,
       movieName : apiResponse.data.results[0].title,
       movieOverview : apiResponse.data.results[0].overview,
       movieReleaseDate : apiResponse.data.results[0].release_date
     }))
     .catch(error => {
       console.log(error)
     })
    }

   render() {
     this.getMovieInformation(this.state.movieName)
     return (
       <div>
        <h1>This is what people think about:</h1>
        <h2>{this.state.movieName}</h2>
        <h2>{this.state.movieOverview}</h2>
        <h2>Release Date: {this.state.movieReleaseDate}</h2>
       </div>
     )
   }
}

export default MovieVisualisation;
