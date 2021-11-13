import Button from '@restart/ui/esm/Button';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';


const MakeAdmin = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        fetch(`https://mysterious-caverns-89933.herokuapp.com/users`, {
            method: 'PUT',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email: data.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('New admin has been added')
                }
            })
        console.log(data);
    }

    return (
        <div>
            <h1 className='text-center mb-5'>Make Admin</h1>
            <Form className="w-50 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        {...register("email")}
                    />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button className="border-0 bg-primary text-white p-2 my-3" type="submit" variant="secondary" size="lg">
                        Make Admin
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default MakeAdmin;