import React, { Component } from 'react';
import {Col, Row, Image, Card, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import Media from './Media/media';
import ReactPlayer from "react-player"

class Messaggio extends Component {

    state = {
        medias:[],
        mediaReady:false
    }

    getMedia = (messageId) =>{
        this.props.getMedias(messageId)
        .then( medias => {
            console.log(medias.data);
            this.setState({medias:medias.data, mediaReady:true},() => console.log(this.state))
        })
        .catch( error => console.log(error))
    }

    media = () =>{
        return (this.state.medias.map( m =>{
            
            return (<ReactPlayer controls="true" url={m.Url}
                    config={{
                        youtube : { playerVars:{controls:false}}
                    }}/>)
            })
        )
    }

    medias = () =>{
        if(this.state.mediaReady)
            return (this.media())
        else
            return(<a onClick={() => this.getMedia(this.props.messaggio.MessaggioId)}>Mostra video/foto</a>)
    }

    prevButton = () =>{
        if(this.props.idxMsg>0)
            return (<FontAwesomeIcon onClick={this.props.prevMessage} icon={faArrowAltCircleLeft} size="lg" color="blue"/>)
        else   
            return (null)
    }

    nextButton = () =>{
        if(this.props.idxMsg+1<this.props.numMsg)
            return (<FontAwesomeIcon onClick={this.props.nextMessage} icon={faArrowAltCircleRight} size="lg" color="blue"/>)
        else
            return (null)
    }    

    render(){
        return(
            <Container>
                <Row className="messaggioBox">
                    <Col sm={4}>
                        <Image className="img-fluid" src={this.props.messaggio.Copertina} alt={this.props.messaggio.Copertina} width="150px"/> 
                    </Col>
                    <Col sm={8}>
                            <h5>{this.props.messaggio.Titolo}</h5>
                            <p>{this.props.messaggio.Testo}</p>    
                            <p> Messaggio {this.props.idxMsg+1} di {this.props.numMsg}</p>
                            <a onClick={() => this.getMedia(this.props.messaggio.MessaggioId)}>Mostra video/foto</a>
                            <i>{this.prevButton()} {this.nextButton()}</i>
                    </Col>
                </Row>
                <Row>
                    <Col>
                       
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default Messaggio;