import React from 'react';
import {Bar} from 'react-chartjs-2';

class MovieVisualisation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            labels : ["Positive", "Neutral", "Negative"],
            datasets : [
                {
                    label : "Twitter Sentiment",
                    data : this.props.twitter_sentiment,
                    backgroundColor : ["#00acee", "#00acee", "#00acee"],
                    borderWidth : 2,
                    borderColor : "white"
                },

                {
                    label : "YouTube Sentiment",
                    data : this.props.youtube_sentiment,
                    backgroundColor : ["#de5246", "#de5246", "#de5246"],
                    borderWidth : 2,
                    borderColor : "white"
                }
            ]
        }
    }

    // update dataset if props change
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                datasets : [
                    {
                        label : "Twitter Sentiment",
                        data : this.props.twitter_sentiment,
                        backgroundColor : ["#00acee", "#00acee", "#00acee"],
                        borderWidth : 2,
                        borderColor : "white"
                    },
    
                    {
                        label : "YouTube Sentiment",
                        data : this.props.youtube_sentiment,
                        backgroundColor : ["#de5246", "#de5246", "#de5246"],
                        borderWidth : 2,
                        borderColor : "white"
                    }
                ]
            })
        }
    }

    render() {
        return (
            <div>
                <Bar
                    data={{
                        labels : this.state.labels,
                        datasets : this.state.datasets
                    }}
                    width={700}
                    height={400}
                    options={{ 
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: "Sentiment Breakdown",
                            fontColor : "white",
                            fontSize: 30
                        },
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

export default MovieVisualisation;