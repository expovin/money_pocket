import React, { Component } from 'react';
import {Col, Row, Image, Card} from 'react-bootstrap';
import './messaggio.css'

class Messaggio extends Component {

    render(){
        return(
            <Row className="messaggioBox">
                <Col sm={4}>
                    <Image className="img-fluid" src={this.props.messaggio.Copertina} alt={this.props.messaggio.Copertina} width="150px"/> 
                </Col>
                <Col sm={8}>
                        <h5>{this.props.messaggio.Titolo}</h5>
                        <p>{this.props.messaggio.Testo}</p>                  
                </Col>
            </Row>

            
        )
    }

}

export default Messaggio;