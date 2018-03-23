import React, { Component } from 'react';
import CarsList from './CarsList';

class ListContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { cars: null, pageCount: 1 }
        this.onPaginatedSearch = this.onPaginatedSearch.bind(this);
    }

    componentDidMount() {
        return fetch('/suv')
            .then((res) => res.json())
            .then((json) => this.setState({ cars: json.hits }));
    }

    onPaginatedSearch() {
        return fetch(`/suv/?page=${this.state.pageCount}`)
            .then((res) => res.json())
            .then((json) => this.setState({
                cars: this.state.cars.concat(json.hits),
                pageCount: this.state.pageCount + 1
            }));
    }

    render() {
        if (this.state.cars === null) {
            return <p> Loading ... </p>
        }
        else {
            return <CarsList cars={this.state.cars} onPaginatedSearch={this.onPaginatedSearch} />
        }
    }
}

export default ListContainer;