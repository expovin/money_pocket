import React from 'react';
import NavBar from './navBar/navbar';

function Header(props) {
    return (
      <div>
        <NavBar me = {props.me} 
                isLogged = {props.isLogged}/>
        
      </div>
    );
  }
  
  export default Header;