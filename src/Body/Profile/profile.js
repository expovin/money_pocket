import React, { Component } from 'react';
import {Row, Col, Container, Card } from 'react-bootstrap';
import {Image} from 'react-bootstrap';
import './profile.css'


class Profile extends Component {

    render(){
        return( 

            <Container id="loginCard">
                <h1 className="title">Profilo utente</h1>
                <Row>
                    <Col>
                        <Image className="Avatar img-fluid" src={this.props.me.profilePicture} alt={this.props.me.firstName} width="350px"/> 
                    </Col>

                    <Col>
                        <div id="Profile">
                            <Card style={{ width: '28rem' }}>
                            <Card.Header>{this.props.me.firstName} {this.props.me.lastName}</Card.Header>
                            <Card.Body>
                                <dl class="row">
                                    <dt class="col-sm-3">User Id</dt>
                                    <dd class="col-sm-9">{this.props.me.userId}</dd>

                                    <dt class="col-sm-3">Profilo</dt>
                                    <dd class="col-sm-9">{this.props.me.Gruppo}</dd>                                    

                                    <dt class="col-sm-3">Emain</dt>
                                    <dd class="col-sm-9">{this.props.me.email}</dd>                                      
                                </dl>
                            </Card.Body>
                            </Card> 
                        </div>                   
                    </Col>
                </Row>
            </Container>
          )
    
      }
}

export default Profile;
