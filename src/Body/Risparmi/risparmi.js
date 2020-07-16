import React, { Component } from 'react';
import Conto from './Conto/conto';
import {Row, Col, Container, Card } from 'react-bootstrap';



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

    conti = () =>{
        const c = this.state.Conti.map (conto => {
            return <Conto key={conto.ContoId} conto={conto}/>
        })
        return (c)
    }

    render(){
        return( 
            <Container id="risparmi">
                <Row> <h1>I miei risparmi</h1> </Row>
                {this.conti()}
            </Container>
          )
    
      }
}

export default Risparmi;