import React, { Component } from 'react';
import {Row, Col, Container, Card } from 'react-bootstrap';
import './login.css'




class Login extends Component {

    render(){
        return( 
            <Container id="loginCard">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title><h5 className="title">Sign In</h5></Card.Title>
                                <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button> 
                                <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
          )
    
      }
}

export default Login;
