import React, { Component } from 'react';
import {Col, Row, Image, Card, CardColumns} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faGamepad } from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';
import './contributo.css';

class Contributo extends Component {


    iconConto = (TipoConto) =>{
        switch(TipoConto) {
            case "Wishlist" : return (<FontAwesomeIcon icon={faGamepad} size="lg" color="blue"/>);
            case "Risparmio" : return(<FontAwesomeIcon icon={faPiggyBank} size="lg" color="pink"/>)
        }
    }

    header = () =>{
        return(
            <Card.Header>
                <Row>
                    <Col sm={10}>
                        <Card.Title>... da {this.props.contributo.FriendlyName || this.props.contributo.firstName+" "+this.props.contributo.lastName}</Card.Title>
                    </Col>
                    <Col sm={2}>
                        {this.iconConto(this.props.contributo.TipoConto)}
                    </Col>
                </Row>
            </Card.Header>
        )
    }

    residuoColor = (importo, residuro) =>{
        let fraction = (residuro / importo) * 100;
        
        console.log("FRACTION ==> "+fraction)

        if(fraction >= 80)
            return ('full')
        else if ((fraction < 80) && (fraction >= 20))
            return ('half')
        else if (fraction<20) return ('empty')

    }
   
    render(){
        console.log(this.props.contributo)

        return( 
            <Col sm={4}>
                <Card style={{ width: '20rem', height:'350px', marginLeft:'10px', marginTop:'10px' }}>
                    {this.header()}
                <Card.Body>
                    <Card.Subtitle>Versamento di {this.props.contributo.Importo} €</Card.Subtitle>
                    <Card.Text>
                        <p>Data versamento {Moment(this.props.contributo.DataVersamento).format('d MMM YYYY') }</p>
                        <p>Questo versamento è stato effettuato sul conto <b>{this.props.contributo.NomeConto}</b></p>
                        <p>da <a href={"mailto:"+this.props.contributo.email}>{this.props.contributo.firstName+" "+this.props.contributo.lastName}</a></p>
                    </Card.Text>            
                    <Card.Link href="#">Leggi Messaggi</Card.Link>
                    <Card.Link href="#">Vedi Media</Card.Link>
                </Card.Body>
                <Card.Footer className={this.residuoColor(this.props.contributo.Importo, this.props.contributo.Residuo)}>
                    <small>Residui {this.props.contributo.Residuo} €</small>
                </Card.Footer>                
                </Card>                  
            </Col>
          )
    
      }    

}


export default Contributo;