import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faHome } from '@fortawesome/free-solid-svg-icons'


function MyNavbar(props) {


    return (

            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/"><FontAwesomeIcon icon={faHome} size="lg"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav></Nav>
                <Nav>
                    <Nav.Link href="wishlist">Lista Desideri</Nav.Link>
                    <Nav.Link href="login"> Accedi <FontAwesomeIcon icon={faSignInAlt} size="lg"/></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>

    );
  }
  
  export default MyNavbar;