import React, { Component } from 'react';
import {Row, Col, Container, Image, Card, Button, ProgressBar} from 'react-bootstrap';

class Wishlist extends Component {
    render(){
        return( 
            <div>
                <Container>
                    <Row>
                        <h2>Lista desideri</h2>
                    </Row>
                    <Row>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://s2.gaming-cdn.com/images/products/6151/orig/pokemon-mystery-dungeon-rescue-team-dx-switch-cover.jpg" />
                                <Card.Body>
                                    <Card.Title>Pokemon Mistery Dungeon</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                    </Card.Text>
                                    <ProgressBar variant="success" now={60} />
                                    <hr />
                                    <Button variant="primary">Dettagli</Button>
                                </Card.Body>
                            </Card>                          
                        </Col>

                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://s2.gaming-cdn.com/images/products/4810/orig/luigis-mansion-3-switch-cover.jpg" />
                                <Card.Body>
                                    <Card.Title>Luigi Mansion 3</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                    </Card.Text>
                                    <ProgressBar variant="info" now={20} />
                                    <hr />
                                    <Button variant="primary">Dettagli</Button>
                                </Card.Body>
                            </Card>                          
                        </Col>                        

                    </Row>
                </Container>
            </div>
          )
    
      }
}

export default Wishlist;
