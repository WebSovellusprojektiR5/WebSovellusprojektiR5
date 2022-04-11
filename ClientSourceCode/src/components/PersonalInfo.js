import React from 'react'
import {useEffect} from 'react';

export default function PersonalInfo(props) {

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
                    <form className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="inputFirstName" className="form-label">First Name</label>
                                <input type="name" className="form-control" id="inputFirstName" defaultValue={props.data.firstname}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputLastName" className="form-label">Last Name</label>
                                <input type="lastName" className="form-control" id="inputLastName" defaultValue={props.data.lastname}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="inputPassword"/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="inputPassword"/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputPhoneNumber" className="form-label">Phone Number</label>  
                                <input type="phoneNumber" className="form-control" id="inpuPhoneNumber" defaultValue={props.data.phone}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Address 1</label>
                                <input type="text" className="form-control" id="inputAddress" defaultValue={props.data.address1} placeholder="Streetname, Apartment, studio, or floor"/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Address 2</label>
                                <input type="text" className="form-control" id="inputAddress" defaultValue={props.data.address2} placeholder="Streetname, Apartment, studio, or floor"/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">City</label>
                                <input type="text" className="form-control" id="inputCity" defaultValue={props.data.city.split(' ')[1]}/>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="inputZip" className="form-label">Zip</label>
                                <input type="text" className="form-control" id="inputZip" defaultValue={props.data.city.split(' ')[0]}/>
                            </div>    
                            <div className="col-12">
                                <br/>
                            <label className="form-label">Role: {props.roles.find(r => r.id === props.data.idrole).role}</label>
                            </div>                        
                            <div className="col-12">
                                <br/>
                                <button type="submit" className="btn btn-primary">Edit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="collapse multi-collapse" id="multiCollapseExample2">
                    <div className="card card-body">
                       Tähän listaus tilauksista
                    </div>
                </div>
            </div>
        </div>    
    </div>
  )
}