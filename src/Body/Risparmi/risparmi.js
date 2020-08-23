import React, { Component } from 'react';
import Conto from './Conto/conto';
import {Row, Col, Container, Card } from 'react-bootstrap';
import Contributi from '../Contributi/contributi'



class Risparmi extends Component {

    state={
        Conti:[],
        contentDataReady:false
    }

    componentDidMount(){
        this.props.getConti()
        .then(conti => this.setState({Conti : conti.data, contentDataReady : true}))
        .catch( error => console.log(error))
    }

    loading = () => {
        console.log("[loading]")
        return(
            <div className="loader">Loading...</div>
        )
    }  

    contributi = (conto) =>{
        let Oggetto  = this.state.Conti.filter( c => { return c.ContoId === conto})

        this.setState({contributiView:true, 
                        ContoSelezionato:conto,
                        OggettoSelezionato: Oggetto});
        
        
    }

    listaContributi = () =>{
        
        return(
            <div>
                {this.conti(this.state.OggettoSelezionato)}
                <br />
                <Contributi getContributi={this.props.getContributi}
                        ruolo={this.props.ruolo}
                        getMessaggi={this.props.getMessaggi}
                        getMedias={this.props.getMedias} 
                        Conto={this.state.ContoSelezionato}/>                 
            </div>

        )
    }
    
    
    conti = (conti) =>{
        const c = conti.map (conto => {
            return <Conto key={conto.ContoId} 
                            conto={conto}
                            contributi={this.contributi}
                            contribuisci={this.props.contribuisci}/>
        })
        return (c)
    }

    render(){
        return( 
            <Container id="risparmi">
                <Row> <h1>I miei risparmi</h1> </Row>
                {!this.state.contributiView ? this.conti(this.state.Conti) : this.listaContributi()}
            </Container>
          )
    
      }
}

export default Risparmi;