import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import './AddCar.css'

const AddCar = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        console.log('submitted');
        axios.post('https://mysterious-caverns-89933.herokuapp.com/cars', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('added successfully')
                    reset();
                }

            })
    }
    return (
        <div className='add-car'>
            <h2 className='text-center'>Add a Car</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true, maxLength: 20 })} placeholder="Car Model" />
                <input type="number" {...register("founded")} placeholder="First Launch" />
                <textarea type="text" {...register("description", { required: true })} placeholder="Description"></textarea>
                <input type="number" {...register("price")} placeholder="Price $" />
                <input {...register("img")} placeholder="Image URL" value="https://i.ibb.co/gM2fCY8/1967-camaro.jpg" />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddCar;