import React, { Component } from 'react';
import {Row, Col, Image, Container, ListGroup} from 'react-bootstrap';
import Moment from 'react-moment';

import 'moment-timezone';
import '../spinner.css'
import './note.css';

class Note extends Component {

    state = {
        note : null,
        pageready:false,
        maxDate:null
    }


    componentDidMount() {
        this.props.getNote()
        .then(result => {
            const maxDate = result.data[result.data.length -1].Data
            console.log("Max Date : "+maxDate);
            this.setState({note:result.data,pageready:true, maxDate:maxDate})
        })
    }

    ok = (n) => {
        return(
            <Row>
                <Col className="OK"><div className="Day OK"><Moment format="DD MMM" date={n.Data}/></div></Col>
                <Col><Image className="Avatar img-fluid" src="./assets/ImgHD/Smile.png" alt="Smile.png" width="100px"/>    </Col>
            </Row>
        )
    }

    ko = (n) => {
        return(
            <Row>
                <Col className="KO"><div className="Day KO"><Moment format="DD MMM" date={n.Data}/></div></Col>
                <Col><Image className="Avatar img-fluid" src="./assets/ImgHD/Sad.png" alt="Sad.png" width="100px"/>    </Col>
            </Row>
        )
    }    

    notes = () =>{
        return this.state.note.map((n,idx)=>{
            return(<ListGroup.Item Key={idx}>
                        {n.Nota == 1 ? this.ok(n) : this.ko(n)}
                    </ListGroup.Item>
                )
        })
    }

    loading = () => {
        console.log("[loading]")
        return(
            <div className="loader">Loading...</div>
        )
    }    

    addNewNote = () => {
        var today = new Date();
        var lastDate = new Date(this.state.maxDate)
        console.log("Mese "+today.getMonth());
        console.log("Giorno "+today.getDate());
        console.log("Mese 2: "+lastDate.getMonth())

        if(today.getMonth() == lastDate.getMonth() && today.getDate() == lastDate.getDate())
            return(<h3>Nota gia assegnata per oggi!</h3>)
        else 
        return(
            <div className="noteToday">
                <h3>Nota per oggi <Moment format="DD MMM" date={this.state.maxDate}/></h3>
                <ListGroup>
                    <ListGroup.Item>
                        <Row>
                            <Col><Image className="Avatar img-fluid" src="./assets/ImgHD/Smile.png" alt="Smile.png" width="100px" onClick={() => this.props.setNote(1).then(() => this.componentDidMount())}/></Col>
                            <Col><Image className="Avatar img-fluid" src="./assets/ImgHD/Sad.png" alt="Sad.png" width="100px" onClick={() => this.props.setNote(-1).then(() => this.componentDidMount())}/></Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </div>

        )
    }
    
    render(){
        console.log("Sono in note");
        return( 
            <div>
                <Container>
                    <h1>Note non riscattate</h1>
                    <ListGroup>
                        {this.state.pageready ? this.notes() : this.loading()}
                    </ListGroup>
                    {(this.props.me.Gruppo !== "Ordinario" && this.props.me.Gruppo !== "Owner") ? this.addNewNote() : null}
                </Container>
            </div>
          )
    
      }    
}

export default Note;