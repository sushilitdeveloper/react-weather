import React, { Component } from 'react'

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
                console.log(result);
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
        this.props.setCoordinates({ lat: lat, lon: lon });
        this.setState({ list: [] });
    }

    render() {
        return (
            <>
                <div class="">
                    <div class="inline-flex flex-col justify-center relative text-gray-500">
                        <div class="relative">
                            <input onChange={(event) => this.inputHandler(event)} type="text" class="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" placeholder="Enter Location..." value={this.state.val} />
                            <svg class="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        {
                            this.state.list.length > 0 &&
                            <ul class="bg-white border border-gray-100 w-full mt-2">
                                {
                                    this.state.list.map((item, index) => {
                                        return (
                                            <li key={index} onClick={() => this.selectLocation(index)} class="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                                                <svg class="absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
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

export default SearchLocationComponent
