import React from 'react';
import HomePage from './pages/HomePage'
import FindSentimentPage from './pages/FindSentimentPage'
import ComparePage from './pages/ComparePage'
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom"

class App extends React.Component {
   constructor() {
     super()
     this.state = {}
   }

   render() {
     return (
       <div>
         <h1>See or Skip?</h1>
         <Route exact path="/" component={HomePage} />
         <Route exact path="/FindSentiment" component={FindSentimentPage} />
         <Route exact path="/ComparePage" component={ComparePage} />
       </div>
     )
   }
}

export default App;
