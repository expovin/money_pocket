import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './Home/Home';
import Wishlist from './Wishlist/wishlist';
import Login from './Login/login';
import Logout from './Logout/logout';
import Profile from './Profile/profile';

function Body(props) {
    return (
      <div>
        <BrowserRouter>
          <div>
              <Route exact path="/wishlist" component={() =>
                <Wishlist getWishlist={props.getWishlist}/>   
              }/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/logout" component={Logout}/>
              <Route exact path="/" component={()=> 
                <Home userId={props.userId}
                  getUserDetails = {props.getUserDetails}
                  getContents = {props.getContents}      
                />              
              }/>
              <Route exact path="/profilo" component={()=> 
                <Profile me={props.me}/>              
              }/>              

          </div>
        </BrowserRouter>

        
      </div>
    );
  }
  

  export default Body;