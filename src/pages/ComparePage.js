import React from 'react';
import CompareMovieSelector from '../components/CompareMovieSelector'
import CompareMovieResults from '../components/CompareMovieResults';

class ComparePage extends React.Component {
   constructor() {
     super()
     this.state = {
       firstMovieToCompare : " ",
       secondMovieToCompare : " " ,
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
     this.setState({
       isSubmitted : true
     })
     event.preventDefault()
   }

   render() {
    if (this.state.isSubmitted === true) {
      return (
        <CompareMovieResults 
          firstMovieToCompare={this.state.firstMovieToCompare}
          secondMovieToCompare={this.state.secondMovieToCompare}
        />
      )
    } else {
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
}

export default ComparePage;
