import React, { useState} from 'react';
import { Modal, Button , Form} from "react-bootstrap";
import { storage , createActivity, updateActivity} from '../../firebase.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import "./ActivitiesModal.css"

const CreateActivity = (props) => { 
    const actInfo = props.activity;  
    const [actTitle, setTitle] = useState("");
    const [actDes, setDes] = useState("");
    const [actUrl, setImageUrl] = useState(null);
    const handleClose = props.close;  
    const current = new Date();
    const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

    const setCoverUpload = (imageUpload) => {
        console.log(imageUpload)
        if (imageUpload === null ) return;
        const imageRef = ref(storage, `activities/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url)
            });
        });
    }

    const createBook = () => {
        createActivity(actTitle, actDes, actUrl, date ).then((res) => { 
            console.log(res);
            handleClose(); 
            window.location.reload();
        }); 
    }

    const updateActivityInfo = () => { 
        let upRitle = actTitle === "" ? actInfo.title : actTitle;
        let upDes= actDes === "" ? actInfo.description : actDes; 
        console.log(upRitle);
        console.log(upDes);
        updateActivity(actInfo.id , upRitle, upDes, date);
        handleClose();
    }

    return(
        <>
            <Modal show={props.show} centered  size="lg">
            <Modal.Header closeButton onClick={props.close}>
            <Modal.Title>Add New Activity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4 row">
                        <Form.Label className='col-md-4'>Activity Title: <strong>*</strong></Form.Label>
                        {props.status === "edit" ? (
                            <Form.Control className='col-md-8' type="text" placeholder="Enter Activity Title" defaultValue={actInfo.title} onChange={e => setTitle(e.target.value)}/>
                        ) : (
                            <Form.Control className='col-md-8' type="text" placeholder="Enter Activity Title" onChange={e => setTitle(e.target.value)}/>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-4 row">
                        <Form.Label className='col-md-4'>Activity Description :  <strong>*</strong></Form.Label>
                        {props.status === "edit" ? (
                            <Form.Control className='col-md-8' as="textarea" rows={3} placeholder="Enter Activity Description" defaultValue={actInfo.description} onChange={e => setDes(e.target.value)}/>
                        ) : (
                            <Form.Control className='col-md-8' as="textarea" rows={3} placeholder="Enter Activity Description" onChange={e => setDes(e.target.value)}/>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-4 row">
                        <Form.Label className='col-md-4'>Upload Photo:<strong>*</strong></Form.Label>
                        <Form.Group controlId="formFileSm" className="col-md-8 fileInput">
                        <Form.Control type="file" onChange={(e) => {setCoverUpload(e.target.files[0]);}}/>
                        </Form.Group>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                    {props.status === "edit" ? (
                        <Button variant="primary" onClick={updateActivityInfo}> Update Activity </Button>
                    ) : (
                        <Button variant="primary" onClick={createBook}> Create Activity </Button>
                    )}
            </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateActivity;