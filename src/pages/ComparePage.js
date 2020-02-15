import React from 'react';
import CompareMovieSelector from '../components/CompareMovieSelector'

class ComparePage extends React.Component {
   constructor() {
     super()
     this.state = {
       firstMovieToCompare : "",
       secondMovieToCompare : "" ,
       isSubmitted : false
     }

     this.onClick = this.onClick.bind(this)
     this.handleFirstMovieChange = this.handleFirstMovieChange.bind(this)
     this.handleSecondMovieChange = this.handleSecondMovieChange.bind(this)
   }

   handleFirstMovieChange(movieName) {
    this.setState({
      firstMovieToCompare : movieName
    })
   }

   handleSecondMovieChange(movieName) {
    this.setState({
      secondMovieToCompare : movieName
    })
   }

   onClick(event) {
     console.log(this.state.firstMovieToCompare)
     console.log(this.state.secondMovieToCompare)
     event.preventDefault()
   }

   render() {
     return (
       <div>
         <h1>Its a battle between two movies!</h1>
         <h2>Which one will come out on top?</h2>
         <CompareMovieSelector handler={this.handleFirstMovieChange}/>
         <CompareMovieSelector handler={this.handleSecondMovieChange}/>
         <button onClick={this.onClick} >Compare Movies!</button>
       </div>
     )
   }
}

export default ComparePage;
