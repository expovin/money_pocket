import React, { Component } from 'react';
import {Button, Form, Modal, Row, Col, InputGroup } from 'react-bootstrap';


class ModalInserisci extends Component {

    formData = {};

    handleChange = (event) => {
        this.formData[event.target.name]=event.target.value
    }    

    handleSubmit = (event) => {
        event.preventDefault();

        console.log("[handleSubmit]")
        console.log(this.formData);

        let versamento = {
            ContoId : this.props.ContoId,
            Importo : this.formData.Importo
        }

        let messaggio = {
            Titolo: this.formData.TitoloMessaggio,
            Testo : this.formData.TestoMessaggio,
        }        

        this.props.addVersamento(versamento)
        .then( verResult => this.props.addMessaggio(verResult.versamentoId, messaggio))
        .then( result => console.log(result))
        .catch( error => console.log(error))

        this.props.nascondiModal()
    }   

    render(){     

        let MyModal =     
                <Modal show={this.props.show} 
                        id="ModalInserisci"
                        onHide={this.props.nascondiModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>Contribuisci al conto {this.props.ContoId}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="Importo">
                                <Form.Label>Importo</Form.Label>
                                <Form.Control type="number" name="Importo" placeholder="0.00" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="TitoloMsg">
                                <Form.Label>Titolo Messaggio</Form.Label>
                                <Form.Control type="text" name="TitoloMessaggio" placeholder="Titolo" onChange={this.handleChange}/>
                            </Form.Group>      

                            <Form.Group controlId="TestoMsg">
                                <Form.Label>Testo Messaggio</Form.Label>
                                <Form.Control as="textarea" rows="3" name="TestoMessaggio" onChange={this.handleChange}/>
                            </Form.Group>                                                  
                        </Form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.nascondiModal}>Close</Button>
                        <Button variant="primary" onClick={this.handleSubmit}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
           

        return(
            <div>
                {MyModal}

            </div>
        )
    }

}

export default ModalInserisci