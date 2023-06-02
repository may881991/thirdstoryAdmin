import React, {useEffect , useState} from 'react';
import { getStoriesData , deleteStory } from '../../firebase.js';
import { Container , Row,  Col ,Table , Button, Modal} from "react-bootstrap";
import { BiEdit, BiTrash} from "react-icons/bi"; 
import Loading from '../Loading/Loading'; 
import Sidebar from '../Sidebar/Sidebar.js';
import StoriesModal from '../StoriesModal/StoriesModal.js';

function Stories(){   
  const [loading, setLoading] = useState(true)
  const [storiesLists , addData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("create");
  const [activityInfo, setData] = useState({});
  const [showDelete, setShow] = useState(false);
  const [delstoryData, setDeleteData] = useState({});

  useEffect(() => {
    getStoriesData().then((lists) => {
      var arrStories = [];
      lists.forEach((ele) => {
        arrStories.push(ele.data());
      });
      addData(arrStories);
      setLoading(false);
    }).catch((err) => console.log(err));
  }, []);
  console.log(storiesLists)

  function editStoryInfo(story){
    let getActInfo = story.data;
    setShowModal(true)
    setStatus("edit")
    setData(actInfo => ({...actInfo,...getActInfo}));
  }

  function deleteStoryInfo() {
    let delData = delstoryData.data;
    console.log(delData) 
    setShow(false)
    setLoading(true);
    deleteStory(delData.id).then((res) => {
        addData(storiesLists.filter((item) => item.id !== delData.id));
        window.location.reload();
    });
}

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
                      <h5 className='p-3'>All Stories</h5>
                    </Col>
                    <Col md={3} className="d-flex align-items-center justify-content-end">
                      <Button variant="primary"  onClick={() => {setShowModal(true); setStatus("create")}}>Create Stories</Button>
                      <StoriesModal show={showModal} close={() => setShowModal(false)} status={status} activity={activityInfo}/>
                    </Col>
                  </Row>
                </Container>
                <Container className='book-container'>
                  <Table hover>
                    <thead>
                      <tr> 
                        <th>No.</th>
                        <th>Title</th>
                        <th>Youtube Link</th> 
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                        {storiesLists.map((data, index) =>(
                          <tr key={index} className="bookRow">
                            <td className='col-md-1'><label>{index + 1}.</label></td>
                            <td className='col-md-4'><label>{data.title}</label></td>
                            <td className='col-md-4'><a href={data.url} target='_blank'>{data.url}</a></td>
                            <td className='col-md-1'><label>{data.date}</label></td>
                            <td className='col-md-1 editIcon'> 
                              <BiEdit fill='#102E46' className='me-3' onClick={() => editStoryInfo({data})}/>
                              <BiTrash fill='#FF0100' onClick={() => {setShow(true); setDeleteData({ data })}} />
                            </td>
                          </tr>
                        ))}
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
                  <Button variant="success"  onClick={() => deleteStoryInfo()}> Yes</Button>
              </Modal.Footer>
          </Modal>
        </Container> 
    ) : (
          <Loading />
        )}
      </>
  );
}
export default Stories;