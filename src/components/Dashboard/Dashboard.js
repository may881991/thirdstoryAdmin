import React, {useEffect , useState} from 'react';
import { getBookData } from '../../firebase.js';
import { Navbar, Container , Row, Nav, Col ,Table , Button} from "react-bootstrap";
import { BiBook , BiBulb, BiEdit} from "react-icons/bi";
import BookModal from "../Modal/Modal";
import "./Dashboard.css";
import Loading from '../Loading/Loading';
import logo from "./../../assets/images/Logo.png";

function Dashboard(){  
  // const { bookdata } = GetBookLists(); 
  const [loading, setLoading] = useState(true)
  const [bookdata , getData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("create");
  const [bookInfo, setData] = useState({});

  useEffect(() => {
    getBookData().then((lists) => {
      console.log("Dashboard")
      console.log(lists.docs)
      var arrBook = [];
      lists.forEach((ele) => {
        arrBook.push(ele.data());
      });
      getData(arrBook);
      setLoading(false);
    }).catch((err) => console.log(err));
  }, []);
  console.log(bookdata)

  function editBookInfo(book){
    let getBookInfo = book.data;
    setShowModal(true)
    setStatus("edit")
    setData(bookInfo => ({...bookInfo,...getBookInfo}));
  }

  return(
    <>
      {loading === false ? (
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
                
                <Row className="flex-nowrap justify-content-between">
                  <Col md={2}>
                    <h5 className='py-3'>All Books</h5>
                  </Col>
                  <Col md={3} className="d-flex align-items-center justify-content-end">
                    <Button variant="primary"  onClick={() => setShowModal(true)}>Create Book</Button>
                    <BookModal show={showModal} close={() => setShowModal(false)} status={status} book={bookInfo}/>
                  </Col>
                </Row>
                <Container className='book-container'>
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
                            <td className='editIcon'> <BiEdit onClick={() => editBookInfo({data})}/></td>
                          </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </Col>
            </Row>
        </Container> 
    ) : (
          <Loading />
        )}
      </>
  );
}
export default Dashboard;