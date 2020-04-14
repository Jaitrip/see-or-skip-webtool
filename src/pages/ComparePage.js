import React from 'react';
import CompareMovieSelector from '../components/comparePageComponents/CompareMovieSelector'
import CompareMovieResults from '../components/comparePageComponents/CompareMovieResults';
import "../styles/CompareMovieLandingStyles.css"

class ComparePage extends React.Component {
   constructor() {
     super()
     this.state = {
       firstMovieToCompare : " ",
       secondMovieToCompare : " " ,
       isSubmitted : false
     }

     // bind handler functions to state
     this.onClick = this.onClick.bind(this)
     this.handleFirstMovieChange = this.handleFirstMovieChange.bind(this)
     this.handleSecondMovieChange = this.handleSecondMovieChange.bind(this)
   }

   // save movie name from input to state
   handleFirstMovieChange(movieName) {
    this.setState({
      firstMovieToCompare : movieName
    })
   }

   // save movie name from input to state
   handleSecondMovieChange(movieName) {
    this.setState({
      secondMovieToCompare : movieName
    })
   }

   // when movies have been submitted, change state
   onClick(event) {
     this.setState({
       isSubmitted : true
     })
     event.preventDefault()
   }

   render() {
     // if movies have been submitted, then display movie comparisons
    if (this.state.isSubmitted === true) {
      return (
        <CompareMovieResults 
          firstMovieToCompare={this.state.firstMovieToCompare}
          secondMovieToCompare={this.state.secondMovieToCompare}
        />
      )
    } else {
      return (
        <div className="comparePageLanding">
          <div>
            <h1>Its a battle between two movies!</h1>
            <h2>Which one will come out on top?</h2>
          </div>
          <div className="movieEntryArea">
            <div className="movieEntry">
              <CompareMovieSelector handler={this.handleFirstMovieChange}/>
            </div>
            <div className="movieEntry">
              <CompareMovieSelector handler={this.handleSecondMovieChange}/>
            </div>
          </div>
          <button onClick={this.onClick} >Compare</button>
        </div>
      )
    }
   }
}

export default ComparePage;
