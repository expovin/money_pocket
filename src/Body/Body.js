import React from 'react';
import Home from './Home/Home';

function Body(props) {
    return (
      <div>
        <Home userId={props.userId}
                  getUserDetails = {props.getUserDetails}
                  getContents = {props.getContents}      
        />
        
      </div>
    );
  }
  

  export default Body;