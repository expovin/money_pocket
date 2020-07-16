import React, { Component } from 'react';
import {Row, Col, Container, Image} from 'react-bootstrap';
import Contributo from './Contributo/contributo'

class Contributi extends Component {

    state={
        Contributi:[],
        contentDataReady:false
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
            return <Contributo key={contributo.VersamentoId} contributo={contributo}/>
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


    render(){

        return( 
            <Container>
                <Row>
                    {this.titolo()}
                </Row>
                <Row>
                        {this.contributi()}
                </Row>

            </Container>            
          )
    
      }    

}


export default Contributi;