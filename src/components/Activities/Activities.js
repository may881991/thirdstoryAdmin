import React, {useEffect , useState} from 'react';
import { getActivitiesData } from '../../firebase.js';
import { Navbar, Container , Row, Nav, Col ,Table , Button} from "react-bootstrap";
import { BiBook , BiBulb, BiEdit} from "react-icons/bi";
import ActivityModal from "../ActivitiesModal/ActivitiesModal";
import "./Activities.css";
import Loading from '../Loading/Loading';
import logo from "./../../assets/images/Logo.png";

function Activities(){  
  // const { bookdata } = GetBookLists(); 
  const [loading, setLoading] = useState(true)
  const [activitiyLists , addData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("create");
  const [activityInfo, setData] = useState({});

  useEffect(() => {
    getActivitiesData().then((lists) => {
      var arrActivity = [];
      lists.forEach((ele) => {
        arrActivity.push(ele.data());
      });
      addData(arrActivity);
      setLoading(false);
    }).catch((err) => console.log(err));
  }, []);
  console.log(activitiyLists)

  function editActivityInfo(activity){
    let getActInfo = activity.data;
    setShowModal(true)
    setStatus("edit")
    setData(actInfo => ({...actInfo,...getActInfo}));
  }

  return(
    <>
      {loading === false ? (
        <Container fluid className='p-0'>
            <Row>
              <Nav variant="pills" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse" defaultActiveKey="/activities">
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
              </Nav>
              <Col lg={10} md={9} className="ms-sm-auto px-md-4">
                <Container>
                  <Row className="flex-nowrap justify-content-between">
                    <Col md={2}>
                      <h5 className='py-3'>All Activities</h5>
                    </Col>
                    <Col md={3} className="d-flex align-items-center justify-content-end">
                      <Button variant="primary"  onClick={() => setShowModal(true)}>Create Activities</Button>
                      <ActivityModal show={showModal} close={() => setShowModal(false)} status={status} activity={activityInfo}/>
                    </Col>
                  </Row>
                </Container>
                <Container className='book-container'>
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Photo</th>
                        <th>Description</th>
                        <th>Created Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                        {activitiyLists.map((data, index) =>(
                          <tr key={index} className="bookRow">
                            <td className='col-md-2'><label>{data.title}</label></td>
                            <td className='col-md-3'><img src={data.image}/></td>
                            <td className='col-md-6'><label>{data.description}</label></td>
                            <td className='col-md-1 text-end'><label>{data.createdDate}</label></td>
                            <td className='editIcon'> <BiEdit onClick={() => editActivityInfo({data})}/></td>
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
export default Activities;