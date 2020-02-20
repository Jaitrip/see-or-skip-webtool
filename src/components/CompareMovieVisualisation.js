import React from 'react'
import {Radar} from 'react-chartjs-2';

class CompareMovieVisualisation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            labels : ["Positive", "Negative", "Neutral"],
            datasets : [
                {
                    label: this.props.firstMovieName,
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data : [
                        Number(this.props.firstMoviePostivieComments), 
                        Number(this.props.firstMovieNegativeComments), 
                        Number(this.props.firstMovieNeutralComments)
                    ]
                },

                {
                    label: this.props.secondMovieName,
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data : [
                        Number(this.props.secondMoviePostivieComments), 
                        Number(this.props.secondMovieNegativeComments), 
                        Number(this.props.secondMovieNeutralComments)
                    ]
                }
            ]
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                datasets : [
                    {
                        label: this.props.firstMovieName,
                        backgroundColor: 'rgba(179,181,198,0.2)',
                        borderColor: 'rgba(179,181,198,1)',
                        pointBackgroundColor: 'rgba(179,181,198,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(179,181,198,1)',
                        data : [
                            Number(this.props.firstMoviePostivieComments), 
                            Number(this.props.firstMovieNegativeComments), 
                            Number(this.props.firstMovieNeutralComments)
                        ]
                    },
    
                    {
                        label: this.props.secondMovieName,
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        pointBackgroundColor: 'rgba(255,99,132,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255,99,132,1)',
                        data : [
                            Number(this.props.secondMoviePostivieComments), 
                            Number(this.props.secondMovieNegativeComments), 
                            Number(this.props.secondMovieNeutralComments)
                        ]
                    }
                ]
            })
        }
    }

    render() {
        return (
            <div>
                <Radar 
                    data={{
                        labels : this.state.labels,
                        datasets : this.state.datasets
                    }}
                    width={500}
                    height={500}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        )
    }
}

export default CompareMovieVisualisation