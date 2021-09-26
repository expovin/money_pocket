import React, { Component } from 'react';
import queryString from 'query-string';
import Header from './Header/Header';
import Body from './Body/Body'
import ModalInsert from './Body/ModalInserisci/NuovoContributo';
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
  console.log(error.message) 
   if(error.toString().indexOf("status code 401") !== -1  || error.toString().indexOf("status code 403") !==-1 ){
    console.log("Rimuovo il token!")
    localStorage.removeItem('token');
   }

   if(error.message === 'Network Error'){
      localStorage.setItem('offline',true);
      console.log("Trovato Network error centrale, vado in OFFLINE : ")
      window.location = '/offline'
      
   }
        

   
   // Rimando il controllo al componente locale
   return Promise.reject(error);
})


function getFaviconEl() { return document.getElementById("favicon")}
function getFaviconAppleEl() { return document.getElementById("faviconApple")}
function getTitleEl() { return document.getElementById("siteTitle")}

class App extends Component {

  state = {
    userId : "",
    isLogged: false,
    showInsertModal:false,
    hostName:"",
    contributi:[],
    me:{},
    showError:false,
    msgError:null,
    offline:false
  }  


  forceOnline = () => { this.setState({offline:false}, this.componentDidMount()) }
  forceOffLine = () =>{ 
    console.log("Network Error, forcing ofline")
    this.setState({offline:true})
  }

  closeErrorMessage = () => {this.setState({showError:false})}
  //openErrorMessage = (msgError) => {this.setState({showError:true, msgError:msgError})}

