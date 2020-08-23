import React, { Component } from 'react';
import {Row, Col, Container, Image, Card, Button, ProgressBar} from 'react-bootstrap';
import Contributi from '../Contributi/contributi'
import './wishlist.css'

class Wishlist extends Component {

    state={
        Wishlist:{},
        contentDataReady:false,
        contributiView:false
    }

    componentDidMount(){
        this.props.getWishlist(window.location.hostname)
        .then(Wishlist => this.setState({Wishlist : Wishlist, contentDataReady : true}))
    }

    loading = () => {
        return(
            <div className="loader">Loading...</div>
        )
    }    

    progress = (totale, contributi) =>{
        let p = parseInt((contributi / totale) * 100);
        let v = "success"

        switch (true) {
            case (p > 99):
                v="primary"
                break;
            case (p > 80):
                v="info"
                break;
            case (p > 50):
                v="warning"
                break;
            case (p > 20):
                v="secondary"
                break;
            case (p > 5):
                v="danger"
                break;               
        }
        return({frazione:p, colore:v})
    }

    contributi = (conto, ObjId) =>{
        let Oggetto  = this.state.Wishlist.filter( o => { return o.ObjId === ObjId})

        this.setState({contributiView:true, 
                        ContoSelezionato:conto,
                        OggettoSelezionato: Oggetto});
        
        
    }

    listaContributi = () =>{
        
        return(
            <div>
                {this.cards(this.state.OggettoSelezionato)}
                <br />
                <Contributi getContributi={this.props.getContributi}
                        ruolo={this.props.ruolo}
                        getMessaggi={this.props.getMessaggi}
                        getMedias={this.props.getMedias} 
                        Conto={this.state.ContoSelezionato}/>                 
            </div>

        )
    }

    cards = (Oggetti) =>{
        let snippet = Oggetti.map( w =>{
            return(
                <Col sm={1} md={4} lg={6}>
                    <Card style={{ width: '18rem', margin: '10px'}}>
                        <Card.Img variant="top" src={w.img} style={{height: '300px', width:'auto'}}/>
                        <Card.Body>
                            <Card.Title>{w.Titolo}</Card.Title>
                            <Card.Text> {w.Descrizione}</Card.Text>
                            <ProgressBar label={this.progress(w.Prezzo, w.Residuo).frazione+"%"} variant={this.progress(w.Prezzo, w.Residuo).colore} now={this.progress(w.Prezzo, w.Residuo).frazione} />
                            <hr />
                            {this.props.isLogged ? 
                            <div>
                                <Button variant="primary" onClick={() => this.contributi(w.ContoId, w.ObjId)}>Dettagli</Button> {' '}
                                <Button variant="success" onClick={() => this.props.contribuisci(w.ContoId)}>Contribuisci</Button>
                            </div>
                            : null}
                        </Card.Body>
                    </Card> 
                </Col>  
            )
    
        }) 
        return snippet;
    }

   

    pageReady = () =>{
    
        return(
            <div>
                <Container>
                    <Row>
                        <h2>Lista desideri</h2>
                    </Row>
                    <Row>
                        {!this.state.contributiView ? this.cards(this.state.Wishlist) : this.listaContributi()}                      
                    </Row>
                </Container>
            </div>
        )
    }

    render(){
        return( 
            <div>
                {this.state.contentDataReady ? this.pageReady() : this.loading()}
            </div>
            
          )
    
      }
}

export default Wishlist;
