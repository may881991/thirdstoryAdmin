import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword
} from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Container , Form, Button } from 'react-bootstrap';
import logo from "./../../assets/images/Logo.png";
import './SignUp.css';

export default function SignUP() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const Register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
        if (loading) return;
        if (user){
            navigate("/dashboard");
        }
    }, [user, loading]);

    return (
        <Container className='d-flex login-container'>
            <Form id='loginForm' onSubmit={Register} className='col-md-5 m-auto p-3 align-items-center'>
                <div className="text-center">
                    <img alt={logo} src={logo}/>
                    <h3>Create Your Admin Account</h3>
                    <label>Please fill in this form to create a new account.</label>
                </div>
                <Form.Group className="m-3" controlId="formName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" onChange={e => setName(e.target.value)}/>
                </Form.Group>
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