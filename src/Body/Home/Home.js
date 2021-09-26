import React, { Component } from 'react';
import {Row, Col, Container, Image} from 'react-bootstrap';
import './Home.css';
import '../spinner.css'


class Home extends Component {
    
    state = {
        userDataReady : false,
        contentDataReady : false
    }    

    componentDidUpdate() {
        if(!this.state.userDataReady && !this.state.contentDataReady)
            this.componentDidMount();
    }

    componentDidMount() {
        if(this.props.userId){
            this.props.getUserDetails(this.props.userId)
            .then( userDetails => this.setState({userDetails:userDetails, userDataReady:true}))
            .catch( error => console.log(error))
    
            this.props.getContents(this.props.userId)
            .then( contents => this.setState({contents:contents, contentDataReady:true}))
            .catch( error => console.log(error))  
        }
           
    }

    pageReady = () =>{
        return (
            <Row id="HeadSection">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="title">{this.state.userDetails.firstName}</h1>
                            <div className="headLine">
                                <p>{this.state.contents[0].content}</p>
                            </div>
                        </Col>
                        <Col>
                            <Image className="Avatar img-fluid" src={this.state.userDetails.profilePicture_HD} alt={this.state.userDetails.firstName}  width="300" />
                        </Col>
                    </Row>
                    <Row>
                        <Container>
                            <hr />
                            <p>{this.state.contents[1].content}</p>
                        </Container>
                    </Row>
                </Container>
            </Row> 
        )

    }

    loading = () => {
        console.log("[loading]")
        return(
            <div className="loader">Loading...</div>
        )
    }

    render(){
        return( 
            <div>
                {this.state.userDataReady && this.state.contentDataReady ? this.pageReady() : this.loading()}
            </div>
          )
    
      }
}



  export default Home;