import React, { Component } from 'react'
import LocationComponent from './LocationComponent';
import WeatherDataComponent from './WeatherDataComponent';

class MainComponent
 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lat: 0,
            lon: 0,
        }

        this.timeTrack();
    }

    setCoordinates(coords) {
        this.setState({lat: coords.lat, lon: coords.lon});
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
                <LocationComponent setCoordinates={(coords) => this.setCoordinates(coords)} />
                {this.state.currentDateTime}
                <br />
                <WeatherDataComponent coords={{lat: this.state.lat, lon: this.state.lon}}/>
            </div>
        )
    }
}

export default MainComponent

