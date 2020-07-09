import React, { Component } from 'react';
import md5 from 'md5';
import Header from './Header/Header';
import Body from './Body/Body'
import './App.css';
import axios from 'axios';


class App extends Component {

  state = {
    userId : ""
  }  

  getContents = (userId) =>{

    return new Promise ( (fulfill, reject) => {
      axios('/contents/'+userId)
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => console.log(error))
    })

  }

  getUserDetails = (userId) => {
    return new Promise ((fulfill, reject) => {
      axios('/users/'+userId)
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => console.log(error))
    })

  }

  componentDidMount() {
    let hostName = window.location.hostname;
    let userId =  md5(hostName);
    
    this.setState({userId :userId}, () => console.log(this.state))  

  }



  render(){
    return( 

        <div>
          
          <Header/>
          
          <Body   userId = {this.state.userId}
                  getUserDetails = {this.getUserDetails}
                  getContents = {this.getContents}
                  />
        </div>
      )

  }

}
export default App;
