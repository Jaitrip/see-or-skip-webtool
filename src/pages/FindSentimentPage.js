import React from 'react';

class FindSentimentPage extends React.Component {
   constructor() {
     super()
     this.state = {}
   }

   render() {
     return (
       <div>
         <h1>Looking forward to a new film or show?</h1>
         <h2>See what other people are saying!</h2>
         <input type="text" name="name" />
       </div>
     )
   }
}

export default FindSentimentPage;
