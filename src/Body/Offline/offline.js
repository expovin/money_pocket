import React from 'react';
import {Button, Card, Container} from 'react-bootstrap';

function OffLine(props) {
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Errore di connessione</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Backend non raggioungibile</Card.Subtitle>
                    <Card.Text>Il backend non sembra raggiungibile, riprova tra qualche istante</Card.Text>
                    <Button variant="primary" onClick={props.forceOnline}>Vai ON-LINE</Button>
                </Card.Body>
            </Card>
        </Container>

    );
  }
  
  export default OffLine;