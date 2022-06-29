import React, { useState} from 'react';
import { Modal, Button , Form} from "react-bootstrap";
import { storage , addBookData} from '../../firebase.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Create.css"
export default function Create() {
    const [booktitle, setTitle] = useState("");
    const [bookauthor, setAuthor] = useState("");
    const [bookIllustrator, setIllustrator] = useState("");
    const [bookPrice, setPrice] = useState(0);
    const [bookISBN, setISBN] = useState("");
    const [bookLang, setLang] = useState(0);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [coverUrl, setImageUrl] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

    const current = new Date();
    const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

    const setCoverUpload = (imageUpload) => {
        if (imageUpload === null ) return;
        const imageRef = ref(storage, `cover/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url)
            });
        });
    }

    const setPdfUpload = (pdfUpload) => {
        console.log(pdfUpload)
        if (pdfUpload === null ) return;
        const pdfRef = ref(storage, `pdf/${pdfUpload.name}`);
        uploadBytes(pdfRef, pdfUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setPdfUrl(url)
            });
        });
    }

    return(
        <>
        <Button variant="primary"  onClick={handleShow}>Create Book</Button>
        <Modal show={show} onHide={handleClose} centered  size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>Book Name : <strong>*</strong></Form.Label>
                    <Form.Control className='col-md-8' type="text" placeholder="Enter Book name" onChange={e => setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>Author : <strong>*</strong></Form.Label>
                    <Form.Control className='col-md-8' type="text" placeholder="Enter Author name" onChange={e => setAuthor(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>Illustrator :  <strong>*</strong></Form.Label>
                    <Form.Control className='col-md-8' type="text" placeholder="Enter Illustrator" onChange={e => setIllustrator(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>Price <strong>*</strong></Form.Label>
                    <Form.Control className='col-md-8' type="number" placeholder="Enter Price" onChange={e => setPrice(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>ISBN <strong>*</strong></Form.Label>
                    <Form.Control className='col-md-8' type="text" placeholder="Enter ISBN"  onChange={e => setISBN(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>Upload Cover:<strong>*</strong></Form.Label>
                    <Form.Group controlId="formFileSm" className="col-md-8 fileInput">
                      <Form.Control type="file" onChange={(e) => {setCoverUpload(e.target.files[0]);}}/>
                    </Form.Group>
                </Form.Group>
                <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>Upload PDF:<strong>*</strong></Form.Label>
                    <Form.Group controlId="formFileSm" className="col-md-8 fileInput">
                      <Form.Control type="file" onChange={(e) => {setPdfUpload(e.target.files[0]);}}/>
                    </Form.Group>
                </Form.Group>
                <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>Language :  <strong>*</strong></Form.Label>
                    <Form.Control className='col-md-8' type="text" placeholder="Enter Language" name="user_phone"  onChange={e => setLang(e.target.value)}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => addBookData(booktitle, bookauthor, bookIllustrator, bookPrice, bookISBN, coverUrl , pdfUrl , bookLang, date)} onHide={handleClose} > Create Book </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
}