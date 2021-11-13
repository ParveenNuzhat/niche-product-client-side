import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import './Register.css'

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false)

    const location = useLocation();
    const history = useHistory();

    const { setUser, handleCreatingUser, setIsLoading, updateName } = useAuth();

    const redirect_url = location.state?.from || '/home'
    console.log(redirect_url);

    const handleGetName = (e) => {
        setName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const userRegister = (name, email) => {
        fetch("https://mysterious-caverns-89933.herokuapp.com/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name, email }),
        })
            .then((res) => res.json())
            .then((result) => console.log(result, "Added"));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        handleCreatingUser(email, password)
            .then((result) => {
                setIsLoading(true);
                updateName(name);
                userRegister(name, email);
                setUser(result.user);
                history.push(redirect_url)
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div className='m-5'>
            <h3 className='text-center' style={{ fontFamily: 'normal', fontSize: '35px' }}><b>Please Sign up</b></h3>
            <div className='register-container w-50 mx-auto p-5 my-4' style={{ borderRadius: '5px', backgroundColor: '#cccccc', boxShadow: '5px 5px 10px tan' }}>
                <Form onSubmit={handleRegister} className='register-form w-75 mx-auto' >

                    <Form.Group className="" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onBlur={handleGetName} type="name" placeholder="Enter name" />
                    </Form.Group>
                    <br />
                    <Form.Group className="" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={handlePassword} type="password" placeholder="Password" />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit" className='w-100'>
                        <b>REGISTER</b>
                    </Button>
                    <br />
                    <br />
                    <Form.Group className="" controlId="formBasicCheckbox">
                        <Form.Check className='mb-3' onChange={() => setIsRegistered(!isRegistered)} type="checkbox" label="Already have an account?" />
                        {isRegistered ? <Link to='/login'><span style={{ fontSize: '18px', color: 'black' }}><b>Log in</b></span></Link> : ''}
                    </Form.Group>
                </Form>
            </div>

        </div>



    );
};

export default Register;