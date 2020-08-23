import React, { Component } from 'react';
import {Col, Row, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faGamepad, faDivide } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from "react-player"
import Messaggo from './Messaggio/messaggio';
//import Moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';
import './contributo.css';

class Contributo extends Component {

    state = {
        idxMessaggio : 0,
        mediaReady:false,
        medias:[]
    }

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

        if(fraction >= 80)
            return ('full')
        else if ((fraction < 80) && (fraction >= 20))
            return ('half')
        else if (fraction<20) return ('empty')

    }

    buttonText = () =>{
        return ( this.props.dettaglio ? "Chiudi" : "Visualizza Messaggi")
    }

    messages = (msg) =>{

        let m = msg.map(m =>{
            return(<ListGroupItem>{m}</ListGroupItem>)
        })

        return(
            <ListGroup className="list-group-flush">  
                {m}
            </ListGroup> 
        )      
    }

    messagesRow = (msg) =>{
        let m = msg.map(m =>{
            return(<ul className="messages">{m}</ul>)
        })

        return(
            <li>  
                {m}
            </li> 
        )      
    }    

    card = () =>{
        return(
            <Col sm={4}>
                <Card style={{ marginLeft:'10px', marginTop:'10px' }}>
                    {this.header()}
                <Card.Body>
                    <Card.Subtitle>Versamento di {this.props.contributo.Importo} €</Card.Subtitle>
                    <Card.Text>
                        
                        <p>Data Versamento : <Moment format="DD MMM YYYY" date={this.props.contributo.DataVersamento}/></p>
                        <p>Questo versamento è stato effettuato sul conto <b>{this.props.contributo.NomeConto}</b></p>
                        <p>da <a href={"mailto:"+this.props.contributo.email}>{this.props.contributo.firstName+" "+this.props.contributo.lastName}</a></p>
                    </Card.Text>  
                    <h5>Messaggi</h5>
                    {this.messages(this.props.contributo.msg)}
                    <Button variant="primary" /*onClick={() => this.props.toggleDettaglio(this.props.contributo.VersamentoId)}*/>{this.buttonText()}</Button>
                </Card.Body>
                <Card.Footer className={this.residuoColor(this.props.contributo.Importo, this.props.contributo.Residuo)}>
                    <small>Residui {this.props.contributo.Residuo} €</small>
                </Card.Footer>                
                </Card>               
            </Col>
        )

    }


    row = () =>{
        return(
            <div className="rowData">
                <Row>
                    <Col>
                        {Moment(this.props.contributo.DataVersamento).format('d MMM YYYY') }
                    </Col>
                    <Col>
                        su <b>{this.props.contributo.NomeConto}</b>  
                    </Col>
                    <Col>
                        {this.props.contributo.firstName+" "+this.props.contributo.lastName} 
                    </Col>
                    <Col>
                        {this.props.contributo.Importo} €
                    </Col>                    
                </Row>
                <Row>
                    {this.messagesRow(this.props.contributo.msg)}
                </Row>
                                    
            </div>
        )

    }    

    dettaglio = ()=>{
        return(
            <div>
                <Row style={{ width: '100%'}}>
                    <Col sm={4}>                        
                        {this.card()}
                    </Col>
                    
                    <Col sm={8}>
                            <div className="Dettaglio">
                                    {this.messaggi()}
                            </div>
                            <div id="triangolo"></div>                        
                    </Col>                
                </Row>
                <Row>
                    {this.state.mediaReady ? this.medias(): null }
                </Row>
            </div>

        )
    }
    
    getMedia = (messageId) =>{        
        this.props.getMedias(messageId)
        .then( medias => {
            console.log(medias.data);
            this.setState({medias:medias.data, mediaReady:true})
        })
        .catch( error => console.log(error))
    }

    medias = () =>{
        return (this.state.medias.map( m =>{
            
            return (<ReactPlayer controls="true" url={m.Url}
                    config={{
                        youtube : { playerVars:{controls:false}}
                    }}/>)
            })
        )
    }


    messaggi = () =>{
        let msgId=""
        
        console.log("[messaggi] --> "+this.state.idxMessaggio)
        let msg = this.props.messaggi
        .filter( (m,idx) => idx === this.state.idxMessaggio)
        .map( (m) =>{
            msgId=m.MessaggioId;
            return <Messaggo key={m.MessaggioId} 
                            messaggio={m} 
                            getMedias={this.props.getMedias}
                            nextMessage={this.nextMessage}
                            prevMessage={this.prevMessage}
                            idxMsg={this.state.idxMessaggio}
                            numMsg={this.props.messaggi.length} />
        })        
        this.getMedia(msgId)
        return msg;
    }

    nextMessage = () => {this.setState({idxMessaggio: this.state.idxMessaggio+1}, () => {this.messaggi()})}
    prevMessage = () => {this.setState({idxMessaggio: this.state.idxMessaggio-1}, () => {this.messaggi()})}

   
    render(){

        console.log("[CONTRIBUTO]"+this.props.CardsVisualization)
        return( 
            this.props.CardsVisualization ? this.card() : this.row()
          )
    
      }    

}


export default Contributo;