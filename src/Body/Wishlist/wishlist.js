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

    cards = () =>{
        let snippet = this.state.Wishlist.map( w =>{
            return(
                <Col sm>
                    <Card style={{ width: '18rem', margin: '10px'}}>
                        <Card.Img variant="top" src={w.img} style={{height: '300px', width:'auto'}}/>
                        <Card.Body>
                            <Card.Title>{w.Titolo}</Card.Title>
                            <Card.Text> {w.Descrizione}</Card.Text>
                            <ProgressBar variant="success" now={60} />
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
