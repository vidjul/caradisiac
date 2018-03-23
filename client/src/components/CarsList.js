import React, { Component } from 'react';

class CarsList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
        if (
            (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
            this.props.cars.length
        ) {
            this.props.onPaginatedSearch();
        }
    }

    render() {
        let rows = []
        let elem;
        if (this.props.cars) {;
            this.props.cars.forEach((car, index) => {
                elem =
                    <div key={index}>
                        <p>{car.name} </p>
                        <p>{car.volume} </p>
                        <img src={car.image} />
                    </div>
                rows.push(elem);
            });
            return rows;
        }
        return null;
    }
}

export default CarsList