import React, { Component } from 'react'
import SearchLocationComponent from './SearchLocationComponent';

class LocationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lat: 0,
            lon: 0
        }
    }

    fetchLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.lat !== this.state.lat || prevState.lon !== this.state.lon) {
            this.props.setCoordinates(this.state);
        }
    }

    render() {
        return (
            <>
                <div className="searcLocationDiv">
                    <SearchLocationComponent setCoordinates={(coords) => this.setState(coords)}/>
                </div>
                <div className="fetchLocationDiv">
                    <button onClick={this.fetchLocation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Fetch Location
                    </button>
                </div>
            </>
        )
    }
}

export default LocationComponent
