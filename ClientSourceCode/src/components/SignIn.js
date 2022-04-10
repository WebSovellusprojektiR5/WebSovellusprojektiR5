import React from 'react'
import {useEffect} from 'react';

export default function SignIn(props) {

    //Form submit button pressed : Fire app.js onSubmitBtnClicked
    const handleSubmit = (e) => {
      e.preventDefault();
      props.onSubmitBtnClicked(e.target);
      e.target["inputUserName"].value = "";
      e.target["inputPassword"].value = "";
    }
      
    //First run : Set messagebar 
    useEffect(() => { props.showMessage("SIGN IN - Enter username and password")}, []);

    //Return Signin page
    return (
        <div className="containerTwo">
          <form onSubmit = {handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputUserName" className="form-label">Username</label>
              <input type="text" className="form-control" id="inputUserName" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword" required/>
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
      </div>
  )
}