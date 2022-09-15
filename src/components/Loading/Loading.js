import React from 'react';
import { Spinner , Container} from "react-bootstrap";
import './Loading.css';

export default function LoadingSceen(){
    return(
        <Container fluid className='loading'>
            <Spinner animation="grow" variant="info" />
        </Container>
    )
}