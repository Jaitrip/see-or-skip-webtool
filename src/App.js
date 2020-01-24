import React from 'react';
import HomePage from './pages/HomePage'
import FindSentimentPage from './pages/FindSentimentPage'
import ComparePage from './pages/ComparePage'
import NavigationBar from './NavigationBar'
import './index.css';
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
       <BrowserRouter>
        <div>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/FindSentiment" component={FindSentimentPage} />
            <Route exact path="/ComparePage" component={ComparePage} />
          </Switch>      
        </div>
       </BrowserRouter>
     )
   }
} 


export default App;
