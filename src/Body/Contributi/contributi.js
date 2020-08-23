import React, { Component } from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGripHorizontal } from '@fortawesome/free-solid-svg-icons';

import Contributo from './Contributo/contributo'
import './contributi.css'

class Contributi extends Component {

    state={
        Contributi:[],
        contentDataReady:false,
        dettaglio:false,
        messaggi:[],
        CardsVisualization:true
    }

    

    componentDidMount(){

        this.props.getContributi()
        .then(contributi => {
            let data={}
            if(this.props.Conto) {
                data = contributi.data.filter( c => {return c.ContoId === this.props.Conto})
            } 
            else 
                data = contributi.data
            this.setState({Contributi : data, contentDataReady : true})
        })
        .catch( error => console.log(error))
    }

    loading = () => {
        console.log("[loading]")
        return(
            <div className="loader">Loading...</div>
        )
    }  

    //Comparing based on the property qty
    compare_date = (a, b) => {
        // a should come before b in the sorted order
        if(a.DataVersamento < b.DataVersamento){
                return -1;
        // a should come after b in the sorted order
        }else if(a.DataVersamento > b.DataVersamento){
                return 1;
        // a and b are the same
        }else{
                return 0;
        }
    }


    contributi = () =>{
        const d = this.state.Contributi
            .sort(this.compare_date)
            .map (contributo => {
            return <Contributo  key={contributo.VersamentoId} 
                                contributo={contributo}
                                toggleDettaglio={this.openDettaglio}
                                dettaglio={this.state.dettaglio}
                                CardsVisualization = {this.state.CardsVisualization}/>
        })
        return (d)
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
                                getMedias={this.props.getMedias}
                                CardsVisualization = {this.state.CardsVisualization}/>            
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

    setVisualization = (card) =>{
        this.setState({CardsVisualization:card})
    }
 


    render(){

        return( 
            <Container>
                <Row>
                    <Col sm={10}>
                        {this.titolo()}
                    </Col> 
                    <Col>
                        <FontAwesomeIcon onClick={() => this.setVisualization(false)} className="icons iconsActive" icon={faBars} size="lg"/> 
                        <FontAwesomeIcon onClick={() => this.setVisualization(true)} className="icons" icon={faGripHorizontal} size="lg"/>
                    </Col>
                    
                </Row>

                <Row>
                    {this.state.contentDataReady ?  this.versamenti() : this.loading()}
                </Row>

            </Container>            
          )
    
      }    

}


export default Contributi;