import React from 'react'
import { Line } from 'react-chartjs-2';

class CompareMovieVisualisation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            labels : ["Positive","Neutral", "Negative"],
            datasets : [
                {
                    label: this.props.firstMovieName,
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data : this.props.firstMovieSentiment
                },

                {
                    label: this.props.secondMovieName,
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data : this.props.secondMovieSentiment
                }
            ]
        }
    }

    // save changes passed to the component in the state
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
                        data : this.props.firstMovieSentiment
                    },
    
                    {
                        label: this.props.secondMovieName,
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        pointBackgroundColor: 'rgba(255,99,132,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255,99,132,1)',
                        data : this.props.secondMovieSentiment
                    }
                ]
            })
        }
    }

    render() {
        return (
            <div>
                <Line
                    data={{
                        labels : this.state.labels,
                        datasets : this.state.datasets
                    }}
                        width={600}
                        height={300}
                        options={{ 
                            maintainAspectRatio: false,
                            scales: {
                                xAxes: [{
                                  display: true,
                                  gridLines: {
                                    display: true,
                                    color: "rgba(255, 255, 255, 0.5)"
                                  },
                                  scaleLabel: {
                                    display: true,
                                    labelString: 'Sentiment',
                                  }
                                }],
                                yAxes: [{
                                  display: true,
                                  gridLines: {
                                    display: true,
                                    color: "rgba(255, 255, 255, 0.5)"
                                  },
                                  scaleLabel: {
                                    display: true,
                                    labelString: 'Value',
                                  }
                                }]
                            }
                        }}
                />
            </div>
        )
    }
}

export default CompareMovieVisualisation