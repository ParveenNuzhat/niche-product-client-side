import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hook/useAuth';
import './Review.css'

const Review = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        axios.post('https://mysterious-caverns-89933.herokuapp.com/review', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Submitted! Thank You')
                    reset();
                }
            })
    }

    return (
        <div className='review'>
            <h2 className='text-center review-title'>Please Leave Us a Feedback</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
                <input {...register("name", { required: true, maxLength: 20 })} value={user.displayName} placeholder="Name" />
                <input type="number" {...register("ratings", { min: 0, max: 5 })} placeholder='Ratings' />
                <textarea type="text" {...register("comments", { required: true })} placeholder="Comments"></textarea>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Review;