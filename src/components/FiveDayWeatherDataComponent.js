import React, { Component } from 'react';
import { connect } from 'react-redux';

export class FiveDayWeatherDataComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            exclude: 'minutely,hourly,current',
            view: false,
            expand: null,
            data: []
        }
    }

    expandDayData = (dt) => {
        this.setState({
            expand: dt
        })
    }

    fetchData() {

        fetch(`${process.env.REACT_APP_API_URL}/onecall?lat=${this.props.coords.lat}&lon=${this.props.coords.lon}&exclude=${this.state.exclude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(result => {
                this.setState({ data: result, view: true })
                console.log(result)
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

    fetchDate(sec) {
        const date = new Date(sec * 1000);
        return date.toDateString();
    }

    fetchTime(sec) {
        const date = new Date(sec * 1000);
        return date.toLocaleTimeString();
    }

    render() {
        return (
            <>

                {
                    this.state.view &&
                    <table className="mx-auto table text-gray-400 text-sm">
                        {/* {JSON.stringify(this.state.data.daily[0].dt)} */}
                        <thead className="bg-gray-800 text-gray-500 border-b-2">
                            <tr>
                                <th className="p-3">Day</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Min/Max</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.daily.map((day) => {
                                    return (
                                        <React.Fragment key={day.dt}>
                                            <tr onClick={() => this.expandDayData(day.dt)} className="bg-gray-800 border-b-2 hover:text-yellow-100">
                                                <td className="w-1/4 p-2">{this.fetchDate(day.dt)}</td>
                                                <td className="w-1/2 p-2">
                                                    <div className="grid grid-cols-3">
                                                        <div className="inline-flex justify-items-center items-center">
                                                            <img src={`${process.env.REACT_APP_ICON_URL}${day.weather[0].icon}.png`} alt={day.weather[0].description} />
                                                        </div>
                                                        <div className="col-span-2 inline-flex justify-items-center items-center">
                                                            {
                                                                (day.weather[0].description).toUpperCase()
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="w-1/4 p-2">
                                                    <div>{day.temp.min}°C</div>
                                                    <div>{day.temp.max}°C</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3">
                                                    {
                                                        (this.state.expand === day.dt) &&
                                                        <div className="flex items-center justify-center">
                                                            <div className="flex flex-col bg-white rounded p-3 w-full max-w-xs">
                                                                <div className="mt-3 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                                                                    <img src={`${process.env.REACT_APP_ICON_URL}${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
                                                                </div>

                                                                <div className="flex flex-row justify-between mt-6">
                                                                    <div className="flex flex-col items-center">
                                                                        <div className="font-medium text-sm">Day</div>
                                                                        <div className="text-sm text-gray-500">{day.temp.day}°C</div>
                                                                    </div>
                                                                    <div className="flex flex-col items-center">
                                                                        <div className="font-medium text-sm">Night</div>
                                                                        <div className="text-sm text-gray-500">{day.temp.night}°C</div>
                                                                    </div>
                                                                </div>

                                                                <div className="flex flex-row justify-between mt-6">
                                                                    <div className="flex flex-col items-center">
                                                                        <div className="font-medium text-sm">Sunrise</div>
                                                                        <div className="text-sm text-gray-500">{this.fetchTime(day.sunrise)}</div>
                                                                    </div>
                                                                    <div className="flex flex-col items-center">
                                                                        <div className="font-medium text-sm">Sunset</div>
                                                                        <div className="text-sm text-gray-500">{this.fetchTime(day.sunset)}</div>
                                                                    </div>
                                                                </div>

                                                                <div className="flex flex-row justify-between mt-6">
                                                                    <div className="flex flex-col items-center">
                                                                        <div className="font-medium text-sm">Wind</div>
                                                                        <div className="text-sm text-gray-500">{day.wind_speed}k/h</div>
                                                                    </div>
                                                                    <div className="flex flex-col items-center">
                                                                        <div className="font-medium text-sm">Humidity</div>
                                                                        <div className="text-sm text-gray-500">{day.humidity}%</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })
                            }
                        </tbody>
                    </table>
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

export default connect(mapStateToProps)(FiveDayWeatherDataComponent);
