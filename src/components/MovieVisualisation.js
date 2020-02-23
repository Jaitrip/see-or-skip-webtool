import React from 'react';
import {Pie} from 'react-chartjs-2';

class MovieVisualisation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            see_or_skip: this.props.see_or_skip,
            date_analysed: this.props.date_analysed,
            labels : ["Positive", "Negative", "Neutral"],
            datasets : [{
                data : [Number(this.props.positive_comments), Number(this.props.negative_comments), Number(this.props.neutral_comments)],
                backgroundColor : ["red", "blue", "green"]
            }]
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                see_or_skip : this.props.see_or_skip,
                date_analysed : this.props.date_analysed,
                datasets : [{
                    data : [Number(this.props.positive_comments), Number(this.props.negative_comments), Number(this.props.neutral_comments)],
                    backgroundColor : ["red", "blue", "green"]
                }]
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Pie 
                        data={{
                        labels : this.state.labels,
                        datasets : this.state.datasets
                        }}
                        width={350}
                        height={350}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
                <h3>{this.state.see_or_skip}</h3>
            </div>
        )   
    }
}

export default MovieVisualisation;