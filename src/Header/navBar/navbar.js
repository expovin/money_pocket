import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';


function MyNavbar(props) {


    return (

            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav></Nav>
                <Nav>
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link >New Device</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>

    );
  }
  
  export default MyNavbar;