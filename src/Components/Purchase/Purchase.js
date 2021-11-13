import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import useAuth from '../../Hook/useAuth';
import './Purchase.css'

const Purchase = () => {
    const { carId } = useParams();
    const {user} = useAuth();

    const [car, setCar] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetch('https://mysterious-caverns-89933.herokuapp.com/cars')
            .then(res => res.json())
            .then(data => setCar(data))
    }, []);

    const singleCar = car?.find(sc => sc._id == carId);

    const onSubmit = data => {
        data.carInfo = singleCar;
        data.status = 'pending';
        axios.post('https://mysterious-caverns-89933.herokuapp.com/confirmBooking', data)
        .then(res => {
            if (res.data.insertedId) {
                alert('booked successfully')
                reset();
            }
        })
    }

    return (
        <Container className='mt-5'>
            <Row>
                <Col md={6} sm={12}>
                    <h3>{singleCar?.name}</h3>
                    <img src={singleCar?.img} alt="" className='img-fluid mt-3' />
                    <p className='mt-3'>Launched in: {singleCar?.founded}</p>
                    <p className='mt-3'>{singleCar?.description}</p>
                    <p style={{ fontSize: '20px', fontWeight: '700' }}>Price: ${singleCar?.price}</p>
                </Col>

                <Col md={6} sm={12} className='booking'>
                    <h2 className='text-center mb-4'>Client's Info</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("name", { required: true, maxLength: 20 })} defaultValue={user.displayName} placeholder="" />
                        <input {...register("email", { required: true })} defaultValue={user.email} placeholder="" />
                        <input type="text" {...register("address", { required: true })} placeholder="Address" />
                        <input type="number" {...register("contact", { required: true })} placeholder="Phone Num" />
                        <input type="number" {...register("payment", { required: true })} placeholder="Credit Card Num" />
                        <input type="submit" value="Book Now" />
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Purchase;