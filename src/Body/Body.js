import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './Home/Home';
import Wishlist from './Wishlist/wishlist';
import Login from './Login/login';

function Body(props) {
    return (
      <div>
        <BrowserRouter>
          <div>
              <Route exact path="/wishlist" component={Wishlist}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/" component={()=> 
                <Home userId={props.userId}
                  getUserDetails = {props.getUserDetails}
                  getContents = {props.getContents}      
                />              
              }/>


          </div>
        </BrowserRouter>

        
      </div>
    );
  }
  

  export default Body;