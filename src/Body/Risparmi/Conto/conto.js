import React, { Component } from 'react';
import {Row, Col, Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faUniversity } from '@fortawesome/free-solid-svg-icons';
import './conto.css';

class Conto extends Component {

    tipoConto = (Tipo) =>{
        switch(Tipo) {
            case 'Risparmio' : return(<FontAwesomeIcon icon={faPiggyBank} size="4x" color="pink"/>);
            case 'Bank' : return(<FontAwesomeIcon icon={faUniversity} size="4x" color="green"/>);
        }
    }

    render(){
        return( 
            <Container id="conto">
                <Row>
                <Card style={{ width: '18rem' , marginTop:'20px', width:"100%"}}>
                    <Card.Body>
                        <Row>
                            <Col sm={2}> 
                                {this.tipoConto(this.props.conto.Tipo)}
                            </Col>
                            <Col sm={8}>
                                <Card.Title>{this.props.conto.Nome}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{this.props.conto.Tipo}</Card.Subtitle>
                                <Card.Text>{this.props.conto.Descrizione}</Card.Text>                        
                            </Col>
                            <Col sm={2}>
                                <h1 className="SaldoConto">{this.props.conto.Saldo} €</h1>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <Card.Link href="#">Versamenti</Card.Link>
                        <Card.Link href="#">Spendi</Card.Link>
                    </Card.Footer>
                </Card>
                </Row>
            </Container>
          )
    
      }
}

export default Conto;