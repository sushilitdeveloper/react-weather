import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchLocationComponent from './SearchLocationComponent';
import { SET_COORDS } from '../redux/index';

class LocationComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    fetchLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.props.setCoord({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
        });
    }

    render() {
        return (
            <>
                <div className="searcLocationDiv">
                    <SearchLocationComponent />
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

const mapStateToProps = (state) => {
    return {
        lon: state.lon,
        lat: state.lat
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        setCoord: (payload) => dispatch(SET_COORDS(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationComponent);