import React from 'react';
import NavBar from './navBar/navbar';
import ErrorLog from './ErrorLog/ErrorLog'

function Header(props) {
    return (
      <div>
        <NavBar me = {props.me} 
                isLogged = {props.isLogged}/>

        <ErrorLog showError={props.showError}
                  closeErrorMessage={props.closeErrorMessage}
                  msgError={props.msgError}/>
        
      </div>
    );
  }
  
  export default Header;