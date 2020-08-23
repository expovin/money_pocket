import React, { Component } from 'react';
import {Row, Col, Container, Card, Form } from 'react-bootstrap';
import './login.css'



class Login extends Component {

    state = {
        trusted:false
    }

    handleChang = (event) => {
        console.log(event.target.checked)
        this.setState({trusted: event.target.checked})
    }       

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
                                <a href={process.env.REACT_APP_BASE_URL+"auth/google?state="+this.hostname()+"|"+this.state.trusted} className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i>Sign in with Google</a> 
                                <a href={process.env.REACT_APP_BASE_URL+"auth/facebook?state="+this.hostname()+"|"+this.state.trusted} className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</a>
                            </Card.Body>
                            <Card.Footer>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Questo è un dispositivo fidato" onChange={this.handleChang}/>
                                </Form.Group>        
                                {this.state.trusted ? <p>Questo dispositivo sarà autenticato per 1 settimana</p> : null}                        
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
          )
    
      }
}

export default Login;
