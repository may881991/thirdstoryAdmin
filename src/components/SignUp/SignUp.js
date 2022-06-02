import React, { useState } from 'react';
import { Container , Form, Button } from 'react-bootstrap';
import logo from "./../../assets/images/Logo.png";
import './SignUp.css';

export default function SignUP() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleSignUP = async e => {
        console.log("handleSignUp")
    }

    return (
        <Container className='d-flex'>
            <Form id='loginForm' onSubmit={handleSignUP} className='col-md-5 m-auto p-3 align-items-center'>
                <div className="text-center">
                    <img alt={logo} src={logo}/>
                    <h3>Log In to Dashboard</h3>
                    <label>Enter your email and password below</label>
                </div>
                <Form.Group className="m-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="m-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" type="submit" className='loginBtn'>
                       Sign Up
                    </Button>
                </div>
            </Form>
        </Container>
    );
}