  getContents = (userId) =>{

    return new Promise ( (fulfill, reject) => {
      axios('/contents/info/'+userId)
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => {

        let msgError = {
          variant:"danger",
          heading:"Errore recupero contenuti sito",
          msg:error
        }
      this.setState({showError:true, msgError:msgError});
      console.log(error);
      if(error.message === 'Network Error')
        this.forceOffLine({offline:true})      
    })
    })

  }

  getContributi = () =>{
    return new Promise ((fulfill, reject) => {
      axios.get('/disposizioni/versamenti')
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => {

        let msgError = {
          variant:"danger",
          heading:"Errore recupero contributi",
          msg:error
        }
      this.setState({showError:true, msgError:msgError});
      console.log(error);
      if(error.message === 'Network Error')
        this.forceOffLine({offline:true})      
    })
    })    
  }

  getMe = () => {
    return new Promise ((fulfill, reject) => {
      axios.get('/users/me')
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => {

        let msgError = {
          variant:"warning",
          heading:"Errore recupero dati personali",
          msg:error
        }
      this.setState({showError:true, msgError:msgError});
      /*
      if(error.message === 'Network Error')
        this.forceOffLine({offline:true})       
      */
      console.log(error);
    })
    })
  }  

  getWishlist = (domain)=>{
    return new Promise ((fulfill, reject) => {
      axios.get('/contents/wishlist/'+domain)
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => {

        let msgError = {
          variant:"danger",
          heading:"Errore recupero della wishlist",
          msg:error
        }
      this.setState({showError:true, msgError:msgError});
      console.log(error); // <--------------
    })
    })
  }

  getUserDetails = (userId) => {
    return new Promise ((fulfill, reject) => {
      axios('/users/info/'+this.state.hostName+'/'+userId)
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => {

        let msgError = {
          variant:"danger",
          heading:"Errore nel recuperare i dettagli utente",
          msg:error
        }
        this.setState({showError:true, msgError:msgError});
        console.log(error);
      })
    })
  }

  getUserId = (domain) => {
    return new Promise ((fulfill, reject) => {
      axios('/users/domain/'+domain)
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => {

        let msgError = {
          variant:"danger",
          heading:"Errore nel recupero dello user id",
          msg:error
        }
      this.setState({showError:true, msgError:msgError});
      console.log(error);
    })
    })
  }  

  setNewFriendlyName = (name) =>{
    return new Promise ((fulfill, reject) => {
      axios.put('/disposizioni/friendlyName/'+name)
      .then( result => {
        this.getMe()
        .then( me => this.setState({me : me, isLogged:true}))
        .catch( error => console.log(error)) 

        fulfill(result.data.data)
      })
      .catch(error => {

        let msgError = {
          variant:"warning",
          heading:"Errore nell'impostare il frendly name",
          msg:error
        }
      this.setState({showError:true, msgError:msgError});
      console.log(error);
    })
    })    
  }

  getConti = () => {
    return new Promise ((fulfill, reject) => {
      axios('/disposizioni/conti')
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => {

        let msgError = {
          variant:"error",
          heading:"Errore recupero conti",
          msg:error
        }
      this.setState({showError:true, msgError:msgError});
      console.log(error);
    })
    })
  }    

  getMessaggi = (versamentoId) => {
    return new Promise ((fulfill, reject) => {
      axios('/disposizioni/messaggi/'+versamentoId)
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => {

        let msgError = {
          variant:"warning",
          heading:"Errore recupero messaggi",
          msg:error
        }
      this.setState({showError:true, msgError:msgError});
      console.log(error);
    })
    })
  }   
  
  getMedias = (messaggioId) => {
    return new Promise ((fulfill, reject) => {
      axios('/disposizioni/media/'+messaggioId)
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => {

        let msgError = {
          variant:"warning",
          heading:"Errore recupero media",
          msg:error
        }
      this.setState({showError:true, msgError:msgError});
      console.log(error);
    })
    })
  }     

  addVersamento = (versamento) =>{
    return new Promise ((fulfill, reject) => {
      axios.post('/disposizioni/versamenti/',{versamento : versamento})
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => {

          let msgError = {
            variant:"danger",
            heading:"Errore inserimento nuovo versamento",
            msg:error
          }
        this.setState({showError:true, msgError:msgError});
        console.log(error);
      })
    })    
  }

  addMessaggio = (versamentoId,messaggio) =>{
    return new Promise ((fulfill, reject) => {
      axios.post('/disposizioni/messaggi/'+versamentoId,{messaggio : messaggio})
      .then( result => {
        fulfill(result.data.data)
      })
      .catch(error => {

        let msgError = {
          variant:"danger",
          heading:"Errore aggiunta nuovo messaggio",
          msg:error
        }
      this.setState({showError:true, msgError:msgError});
      console.log(error);
    })
    })    
  }


  setLogStatus = (isLogged) => {
    this.setState({isLogged:isLogged})
  }

  componentDidMount() {

    console.log("[COMPONENT DID MOUNT]");
    let offline = localStorage.getItem('offline') == 'true'
    console.log("Offline : "+offline)
    
    if(!offline){

      console.log("Sono nell'IF sono in linea")
      

      let hostName = window.location.hostname;
      console.log("Hostname : "+hostName)
      this.setState({hostName:hostName})
      const favicon = getFaviconEl();
      const faviconApple = getFaviconAppleEl();
      const siteTitle = getTitleEl();
      console.log(siteTitle)
  
      const favicoPath = "./assets/imgSD/"+hostName+".ico";
      favicon.href = favicoPath;
      faviconApple.href = favicoPath;
      let nomeSito = hostName.split('.')[0];
      console.log("Nome Sito : "+nomeSito)
      siteTitle.innerHTML = nomeSito;
  
  
      let params = queryString.parse(window.location.search)
  
      console.log("Recupero UserId ")
      this.getUserId(hostName)
      .then( data => this.setState({userId :data.userId}))
      .catch(error => {

        let msgError = {
          variant:"danger",
          heading:"Errore recupero user Id",
          msg:error
        }
        this.setState({showError:true, msgError:msgError});
        if(error.message === 'Network Error')
          this.forceOffLine({offline:true})      
        console.log(error);
      }) 
        
      if(params.token || localStorage.getItem('token')){



        this.setState({isLogged:true})
        this.getMe()
        .then( me => this.setState({me : me, isLogged:true}))
        .catch(error => {   

          let msgError = {
            variant:"warning",
            heading:"Errore recupero dati personali",
            msg:error
          }
          this.setState({showError:true, msgError:msgError});
          if(error.message === 'Network Error')
            this.forceOffLine({offline:true})          
          console.log(error);
        })        
      } 
    }
  }

  contribuisci = (conto) =>{
    this.setState({showInsertModal:true, ContoId:conto})
  }

  nascondiModal = () => {
    this.setState({showInsertModal:false})
  }
  


  render(){
    return( 

        <div>
          
          <Header me = {this.state.me} 
                  isLogged = {this.state.isLogged}
                  showError={this.state.showError}
                  msgError={this.state.msgError}
                  closeErrorMessage={this.closeErrorMessage}/>
          
          <Body   userId = {this.state.userId}
                  getUserDetails = {this.getUserDetails}
                  getContents = {this.getContents}
                  me = {this.state.me}
                  setLogStatus = {this.setLogStatus}
                  getWishlist = {this.getWishlist}
                  getContributi= {this.getContributi}
                  ruolo={this.state.me.Gruppo}
                  getConti={this.getConti}
                  setNewFriendlyName={this.setNewFriendlyName}
                  getMessaggi={this.getMessaggi}
                  getMedias={this.getMedias}
                  isLogged = {this.state.isLogged}
                  contribuisci = {this.contribuisci}
                  offline={this.state.offline}
                  forceOnline={this.forceOnline}/>

          <ModalInsert show={this.state.showInsertModal}
                      nascondiModal={this.nascondiModal}
                      ContoId={this.state.ContoId}
                      addVersamento={this.addVersamento}
                      addMessaggio={this.addMessaggio}/>
        </div>
      )

  }

}
export default App;
