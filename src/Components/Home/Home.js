import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Banner from '../Banner/Banner';


const Home = () => {

    const [cars, setCars] = useState([]);
    const [events, setEvents] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://mysterious-caverns-89933.herokuapp.com/cars')
            .then(res => res.json())
            .then(data => setCars(data))
    }, [])

    useEffect(() => {
        fetch('https://mysterious-caverns-89933.herokuapp.com/events')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])

    useEffect(() => {
        fetch('https://mysterious-caverns-89933.herokuapp.com/review')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div>
            <Banner></Banner>
            <div>
                <h2 className='text-center mt-5'>Our Vintage Car Collection</h2>
                <Container className='mt-5 cars-container'>
                    <Row className='g-1'>
                        {
                            cars.slice(0, 6).map(car =>
                                <Col md={4}>
                                    <Card style={{ width: '20rem' }} className='mx-auto car-card'>
                                        <Card.Img variant="top" src={car.img} className='p-3 car-img' />
                                        <Card.Body className=''>
                                            <Card.Title className=''>{car.name}</Card.Title>
                                            <Card.Text className=''>Launched in: {car.founded}</Card.Text>
                                            <Card.Text className=''>{car.description.slice(0, 100)}</Card.Text>
                                            <Card.Text className=''>Price: ${car.price}</Card.Text>
                                            <Link to={`/purchase/${car._id}`} >
                                                <Button className='home-btn'>Book Now</Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    </Row>
                </Container>
            </div>

            <div className='mt-5'>
                <h2 className='text-center' style={{ fontFamily: '', fontStyle: 'normal', fontSize: '35px', fontWeight: '600' }}>Take The Royal Ride</h2>
                <Container className='events-container mt-5'>
                    <Row className=''>
                        {
                            events.map(event =>
                                <Col md={4} >
                                    <Card style={{ width: '18 rem' }} className='event-card border-0 p-2'>
                                        <Card.Img variant="top" src={event.img} className='event-img w-75 mx-auto img-fluid' style={{ borderRadius: '150px' }} />
                                        <Card.Body className='text-center'>
                                            <Card.Title className=''>{event.title}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    </Row>
                </Container>
            </div>

            <div className='text-center mt-5'>
                <h2 className='mb-4'>Client's Feedback</h2>
                {
                    reviews.map(review => <div>
                        <h4>{review.name}</h4>
                        <p>{review.comments}</p>
                    </div>)
                }
            </div>

        </div>
    );
};

export default Home;