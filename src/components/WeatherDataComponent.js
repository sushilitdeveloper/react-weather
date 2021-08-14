import React, { Component } from 'react'

class WeatherDataComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }

    async fetchData() {

        await fetch(`${process.env.REACT_APP_API_FIVE_DAYS_URL}/weather/?lat=${this.props.coords.lat}&lon=${this.props.coords.lon}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(result => {
                this.setState({ data: result })
                console.log(result);
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
            <div>
                {JSON.stringify(this.props.coords)} <br />
                {JSON.stringify(this.state.data)}
            </div>
        )
    }
}

export default WeatherDataComponent
