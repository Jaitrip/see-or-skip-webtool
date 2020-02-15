import React from 'react';

class MoviePoster extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            base_url : 'https://image.tmdb.org/t/p/',
            image_size : this.props.image_size,
            poster_path : this.props.poster_path
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                image_size : this.props.image_size,
                poster_path : this.props.poster_path
            })
        }
    }
    
    render() {
        return (
            <img 
            src= {this.state.base_url + this.state.image_size + '/' + this.state.poster_path}
            />
        )
    }
}

export default MoviePoster;