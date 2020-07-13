import React, { Component } from 'react';
import {Row, Col, Container, Card } from 'react-bootstrap';




class Logout extends Component {


    componentDidMount(){
        localStorage.removeItem('token');
    }

    render(){
        return( 
            <Container id="loginCard">
                <Row>
                    <Col>
                        <h1>Alla prossima</h1>
                    </Col>
                </Row>
            </Container>
          )
    
      }
}

export default Logout;
