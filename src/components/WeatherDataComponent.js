import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherDataComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: false,
            data: []
        }
    }

    fetchData() {

        fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${this.props.coords.lat}&lon=${this.props.coords.lon}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(result => {
                this.setState({ data: result, view: true })
            });

    }

    componentDidMount() {
        if (this.props.coords.lat && this.props.coords.lon) {
            this.fetchData();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.coords.lat !== this.props.coords.lat || prevProps.coords.lon !== this.props.coords.lon) {
            this.fetchData();
        }
    }

    render() {
        return (
            <>
                {this.state.view &&
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
                            <div className="font-bold text-xl">{this.state.data.name}</div>
                            <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                                <img src={`${process.env.REACT_APP_ICON_URL}${this.state.data.weather[0].icon}@2x.png`} alt={this.state.data.weather[0].description} />
                            </div>

                            <div className="flex flex-row items-center justify-center mt-6">
                                <div className="font-medium text-6xl">{this.state.data.main?.temp}°</div>

                                <div className="flex flex-col items-center ml-6">
                                    <div>{this.state.data.weather[0].main}</div>
                                    <div className="mt-1">
                                        <span className="text-sm"><i className="far fa-long-arrow-up"></i></span>
                                        <span className="text-sm font-light text-gray-500">{this.state.data.main?.temp_max}°C</span>
                                    </div>
                                    <div>
                                        <span className="text-sm"><i className="far fa-long-arrow-down"></i></span>
                                        <span className="text-sm font-light text-gray-500">{this.state.data.main?.temp_min}°C</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row justify-between mt-6">
                                <div className="flex flex-col items-center">
                                    <div className="font-medium text-sm">Wind</div>
                                    <div className="text-sm text-gray-500">{this.state.data.wind?.speed}k/h</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="font-medium text-sm">Humidity</div>
                                    <div className="text-sm text-gray-500">{this.state.data.main?.humidity}%</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="font-medium text-sm">Visibility</div>
                                    <div className="text-sm text-gray-500">{this.state.data?.visibility}m</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        coords: {
            lon: state.lon,
            lat: state.lat
        }
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setCoord: (payload) => dispatch(SET_COORDS(payload))
//     }
// }

export default connect(mapStateToProps)(WeatherDataComponent);
