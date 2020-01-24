import React from 'react';
import {Link} from 'react-router-dom'
import './NavigationBar.css'

const navStyle = {
  color: 'white',
  textDecoration: 'none'
}

class NavigationBar extends React.Component {
  constructor() {
     super()
     this.state = {}
  }

  render() {
    return (
       <nav>
         <h2>See Or Skip?</h2>
         <ul className="nav-Links">
           <Link style={navStyle} to="/">
            <li>Home</li>
           </Link>

           <Link style={navStyle} to="/FindSentiment">
            <li>Find Sentiment</li>
           </Link>
           
           <Link style={navStyle} to="/ComparePage">
            <li>Compare Page</li>
           </Link> 
         </ul>
       </nav>
    )
  }
}

export default NavigationBar;
