import React from 'react'
import {useEffect} from 'react';

export default function SignUp(props) {

    //Form submit button pressed : Validate password and fire app.js onSubmitBtnClicked
    const handleSubmit = (e) => {
        e.preventDefault();
        //Verify password
        if(e.target["inputPassword1"].value === e.target["inputPassword2"].value && e.target["inputPassword1"].value.length > 8) {
            //ok : call app.js function
            props.onSubmitBtnClicked(e.target);
        }   
        else {
            //nok : clear passwords and show error on messagebar
            e.target["inputPassword1"].value = "";
            e.target["inputPassword2"].value = "";
            props.showMessage("Passwords do not match or password doesn't fill the minimum requirement (9 chars length)", "alert alert-danger");
            setTimeout(() => props.showMessage("SIGN UP - Enter valid data to each field"), 7000);
        }
    }

    //First run : Set messagebar 
    useEffect(() => { props.showMessage("SIGN UP - Enter valid data to each field")}, []);

    //Return Signup page
    return (
    <div className="containerTwo">
        <form className="row g-3" onSubmit = {handleSubmit}>
            <div className="col-md-6">
                <label htmlFor="inputFirstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="inputFirstName" required/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputLastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="inputLastName" required/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputUserName" className="form-label">User name</label>
                <input type="text" className="form-control" id="inputUserName" required/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPhone" className="form-label">Phone Number</label>
                <input type="text" className="form-control" id="inputPhone" required/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword1" required/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPassword2" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="inputPassword2" required/>
            </div>
            <div className="col-12">
                <label htmlFor="inputAddress1" className="form-label">Address 1</label>
                <input type="text" className="form-control" id="inputAddress1" required/>
            </div>
            <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                <input type="text" className="form-control" id="inputAddress2" placeholder="Streetname, Apartment, studio, or floor"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">City</label>
                <input type="text" className="form-control" id="inputCity" required/>
            </div>
            <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">Zip</label>
                <input type="text" className="form-control" id="inputZip"/>
            </div>
            <div className="col-12">
                <label htmlFor="RoleSelect" className="form-label">Choose Role</label>
            </div>
            <div className="col-12">
                <select className="selectpicker" id="selectRole">
                    {props.roles.map((r) => <option key={r.id} value={r.id}>{r.role}</option>)}
                </select>    
            </div>
            <div className="col-12">
                <br/>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
        </form>
      </div>
  )
}