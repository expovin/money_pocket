import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './Home/Home';
import Wishlist from './Wishlist/wishlist';
import Login from './Login/login';
import Logout from './Logout/logout';
import Profile from './Profile/profile';
import Contributi from './Contributi/contributi';
import Risparmi from './Risparmi/risparmi';
import Offline from './Offline/offline';

function Body(props) {

    return (
      <div>
      <BrowserRouter>
        <div>
            <Route exact path="/wishlist" component={() =>
              <Wishlist getWishlist={props.getWishlist}
                        getContributi={props.getContributi}
                        ruolo={props.ruolo}
                        getMessaggi={props.getMessaggi}
                        getMedias={props.getMedias} 
                        isLogged = {props.isLogged}
                        contribuisci = {props.contribuisci}/>   
            }/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/risparmi" component={()=>
              <Risparmi getConti={props.getConti}
                        getContributi={props.getContributi}
                        ruolo={props.ruolo}
                        getMessaggi={props.getMessaggi}
                        getMedias={props.getMedias} 
                        contribuisci={props.contribuisci}/>   
              }/>
            <Route exact path="/logout" component={Logout}/>
            <Route exact path="/contributi" component={() =>
              <Contributi getContributi={props.getContributi}
                          ruolo={props.ruolo}
                          getMessaggi={props.getMessaggi}
                          getMedias={props.getMedias} />
            }/>
            <Route exact path="/" component={()=> 
              <Home userId={props.userId}
                getUserDetails = {props.getUserDetails}
                getContents = {props.getContents}      
              />              
            }/>
            <Route exact path="/profilo" component={()=> 
              <Profile me={props.me}
                      setNewFriendlyName={props.setNewFriendlyName}/>              
            }/>              
            <Route exact path="/offline" component={()=> 
              <Offline forceOnline={props.forceOnline}/>              
            }/> 
        </div>
      </BrowserRouter>
    </div>
    );
  }
  

  export default Body;