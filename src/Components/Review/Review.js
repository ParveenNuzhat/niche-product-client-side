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
            <h4 className='text-center review-title' style={{fontSize:'30px', fontWeight:'900', color: 'orange', fontFamily: 'Dancing Script, cursive'}}>Please Leave Us a Feedback</h4>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
                <input {...register("name", { required: true, maxLength: 20 })} value={user.displayName} placeholder="Name" />
                <input {...register("img")} placeholder="Image URL" value="https://i.ibb.co/3dHmQbL/dentist-04.jpg" />
                <input type="number" {...register("ratings", { min: 0, max: 5 })} placeholder='Ratings' />
                <textarea type="text" {...register("comments", { required: true })} placeholder="Comments"></textarea>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Review;