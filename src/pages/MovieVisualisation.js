import React from 'react';

class MovieVisualisation extends React.Component {
   constructor() {
     super()
     this.state = {}
   }

   render() {
     return (
       <div>
        <h1>This is what people think about:</h1>
        <h1>{this.props.movieName}</h1>
       </div>
     )
   }
}

export default MovieVisualisation;
