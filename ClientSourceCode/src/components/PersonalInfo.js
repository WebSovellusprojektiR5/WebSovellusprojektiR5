import React from 'react'

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
                        <fieldset disabled>
                            <div className="col-md-6">
                                <label htmlFor="inputFirstName" className="form-label">First Name</label>
                                <input type="name" className="form-control" id="inputFirstName"/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputLastName" className="form-label">Last Name</label>
                                <input type="lastName" className="form-control" id="inputLastName"/>
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
                                <input type="phoneNumber" className="form-control" id="inpuPhoneNumber"/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Address</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="Streetname, Apartment, studio, or floor"/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">City</label>
                                <input type="text" className="form-control" id="inputCity"/>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="inputZip" className="form-label">Zip</label>
                                <input type="text" className="form-control" id="inputZip"/>
                            </div>
                        </fieldset>
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
                       Tähän listaus tilauksista
                    </div>
                </div>
            </div>
        </div>    
    </div>
  )
}