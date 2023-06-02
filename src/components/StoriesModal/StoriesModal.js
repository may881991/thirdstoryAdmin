import React, { useState} from 'react';
import { Modal, Button , Form} from "react-bootstrap";
import { createStory, updateStory} from '../../firebase.js'; 

const CreateStories = (props) => { 
    const storyInfo = props.activity;  
    const [storyTitle, setTitle] = useState("");
    const [storyLink, setLink] = useState(""); 
    const handleClose = props.close;  
    const current = new Date();
    const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

    const createStorytoDb = () => {
        createStory(storyTitle, storyLink, date ).then((res) => { 
            console.log(res);
            handleClose(); 
            window.location.reload();
        }); 
    }

    const updateStorytoDb = () => { 
        let upstoryTitle = storyTitle === "" ? storyInfo.title : storyTitle;
        let upstoryLink= storyLink === "" ? storyInfo.description : storyLink; 
        updateStory(storyInfo.id , upstoryTitle, upstoryLink, date);
        handleClose();
    }

    return(
        <>
            <Modal show={props.show} centered  size="lg">
            <Modal.Header closeButton onClick={props.close}>
            <Modal.Title>{props.status === "edit" ? "Update Story" : "Add New Story" }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4 row">
                        <Form.Label className='col-md-4'> Story Title: <strong>*</strong></Form.Label>
                        {props.status === "edit" ? (
                            <Form.Control className='col-md-8' type="text" placeholder="Enter Story Title" defaultValue={storyInfo.title} onChange={e => setTitle(e.target.value)}/>
                        ) : (
                            <Form.Control className='col-md-8' type="text" placeholder="Enter Story Title" onChange={e => setTitle(e.target.value)}/>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-4 row">
                        <Form.Label className='col-md-4'>Story Youtube Link :  <strong>*</strong></Form.Label>
                        {props.status === "edit" ? (
                            <Form.Control className='col-md-8' type="text" placeholder="Enter Story Link" defaultValue={storyInfo.url} onChange={e => setLink(e.target.value)}/>
                        ) : (
                            <Form.Control className='col-md-8' type="text" placeholder="Enter Story Link" onChange={e => setLink(e.target.value)}/>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                    {props.status === "edit" ? (
                        <Button variant="primary" onClick={updateStorytoDb}> Update Stories </Button>
                    ) : (
                        <Button variant="primary" onClick={createStorytoDb}> Create Stories </Button>
                    )}
            </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateStories;