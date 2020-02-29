import React from 'react';
import HomePageMovies from "../components/homePageComponents/HomePageMovies"

class HomePage extends React.Component {
   constructor() {
     super()
     this.state = {
     }
   }

   render() {
     return (
       <div>
         <HomePageMovies />
       </div>
     )
   }
}

export default HomePage;
