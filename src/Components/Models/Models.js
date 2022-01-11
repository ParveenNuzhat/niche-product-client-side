import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Model from '../Model/Model';
import './Models.css'

const Models = () => {
    const [cars, setCars] = useState([]);
    useEffect(() => {
        fetch('https://mysterious-caverns-89933.herokuapp.com/cars')
            .then(res => res.json())
            .then(data => setCars(data))
    }, [])

    return (
        <div>
            <h2 style={{ textAlign: 'center', fontFamily: 'Grand Hotel, cursive', fontWeight: '900', fontSize: '40px', color: '#A7778D' }} className='service-header mt-5'><span style={{ color: 'brown' }}>Vintage</span> Car Models</h2>
            <Container style={{ marginTop: '40px' }} className='mb-5 text-center'>
                <Row md={2} className='gy-5'>
                    {
                        cars?.map(car => <Model
                            key= {car._id}
                            car = {car}
                        ></Model>)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Models;