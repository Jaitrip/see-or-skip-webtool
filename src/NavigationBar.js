import React from 'react';

class NavigationBar extends React.Component {
   constructor() {
     super()
     this.state = {}
   }

   render() {
     return (
       <div>
         <h2>Home</h2>
         <h2>Find Sentiment</h2>
         <h2>Compare Page</h2>
       </div>
     )
   }
}

export default NavigationBar;
