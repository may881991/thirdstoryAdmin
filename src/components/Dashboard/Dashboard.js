import React, {useEffect , useState} from 'react';
import { getBookData, logout } from '../../firebase.js';
import { Container , Row, Nav, Col ,Table , Button, Form} from "react-bootstrap";
import { BiBook , BiBulb, BiEdit, BiLogOut} from "react-icons/bi";
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
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

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

  function editBookInfo(book){
    let getBookInfo = book.data;
    console.log(getBookInfo)
    setShowModal(true)
    setStatus("edit")
    setData(bookInfo => ({...bookInfo,...getBookInfo}));
  } 
  const searchItems = (searchValue) => {
    console.log(searchValue)
      setSearchInput(searchValue)
      if (searchInput !== '') {
          const filteredData = bookdata.filter((item) => {
              return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
          })
          setFilteredResults(filteredData)
      }
      else{
          setFilteredResults(bookdata)
      }
  }

  return(
    <>
      {loading === false ? (
        <Container fluid className='p-0'>
            <Row>
              <Nav variant="pills" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse" defaultActiveKey="/dashboard">
                <Nav.Item>
                <div className="text-center mb-3">
                    <img alt={logo} src={logo} className="logo"/>
                </div>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/dashboard"><BiBook /> Books</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/activities"><BiBulb />Activities</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/" onClick={logout}><BiLogOut />Sign Out</Nav.Link>
                </Nav.Item>
              </Nav>
              <Col lg={10} md={9} className="ms-sm-auto px-md-4">
                <Container>
                  <Row className="flex-nowrap justify-content-between">
                    <Col md={2}>
                      <h5 className='py-3'>All Books</h5>
                    </Col>
                    <Col md={7} className='py-3'>
                      <Form id='search' className='p-1 col-md-10 mx-auto'>
                          <Form.Control type="email" placeholder="Search book titles and keywords" className='text-center'  onChange={(e) => searchItems(e.target.value)}/>
                      </Form>
                    </Col>
                    <Col md={3} className="d-flex align-items-center justify-content-end">
                      <Button variant="primary"  onClick={() => setShowModal(true)}>Create Book</Button>
                      <BookModal show={showModal} close={() => setShowModal(false)} status={status} book={bookInfo}/>
                    </Col>
                  </Row>
                </Container>
                <Container className='book-container'>
                  <Table hover>
                    <thead>
                      <tr>
                        <th><strong>Cover</strong></th>
                        <th><strong>Title</strong></th>
                        <th><strong>Author</strong></th>
                        <th><strong>Created Date</strong></th>
                        <th><strong>Language</strong></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {searchInput.length > 1 ? (
                      <>
                          {filteredResults.map((data) => {
                              return (
                                <tr key={data.ISBN} className="bookRow">
                                  <td><img src={data.bookCover} alt="thumbnail" className="thubnail"/></td>
                                  <td><label>{data.title}</label></td>
                                  <td><label>{data.author}</label></td>
                                  <td><label>{data.date}</label></td>
                                  <td><label>{data.language}</label></td>
                                  <td className='editIcon'> <BiEdit onClick={() => editBookInfo({data})}/></td>
                                </tr>
                              )
                          })}
                      </>
                ) : (
                    <> 
                      {bookdata.map((data) =>(
                          <tr key={data.ISBN} className="bookRow">
                            <td><img src={data.bookCover} alt="thumbnail" className="thubnail"/></td>
                            <td><label>{data.title}</label></td>
                            <td><label>{data.author}</label></td>
                            <td><label>{data.date}</label></td>
                            <td><label>{data.language}</label></td>
                            <td className='editIcon'> <BiEdit onClick={() => editBookInfo({data})}/></td>
                          </tr>
                      ))}
                    </>
                )}
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