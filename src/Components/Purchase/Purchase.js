import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import useAuth from '../../Hook/useAuth';
import './Purchase.css'

const Purchase = () => {
    const { carId } = useParams();
    const { user } = useAuth();

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
                    <div className='text-center'>
                        <img src={singleCar?.img} alt="" className='img-fluid car-img w-75 mt-5' style={{ borderRadius: '10px', boxShadow: '10px 10px 10px 35px #cccc99' }} />
                        <h3 style={{ color: 'orangered', fontFamily: 'Dancing Script, cursive', fontSize: '30px' }}><b>{singleCar?.name}</b></h3>
                        <p className='mt-5' style={{ fontSize: '20px', fontWeight: '700', color: 'orange' }} ><b>Launched in: {singleCar?.founded}</b></p>
                        <p className='w-75 mx-auto'>{singleCar?.description}</p>
                        <p style={{ fontSize: '25px', fontWeight: '700', color: 'orangered' }}>Price: ${singleCar?.price}</p>
                    </div>
                </Col>

                <Col md={6} sm={12} className='booking'>
                    <h2 className='text-center mb-4' style={{ color: 'orange' }}>Client's Info</h2>
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