import React, { Component } from 'react';
import {Alert, Table, Accordion, Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faHome, faSignOutAlt, faUser, faGift } from '@fortawesome/free-solid-svg-icons';

class ErrorLog extends Component {

    flatError = (Obj) =>{
        let table=[]

        if(Obj){
            let config = Object.keys(Obj);
            console.log(config);            
            table = config.map( (key,idx) =>{
                return (
                    <tr key={idx}>
                        <td className="key">{key}</td>
                       {typeof(Obj[key]) !== 'object'? <td className="value">{this.cutLongString(Obj[key])}</td> : this.flatError(Obj[key]) }
                    </tr>  
                )
            })
        }


        return(table) 
    }

    cutLongString = (string) => {
        
        if(string && string.length > 100)
            return (string.substring(0,100)+"...")
        else
            return string
    }

    moreDetails = () => {
        return(
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {this.flatError(this.props.msgError.msg.config)}
                </tbody>
                </Table>         
        )
    }

    AlertDismissible = () => {
        //const [show, setShow] = useState(true);        
      
        if (this.props.showError) {
          return (
            <Alert variant={this.props.msgError.variant} onClose={this.props.closeErrorMessage} dismissible>
              <Alert.Heading>{this.props.msgError.heading}</Alert.Heading>
                <p><b>{this.props.msgError.msg.message}:</b> {this.props.msgError.msg.name}</p>
                <p>{this.props.msgError.msg.stack}</p>

                <Accordion>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            More details
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body> {this.moreDetails()}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

               
            </Alert>
          );
        }
      }


    render(){
        return (
            <div>
                {this.AlertDismissible()}
            </div>
        )
    }

  }
  
  export default ErrorLog;