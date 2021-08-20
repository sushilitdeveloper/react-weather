import React, { Component } from 'react'
import { connect } from 'react-redux';
import FiveDayWeatherDataComponent from './FiveDayWeatherDataComponent';
import LocationComponent from './LocationComponent';
import WeatherDataComponent from './WeatherDataComponent';

class MainComponent
    extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentDateTime: '',
            setIntervalId: null,
            weeklyData: false
        };
        this.timeTrack = this.timeTrack.bind(this);
    }

    componentDidMount() {
        this.timeTrack();
    }

    timeTrack() {

        const setIntervalId = setInterval(() => {
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

        this.setState({ setIntervalId: setIntervalId });
    }

    componentWillUnmount() {
        const setIntervalId = this.state.setIntervalId;
        clearInterval(setIntervalId);
    }

    render() {

        return (
            <div className="p-10">
                <LocationComponent />
                <div className="text-sm text-gray-500">{this.state.currentDateTime}</div>
                <br />
                {
                    this.props.lon && this.props.lat
                        ? <>
                            <WeatherDataComponent />
                            {
                                this.state.weeklyData
                                    ? <FiveDayWeatherDataComponent />
                                    : <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => this.setState({ weeklyData: true })}>Show Weekly Data</button>
                            }
                        </>
                        : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lon: state.lon,
        lat: state.lat
    }
}

export default connect(mapStateToProps)(MainComponent);

