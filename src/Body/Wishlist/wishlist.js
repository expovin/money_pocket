import React, { Component } from 'react';
import {Row, Col, Container, Image, Card, Button, ProgressBar} from 'react-bootstrap';
import './wishlist.css'

class Wishlist extends Component {

    state={
        Wishlist:{},
        contentDataReady:false
    }

    componentDidMount(){
        this.props.getWishlist(window.location.hostname)
        .then(Wishlist => this.setState({Wishlist : Wishlist, contentDataReady : true}))
    }

    loading = () => {
        console.log("[loading]")
        return(
            <div className="loader">Loading...</div>
        )
    }    

    progress = (totale, contributi) =>{
        let p = parseInt((contributi / totale) * 100);
        let v = "success"

        switch (true) {
            case (p > 99):
                console.log(p+" < "+99)
                v="primary"
                break;
            case (p > 80):
                console.log(p+" < "+80)
                v="info"
                break;
            case (p > 50):
                console.log(p+" < "+50)
                v="warning"
                break;
            case (p > 20):
                console.log(p+" < "+20)
                v="secondary"
                break;
            case (p > 5):
                console.log(p+" < "+5)
                v="danger"
                break;               
        }

        console.log("Frazione : "+p+" Colore :"+v)
        return({frazione:p, colore:v})
    }

    cards = () =>{
        let snippet = this.state.Wishlist.map( w =>{
            return(
                <Col sm>
                    <Card style={{ width: '18rem', margin: '10px'}}>
                        <Card.Img variant="top" src={w.img} style={{height: '300px', width:'auto'}}/>
                        <Card.Body>
                            <Card.Title>{w.Titolo}</Card.Title>
                            <Card.Text> {w.Descrizione}</Card.Text>
                            <ProgressBar label={this.progress(w.Prezzo, w.Residuo).frazione+"%"} variant={this.progress(w.Prezzo, w.Residuo).colore} now={this.progress(w.Prezzo, w.Residuo).frazione} />
                            <hr />
                            <Button variant="primary">Dettagli</Button>
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
                        {this.cards()}                      

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
