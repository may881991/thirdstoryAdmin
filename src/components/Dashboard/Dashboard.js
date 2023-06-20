import React, {useEffect , useState, Fragment} from 'react';
import { deleteBook, getBookData } from '../../firebase.js';
import { Container , Row, Col ,Table , Button, Form, Modal} from "react-bootstrap";
import { BiEdit, BiTrash} from "react-icons/bi"; 
import BookModal from "../Modal/Modal";
import "./Dashboard.css";
import Loading from '../Loading/Loading'; 
import Data from 'react-data-pagination';
import Sidebar from '../Sidebar/Sidebar.js';

function Dashboard(){  
  // const { bookdata } = GetBookLists(); 
  const [loading, setLoading] = useState(true)
  const [bookdata , getData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("create");
  const [bookInfo, setData] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [showDelete, setShow] = useState(false);
  const [delBookData, setDeleteData] = useState({});

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

  function deleteBookInfo() {
    let delData = delBookData.data;
    console.log(delData) 
    setShow(false)
    deleteBook(delData.id).then(() => {
        setData(filteredResults.filter((item) => item.id !== delData.id));
    });
}

  const DataContainer = () => {
    return(
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
    );
};

  const DataList = (props) => { 
    const dataset = props.dataset;
    return(
        <Fragment>
            <tbody> 
              {dataset.map((data) =>(
                  <tr key={data.ISBN} className="bookRow">
                    <td><img src={data.bookCover} alt="thumbnail" className="thubnail"/></td>
                    <td><label>{data.title}</label></td>
                    <td><label>{data.author}</label></td>
                    <td><label>{data.date}</label></td>
                    <td><label>{data.language}</label></td>
                    <td className='editIcon'> 
                      <BiEdit fill='#102E46' className='me-3' onClick={() => editBookInfo({data})}/>
                      <BiTrash fill='#FF0100' onClick={() => {setShow(true); setDeleteData({ data })}} />
                    </td>
                  </tr>
              ))}
            </tbody>
        </Fragment>
    );

};
  return(
    <>
      {loading === false ? (
        <Container fluid className='p-0'>
            <Row>
              <Sidebar />
              <Col lg={10} md={9} className="ms-sm-auto px-md-4">
                <Container>
                  <Row className="flex-nowrap justify-content-between">
                    <Col md={2}>
                      <h5 className='p-3'>All Books</h5>
                    </Col>
                    <Col md={7} className='py-3'>
                      <Form id='search' className='p-1 col-md-10 mx-auto'>
                          <Form.Control type="email" placeholder="Search book titles and keywords" className='text-center'  onChange={(e) => searchItems(e.target.value)}/>
                      </Form>
                    </Col>
                    <Col md={3} className="d-flex align-items-center justify-content-end">
                      <Button variant="primary"  onClick={() => {setShowModal(true); setStatus("create")}}>Create Book</Button>
                      <BookModal show={showModal} close={() => setShowModal(false)} status={status} book={bookInfo}/>
                    </Col>
                  </Row>
                </Container>
                <Container className='book-container'>
                  <Table hover>
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
                                  <td className='editIcon'> 
                                    <BiEdit fill='#102E46' className='me-3' onClick={() => editBookInfo({data})}/>
                                    <BiTrash fill='#FF0100' onClick={() => {setShow(true); setDeleteData({ data })}} />
                                  </td>
                                </tr>
                              )
                          })}
                      </>
                ) : (
                    <> 
                      <Data
                        dataset={bookdata}
                        offset={0}
                        rows={5}
                        dataBody={DataContainer}
                        dataList={DataList}
                        wrapper="table"
                        wrapperCssClass="striped"
                        buttonCssClass="button"
                      />
                    </>
                )}
                    </tbody>
                  </Table>
                </Container>
              </Col>
            </Row>
            <Modal show={showDelete} onHide={() => setShow(false)} centered aria-labelledby="deleteModal">
              <Modal.Header closeButton>
              <Modal.Title id="deleteModal">
                  Are you sure to delete this story?
              </Modal.Title>
              </Modal.Header> 
              <Modal.Footer>
                  <Button variant="danger"   onClick={() => setShow(false)}> No </Button>
                  <Button variant="success"  onClick={() => deleteBookInfo()}> Yes</Button>
              </Modal.Footer>
          </Modal>
        </Container> 
    ) : (
          <Loading />
        )}
      </>
  );
}
export default Dashboard;