import React, { Component } from 'react';
import { Card, CardTitle, Row, Col } from 'react-materialize';

class CarsList extends Component {

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
        if (this.props.cars) {
            this.props.cars.forEach((car, index) => {
                elem =
                    <Col s={4} key={index}>
                        <Card
                            header={<CardTitle image={car.image || 'http://via.placeholder.com/260x195'}>{car.model}</CardTitle>}
                            actions={[<a href={`http://www.caradisiac.com/modele--${car.model.toLowerCase().replace(/ /g,'-')}`} key={index}>Check on caradisiac</a>]}>
                            {car.name} / Volume:  {car.volume}
                        </Card>
                    </Col>
                rows.push(elem);
            });
            return <Row>{rows}</Row>;
        }
        return null;
    }
}

export default CarsList