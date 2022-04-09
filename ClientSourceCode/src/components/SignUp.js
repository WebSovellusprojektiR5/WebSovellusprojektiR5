import React from 'react'
import {useEffect} from 'react';

export default function SignUp(props) {

    //Form submit button pressed : Validate password and fire app.js onSubmitBtnClicked
    const handleSubmit = (e) => {
        e.preventDefault();
        //Verify password
        if(e.target["inputPassword1"].value === e.target["inputPassword2"].value && e.target["inputPassword1"].value.length > 8) {
            props.onSubmitBtnClicked(e.target);
        }   
        else {
            e.target["inputPassword1"].value = "";
            e.target["inputPassword2"].value = "";
            props.showMessage("Passwords do not match or password doesn't fill the minimum requirement (9 chars length)", "alert alert-danger");
            setTimeout(() => props.showMessage("Enter valid data to each field"), 7000);
        }
    }

    //Return Signup page
    useEffect(() => { props.showMessage("Enter valid data to each field")}, []);

    return (
    <div class="containerTwo">
        <form class="row g-3" onSubmit = {handleSubmit}>
            <div class="col-md-6">
                <label for="inputFirstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="inputFirstName" required/>
            </div>
            <div class="col-md-6">
                <label for="inputLastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="inputLastName" required/>
            </div>
            <div class="col-md-6">
                <label for="inputUserName" class="form-label">User name</label>
                <input type="text" class="form-control" id="inputUserName" required/>
            </div>
            <div class="col-md-6">
                <label for="inputPhone" class="form-label">Phone Number</label>
                <input type="text" class="form-control" id="inputPhone" required/>
            </div>
            <div class="col-md-6">
                <label for="inputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword1" required/>
            </div>
            <div class="col-md-6">
                <label for="inputPassword2" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="inputPassword2" required/>
            </div>
            <div class="col-12">
                <label for="inputAddress1" class="form-label">Address 1</label>
                <input type="text" class="form-control" id="inputAddress1" required/>
            </div>
            <div class="col-12">
                <label for="inputAddress2" class="form-label">Address 2</label>
                <input type="text" class="form-control" id="inputAddress2" placeholder="Streetname, Apartment, studio, or floor"/>
            </div>
            <div class="col-md-6">
                <label for="inputCity" class="form-label">City</label>
                <input type="text" class="form-control" id="inputCity" required/>
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Zip</label>
                <input type="text" class="form-control" id="inputZip"/>
            </div>
            <div class="col-12">
                <label for="RoleSelect" class="form-label">Choose Role</label>
            </div>
            <div class="col-12">
                <select class="selectpicker" id="selectRole">
                    {props.roles.map((r) => <option key={r.id} value={r.id}>{r.role}</option>)}
                </select>    
            </div>
            <div class="col-12">
                <br/>
                <button type="submit" class="btn btn-primary">Sign Up</button>
            </div>
        </form>
      </div>
  )
}