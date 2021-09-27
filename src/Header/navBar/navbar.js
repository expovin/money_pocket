import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Image} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faHome, faSignOutAlt, faUser, faGift } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

class MyNavbar extends Component {

    note =() =>{
        return(
            this.props.isLogged && (this.props.me.Gruppo !== "Ordinario") ?
            <Nav.Link href="note">Note</Nav.Link> : null
        )
    }    

    admin =() =>{
        return(
            this.props.isLogged && (this.props.me.Gruppo !== "Ordinario" && this.props.me.Gruppo !== "Nanny") ?
            <Nav.Link href="risparmi">I miei Risparmi</Nav.Link> : null
        )
    }
          
    login = () => {
        return (
            this.props.isLogged ? 
                <NavDropdown title={<Image className="Avatar img-fluid" src={this.props.me.profilePicture} alt={this.props.me.firstName}  width="30" />} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/profilo"><FontAwesomeIcon icon={faUser} size="lg"/> Profilo</NavDropdown.Item>
                    <NavDropdown.Item href="/contributi"><FontAwesomeIcon icon={faGift} size="lg"/> Contributi</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/logout"><FontAwesomeIcon icon={faSignOutAlt} size="lg"/> Esci</NavDropdown.Item>
                </NavDropdown>
                :
                <Nav.Link href="login"> Accedi <FontAwesomeIcon icon={faSignInAlt} size="lg"/></Nav.Link>
        )
    }

    render(){
        return (

            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/"><FontAwesomeIcon icon={faHome} size="lg"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav></Nav>
                <Nav>
                    <Nav.Link href="wishlist">Lista Desideri</Nav.Link>
                    {this.note()}
                    {this.admin()}
                    {this.login()}
                </Nav>
            </Navbar.Collapse>
            </Navbar>

    )}

  }
  
  export default MyNavbar;