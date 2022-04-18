import React from 'react'
import {useEffect} from 'react';

export default function PersonalInfo(props) {

    //Form submit button pressed : Validate password and fire app.js onSubmitBtnClicked
    const handleSubmit = (e) => {
        e.preventDefault();
        //Verify password
        if(e.target["inputPassword1"].value === e.target["inputPassword2"].value) {
            //ok : call app.js function
            props.onSubmitBtnClicked(e.target);
        }   
        else {
            //nok : clear passwords and show error on messagebar
            e.target["inputPassword1"].value = "";
            e.target["inputPassword2"].value = "";
            props.showMessage("Passwords do not match or password doesn't fill the minimum requirement (9 chars length)", "alert alert-danger");
            setTimeout(() => props.showMessage(""), 7000);
        }
    }

    return (
    <div className="containerTree">
        <p>
            <a className="btn btn-primary" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Personal Info</a>
            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Order History</button>
        </p>
        <div className="row">
            <div className="col">
                <div className="collapse multi-collapse" id="multiCollapseExample1">
                    <div className="card card-body">
                    <form className="row g-3" onSubmit = {handleSubmit}>
                            <div className="col-md-6">
                                <label htmlFor="inputFirstName" className="form-label">First Name</label>
                                <input type="text" maxLength="30" className="form-control" id="inputFirstName" defaultValue={props.data.firstname}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputLastName" className="form-label">Last Name</label>
                                <input type="text" maxLength="30" className="form-control" id="inputLastName" defaultValue={props.data.lastname}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword1" className="form-label">Password</label>
                                <input type="password" minLength="10" maxLength="80" className="form-control" id="inputPassword1"/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword2" className="form-label">Confirm Password</label>
                                <input type="password" minLength="10" maxLength="80" className="form-control" id="inputPassword2"/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputPhoneNumber" className="form-label">Phone Number</label>  
                                <input type="tel" maxLength="20" className="form-control" id="inputPhone" defaultValue={props.data.phone}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress1" className="form-label">Address 1</label>
                                <input type="text" maxLength="80" className="form-control" id="inputAddress1" defaultValue={props.data.address1} placeholder="Streetname, Apartment, studio, or floor"/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                                <input type="text" maxLength="80" className="form-control" id="inputAddress2" defaultValue={props.data.address2} placeholder="Streetname, Apartment, studio, or floor"/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">City</label>
                                <input type="text" maxLength="20" className="form-control" id="inputCity" defaultValue={props.data.city.split(' ')[1]}/>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="inputZip" className="form-label">Zip</label>
                                <input type="text" maxLength="10" className="form-control" id="inputZip" defaultValue={props.data.city.split(' ')[0]}/>
                            </div>    
                            <div className="col-12">
                            <br/>
                            <label className="form-label">Username: {props.data.username}</label><br/>
                            <label className="form-label">Role: {props.roles.find(r => r.id === props.data.idrole).role}</label>
                            <input type="hidden" id="inputUserName" value={props.data.username}/>
                            <input type="hidden" id="selectRole" value={props.data.idrole}/>
                            </div>                        
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Edit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="collapse multi-collapse" id="multiCollapseExample2">
                    <div className="card card-body">
                    <div class="container mt-5">
            <div class="d-flex justify-content-center row">
                <div class="col-md-10">
                    <div class="rounded">
                        <div class="table-responsive table-borderless">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th>Company name</th>
                                        <th>status</th>
                                        <th>Total</th>
                                        <th>Created</th>
                                    </tr>
                                </thead>
                                <tbody class="table-body">
                                    <tr class="cell-1">
                                        <td class="text-center">1</td>
                                        
                                        <td className="restaurantName">Tarziella</td>
                                        <td><span class="badge badge-success">Fullfilled</span></td>
                                        <td className="price">15,00€</td>
                                        <td className="orderDate">18/04/2022</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
  )
}