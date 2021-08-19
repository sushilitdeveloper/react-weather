import React, { Component } from 'react'
import LocationComponent from './LocationComponent';
import WeatherDataComponent from './WeatherDataComponent';

class MainComponent
 extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            currentDateTime: ''
        };
        this.timeTrack = this.timeTrack.bind(this);
    }

    componentDidMount() {
        this.timeTrack();
    }
    
    timeTrack() {
        
        setInterval(() => {
            const date = new Date();
            this.setState({
                currentDateTime: date.toLocaleString('en-US', {
                    weekday: 'short', // long, short, narrow
                    day: 'numeric', // numeric, 2-digit
                    year: 'numeric', // numeric, 2-digit
                    month: 'long', // numeric, 2-digit, long, short, narrow
                    hour: 'numeric', // numeric, 2-digit
                    minute: 'numeric', // numeric, 2-digit
                    second: 'numeric', // numeric, 2-digit
                })
            })
        }, 1000);
    }
    
    render() {
        
        return (
            <div>
                <LocationComponent />
                <div className="text-sm text-gray-500">{this.state.currentDateTime}</div>
                <br />
                <WeatherDataComponent />
            </div>
        )
    }
}

export default MainComponent

