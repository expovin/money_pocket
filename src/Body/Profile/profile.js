import React, { Component } from 'react';
import {Row, Col, Container, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {Image} from 'react-bootstrap';
import './profile.css'


class Profile extends Component {

    state = {
        friendNameEdit:false
    }

    formData = {
        friendlyName:""
    }

    friendName = () =>{
        if(this.state.friendNameEdit) 
            return ({tag : <Form.Control type="text" name="FriendlyName" onChange={this.handleChangeName} placeholder={this.props.me.FriendlyName}/>, 
            icon: <Row><Col><FontAwesomeIcon icon={faCheckCircle} onClick={this.doneFriendlyName} size="md" color="green"/></Col>
                       <Col><FontAwesomeIcon icon={faTimesCircle} onClick={this.cancelFriendlyName} size="md" color="red"/></Col>
                   </Row>})
        else
            return({tag : this.props.me.FriendlyName, icon:<FontAwesomeIcon icon={faPencilAlt} onClick={this.editFriendlyName} size="md" color="orange"/> })
    }

    editFriendlyName = () =>{ this.setState({friendNameEdit:true})}
    cancelFriendlyName = () =>{ this.setState({friendNameEdit:false})}
    doneFriendlyName = () =>{  
        this.props.setNewFriendlyName(this.formData.friendlyName)
        .then(result => this.setState({friendNameEdit:false}))
        .catch(error => console.log("KO"))
    }

    handleChangeName = (event) =>{this.formData.friendlyName=event.target.value}

    render(){
        return( 

            <Container>
                <h1 className="title">Profilo utente</h1>
                <Row>
                    <Col>
                            <Card style={{ width:'100%' }}>
                            <Card.Header as="h3">{this.props.me.firstName} {this.props.me.lastName}</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col sm={4}>
                                        <Image className="Avatar img-fluid" src={this.props.me.profilePicture} alt={this.props.me.firstName} width="200px"/> 
                                    </Col>
                                    <Col>
                                        <dl class="row">
                                            <dt class="col-sm-3">User Id</dt>
                                            <dd class="col-sm-9">{this.props.me.userId}</dd>

                                            <dt class="col-sm-3">Profilo</dt>
                                            <dd class="col-sm-9">{this.props.me.Gruppo}</dd>                                    

                                            <dt class="col-sm-3">Emain</dt>
                                            <dd class="col-sm-8">{this.props.me.email}</dd>
                                            <dd class="col-sm-1"><FontAwesomeIcon icon={faPencilAlt} size="sm" color="orange"/></dd>

                                            <dt class="col-sm-3">Friendly Name</dt>
                                            <dd class="col-sm-8">{this.friendName().tag}</dd>
                                            <dd class="col-sm-1">{this.friendName().icon}</dd>
                                        </dl>                                    
                                    </Col>
                                </Row>
                            </Card.Body>
                            </Card>                  
                    </Col>
                </Row>
            </Container>
          )
    
      }
}

export default Profile;
