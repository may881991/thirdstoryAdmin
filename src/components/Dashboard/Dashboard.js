import React, {useEffect , useState} from 'react';
import { getBookData } from '../../firebase.js';
import { Navbar, Container , Row, Nav, Col ,Table , Button} from "react-bootstrap";
import { BiBook , BiBulb, BiDotsVerticalRounded} from "react-icons/bi";
import CreateBook from "../Create/Create";
import "./Dashboard.css";
import logo from "./../../assets/images/Logo.png";

export default function Dashboard() {
  const { bookdata } = GetBookLists();
  console.log(bookdata)
  return(
    <Container fluid className='p-0'>
        <Row>
          <Nav className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
            <Nav.Item>
            <div className="text-center mb-3">
                <img alt={logo} src={logo} className="logo"/>
            </div>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1"><BiBook /> Books</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2"><BiBulb />Activities</Nav.Link>
            </Nav.Item>
          </Nav>
          <Col lg={10} md={9} className="ms-sm-auto px-md-4">
            <Navbar>
                <h3 className='p-3 mx-4'>Books</h3>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    Signed in as: <a href="#login">Mark Otto</a>
                  </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
            <Container className='book-container'>
              <Row className="flex-nowrap justify-content-between">
                <Col md={2}>
                  <h5 className='py-3'>All Books</h5>
                </Col>
                <Col md={3} className="d-flex align-items-center justify-content-end">
                  <CreateBook />
                </Col>
              </Row>
              <Table hover>
                <thead>
                  <tr>
                    <th>Book Details</th>
                    <th>Author</th>
                    <th>Created Date</th>
                    <th>Language</th>
                  </tr>
                </thead>
                <tbody>
                    {bookdata.map((data) =>(
                      <tr key={data.ISBN} className="bookRow">
                        <td><img src={data.bookCover} className="thubnail"/> <label>{data.title}</label></td>
                        <td><label>{data.author}</label></td>
                        <td><label>{data.date}</label></td>
                        <td><label>{data.language}</label></td>
                        <td><BiDotsVerticalRounded/> </td>
                      </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </Col>
        </Row>
    </Container>
  );
}

function GetBookLists() {
  let [bookdata , setData] = useState([]);
  useEffect(() => {
    getBookData().then((lists) => {
      lists.forEach((ele) => {
        var data = ele.data();
        setData(arr => [...arr , data]);
        // setIsLoading(false);
      });
    }).catch((err) => console.log(err));
  }, []);
  return { bookdata };
}