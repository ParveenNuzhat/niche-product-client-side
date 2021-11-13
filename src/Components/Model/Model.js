import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Model.css'

const Model = (props) => {
    const { _id, name, founded, description, price, img } = props.car;
    return (
        <div className='d-md-flex'>
            <Col>
                <Card style={{ width: '20rem' }} className='model-card border-0'>
                    <Card.Img variant="top" src={img} className='img-fluid my-auto' />
                    <Card.Title style={{ color: 'blue' }} className='text-center'>{name}</Card.Title>
                </Card>
            </Col>
            <Col className=''>
                <Card style={{ width: '20rem' }} className='model-card border-0 ms-2'>
                    <Card.Body className='model-info py-2'>
                        <Card.Text className=''><b> <span style={{ color: 'orange' }}>Launched in: {founded}</span></b></Card.Text>
                        <Card.Text className=''><b> <span style={{ color: 'orange' }}>{description.slice(0,100)}</span></b></Card.Text>
                        <Card.Text className=''><b> <span style={{ color: 'orange' }}>${price}</span></b></Card.Text>
                        <div className=''>
                            <Link to={`/purchase/${_id}`} >
                                <Button className='mt-3'>Book Now</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
};

export default Model;