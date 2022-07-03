import React, { useState} from 'react';
import { Modal, Button , Form} from "react-bootstrap";
import { storage , addBookData} from '../../firebase.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Modal.css"

const Create = (props) => {
    console.log(props)
    const bookInfo = props.book;
    const [booktitle, setTitle] = useState("");
    const [bookauthor, setAuthor] = useState("");
    const [bookIllustrator, setIllustrator] = useState("");
    const [bookPrice, setPrice] = useState(0);
    const [bookISBN, setISBN] = useState("");
    const [bookLang, setLang] = useState(0);
    const handleClose = props.close;
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

    const createBook = () => {
        handleClose();
        console.log(booktitle, bookauthor, bookIllustrator, bookPrice, bookISBN, coverUrl , pdfUrl , bookLang, date)
        // addBookData(booktitle, bookauthor, bookIllustrator, bookPrice, bookISBN, coverUrl , pdfUrl , bookLang, date);
    }

    return(
        <>
        <Modal show={props.show} centered  size="lg">
        <Modal.Header closeButton onClick={props.close}>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>Book Name : <strong>*</strong></Form.Label>
                    {props.status === "edit" ? (
                        <Form.Control className='col-md-8' type="text" placeholder="Enter Book name" defaultValue={bookInfo.title} onChange={e => setTitle(e.target.value)}/>
                    ) : (
                        <Form.Control className='col-md-8' type="text" placeholder="Enter Book name" onChange={e => setTitle(e.target.value)}/>
                    )}
                </Form.Group>
                <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>Author : <strong>*</strong></Form.Label>
                    {props.status === "edit" ? (
                        <Form.Control className='col-md-8' type="text" placeholder="Enter Author name" defaultValue={bookInfo.author}  onChange={e => setAuthor(e.target.value)}/>
                    ) : (
                        <Form.Control className='col-md-8' type="text" placeholder="Enter Author name" onChange={e => setAuthor(e.target.value)}/>
                    )}
                </Form.Group>
                <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>Illustrator :  <strong>*</strong></Form.Label>
                    {props.status === "edit" ? (
                        <Form.Control className='col-md-8' type="text" placeholder="Enter Illustrator" defaultValue={bookInfo.illustrator} onChange={e => setIllustrator(e.target.value)}/>
                    ) : (
                        <Form.Control className='col-md-8' type="text" placeholder="Enter Illustrator" onChange={e => setIllustrator(e.target.value)}/>
                    )}
                </Form.Group>
                <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>Price <strong>*</strong></Form.Label>
                    {props.status === "edit" ? (
                        <Form.Control className='col-md-8' type="number" placeholder="Enter Price" defaultValue={bookInfo.price} onChange={e => setPrice(e.target.value)}/>
                    ) : (
                        <Form.Control className='col-md-8' type="number" placeholder="Enter Price" onChange={e => setPrice(e.target.value)}/>
                    )}
                </Form.Group>
                <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>ISBN <strong>*</strong></Form.Label>
                    {props.status === "edit" ? (
                        <Form.Control className='col-md-8' type="text" placeholder="Enter ISBN" defaultValue={bookInfo.ISBN}  onChange={e => setISBN(e.target.value)}/>
                    ) : (
                        <Form.Control className='col-md-8' type="text" placeholder="Enter ISBN"  onChange={e => setISBN(e.target.value)}/>
                    )}
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
                    {props.status === "edit" ? (
                        <Form.Control className='col-md-8' type="text" placeholder="Enter Language" defaultValue={bookInfo.language} onChange={e => setLang(e.target.value)}/>
                    ) : (
                        <Form.Control className='col-md-8' type="text" placeholder="Enter Language" onChange={e => setLang(e.target.value)}/>
                    )}
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
                {props.status === "edit" ? (
                    <Button variant="primary" onClick={createBook}> Update Book </Button>
                ) : (
                    <Button variant="primary" onClick={createBook}> Create Book </Button>
                )}
        </Modal.Footer>
      </Modal>
      </>
    )
}

export default Create;