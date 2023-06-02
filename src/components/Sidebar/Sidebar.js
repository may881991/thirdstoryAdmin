import React from 'react'; 
import { Nav } from "react-bootstrap";
import { BiBook, BiBulb, BiLogOut, BiMoviePlay } from "react-icons/bi"; 
import logo from "./../../assets/images/Logo.png"; 
import { useLocation } from "react-router-dom";
import { logout } from '../../firebase.js';

export default function Sidebar() {
    const location = useLocation() 
    return (
        <Nav variant="pills" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse" defaultActiveKey={location.pathname}>
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
            <Nav.Link href="/stories"><BiMoviePlay /> Stories </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/" onClick={logout}><BiLogOut />Sign Out</Nav.Link>
          </Nav.Item>
        </Nav>
    );
} 