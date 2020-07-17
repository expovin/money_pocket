import React, { Component } from 'react';
import {Row, Col, Container, Image} from 'react-bootstrap';
import Contributo from './Contributo/contributo'
import './contributi.css'

class Contributi extends Component {

    state={
        Contributi:[],
        contentDataReady:false,
        dettaglio:false,
        messaggi:[]
    }

    

    componentDidMount(){
        this.props.getContributi()
        .then(contributi => this.setState({Contributi : contributi.data, contentDataReady : true}))
        .catch( error => console.log(error))
    }

    loading = () => {
        console.log("[loading]")
        return(
            <div className="loader">Loading...</div>
        )
    }  

    contributi = () =>{
        const conts = this.state.Contributi.map (contributo => {
            return <Contributo  key={contributo.VersamentoId} 
                                contributo={contributo}
                                toggleDettaglio={this.openDettaglio}
                                dettaglio={this.state.dettaglio}/>
        })
        return (conts)
    }

    titolo = () =>{
        switch(this.props.ruolo){
            case "Ordinario" : return(<h1>I tuoi contributi</h1>);
            case "Admin" : return(<h1>Lista contributi</h1>);
            default: return(<h1>Lista contributi</h1>);
        }
    }

    selectContributo = (versamentoId) => { 
        const versamento = this.state.Contributi.filter ( contributo => {
            return contributo.VersamentoId === versamentoId
        })
        .map( contributo => {
            return <Contributo  key={contributo.VersamentoId} 
                                contributo={contributo}
                                toggleDettaglio={this.closeDettaglio} 
                                dettaglio={this.state.dettaglio}
                                messaggi={this.state.messaggi}
                                getMedias={this.state.getMedias}/>            
        })
        console.log(versamento)
        return (versamento)
    }  

    openDettaglio = (versamentoId) =>{
        this.setState({dettaglio:true, versamentoId:versamentoId})
        this.props.getMessaggi(versamentoId)
        .then( msg => this.setState({messaggi: msg.data}))
        .catch( error => console.log(error))

    }

    closeDettaglio = () =>{
        this.setState({dettaglio:false})
    }    

    versamenti = () =>{
        console.log("[versamenti] : "+this.state.dettaglio)
        return(
            this.state.dettaglio ? this.selectContributo(this.state.versamentoId) : this.contributi()
        )
    }
 


    render(){

        return( 
            <Container>
                <Row>
                    {this.titolo()}
                </Row>

                <Row>
                    {this.state.contentDataReady ?  this.versamenti() : this.loading()}
                </Row>

            </Container>            
          )
    
      }    

}


export default Contributi;