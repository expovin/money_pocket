import React, { Component } from 'react';
import {Row, Col, Container, Card } from 'react-bootstrap';
import './login.css'


class Login extends Component {

    hostname = ()=>{
        let origin=window.location.protocol+"//"+window.location.host
        return(origin)
    }

    render(){
        return( 
            <Container id="loginCard">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title><h5 className="title">Sign In</h5></Card.Title>
                                <a href={process.env.REACT_APP_BASE_URL+"auth/google?state="+this.hostname()} className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i>Sign in with Google</a> 
                                <a href={process.env.REACT_APP_BASE_URL+"auth/facebook?state="+this.hostname()} className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</a>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
          )
    
      }
}

export default Login;
