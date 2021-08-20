import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SET_COORDS } from '../redux/index';

class SearchLocationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error: '',
            val: '',
            list: []
        }
    }

    componentDidUpdate(prevPros, prevState, snapshot) {
        if (prevState.val !== this.state.val) {
            this.fetchCoords();
        }
    }

    async fetchCoords() {
        const city = this.state.val;
        await fetch(`${process.env.REACT_APP_GEO_API_URL}/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(result => {
                this.setState({ list: result })
            })
            .catch((err) => {
                this.setState({ error: err.message });
            });
    }

    inputHandler({ target }) {
        this.setState({ val: target.value });
    }

    selectLocation(index) {
        const { lat, lon } = this.state.list[index];
        this.props.setCoord({
            lat: lat,
            lon: lon
        });
        this.setState({ list: [] });
    }

    render() {
        return (
            <>
                <div className="">
                    <div className="inline-flex flex-col justify-center relative text-gray-500">
                        <div className="relative">
                            <input onChange={(event) => this.inputHandler(event)} type="text" className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" placeholder="Enter Location..." value={this.state.val} />
                            <svg className="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        {
                            this.state.list.length > 0 &&
                            <ul className="absolute top-8 left-0 bg-white border border-gray-100 w-full mt-2">
                                {
                                    this.state.list.map((item, index) => {
                                        return (
                                            <li key={index} onClick={() => this.selectLocation(index)} className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                                                <svg className="absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                                <b>{item.name}</b> ( {item?.local_names?.hi} )
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchLocationComponent);