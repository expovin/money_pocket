import React, { Component } from 'react';
import queryString from 'query-string';
import Header from './Header/Header';
import Body from './Body/Body'
import './App.css';
import axios from 'axios';
//import { ThemeProvider } from 'react-bootstrap';

axios.interceptors.request.use( request =>{
  /** 
   * Qui è possibile editare qualsiasi request in uscita
   * ad esempio aggiungere headers variable 
   * */ 
  let token = localStorage.getItem('token');
  if(token)
    request.headers['x-access-token'] =  token;

   return (request)
}, error => {
  /** 
   * Qui è possibile gestire centralmente tutti gli errori
   * in spedizione di requests
   */

   console.log("Errore nella spedizione della request. E' possibile gestirla globalmente da index.js")
   // Rimando il controllo al componente locale
   return Promise.reject(error);
})

axios.interceptors.response.use( response =>{
  /**
   * Qui è possibile editare qualsiasi response in entrata
   * */ 

  let params = queryString.parse(window.location.search)
  if(params.token && !localStorage.getItem('token')){
    console.log("[IMPOSTO IL TOKEN IN LOCALSTORAGE]")
    localStorage.setItem('token', params.token);
  }   

   return (response)
}, error => {
  /** 
   * Qui è possibile gestire centralmente tutti gli errori
   * in ricezione di response
   */
  console.log(error)
   if(error.toString().indexOf("status code 401") !== -1  || error.toString().indexOf("status code 403") !==-1 ){
    console.log("Rimuovo il token!")
    localStorage.removeItem('token');
   }
   
   // Rimando il controllo al componente locale
   return Promise.reject(error);
})

class App extends Component {

  state = {
    userId : "",
    isLogged: false,
    me:{}
  }  

  getContents = (userId) =>{

    return new Promise ( (fulfill, reject) => {
      axios('/contents/info/'+userId)
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => console.log(error))
    })

  }

  getMe = () => {
    return new Promise ((fulfill, reject) => {
      axios.put('/users/me')
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => console.log(error))
    })
  }  

  getWishlist = (domain)=>{
    return new Promise ((fulfill, reject) => {
      axios.get('/contents/wishlist/'+domain)
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

  getUserId = (domain) => {
    return new Promise ((fulfill, reject) => {
      axios('/users/domain/'+domain)
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => console.log(error))
    })
  }  

  setLogStatus = (isLogged) => {
    this.setState({isLogged:isLogged})
  }

  componentDidMount() {
    console.log("[COMPONENT DID MOUNT]")
    console.log(window.location);
    let hostName = window.location.hostname;


    let params = queryString.parse(window.location.search)
    console.log("Token --> "+params.token)


    if(params.token || localStorage.getItem('token')){
      this.setState({isLogged:true})
      console.log("RICHIAMO getME")
      this.getMe(params.token)
      .then( me => this.setState({me : me, isLogged:true}), () => console.log(this.state))
      .catch( error => console.log(error))      
    } 

    this.getUserId(hostName)
    .then( data => this.setState({userId :data.userId}, () => console.log(this.state))  )
  }

  


  render(){
    return( 

        <div>
          
          <Header me = {this.state.me} 
                  isLogged = {this.state.isLogged}/>
          
          <Body   userId = {this.state.userId}
                  getUserDetails = {this.getUserDetails}
                  getContents = {this.getContents}
                  me = {this.state.me}
                  setLogStatus = {this.setLogStatus}
                  getWishlist = {this.getWishlist}
                  />
        </div>
      )

  }

}
export default App;
