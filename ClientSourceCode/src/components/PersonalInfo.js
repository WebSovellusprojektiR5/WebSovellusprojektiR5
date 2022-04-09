import React from 'react'

export default function PersonalInfo(props) {
    return (
    <div class="containerTree">
        <p>
            <a class="btn btn-primary" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Personal Info</a>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Order History</button>
            
        </p>

        <div class="row">
            <div class="col">
                <div class="collapse multi-collapse" id="multiCollapseExample1">
                    <div class="card card-body">
                    <form class="row g-3">
                        <fieldset disabled>
                            <div class="col-md-6">
                                <label for="inputFirstName" class="form-label">First Name</label>
                                <input type="name" class="form-control" id="inputFirstName"/>
                            </div>
                            <div class="col-md-6">
                                <label for="inputLastName" class="form-label">Last Name</label>
                                <input type="lastName" class="form-control" id="inputLastName"/>
                            </div>
                            <div class="col-md-6">
                                <label for="inputPassword" class="form-label">Password</label>
                                <input type="password" class="form-control" id="inputPassword"/>
                            </div>
                            <div class="col-md-6">
                                <label for="inputPassword" class="form-label">Confirm Password</label>
                                <input type="password" class="form-control" id="inputPassword"/>
                            </div>
                            <div class="col-12">
                                <label for="inputPhoneNumber" class="form-label">Phone Number</label>
                                <input type="phoneNumber" class="form-control" id="inpuPhoneNumber"/>
                            </div>
                            <div class="col-12">
                                <label for="inputAddress" class="form-label">Address</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="Streetname, Apartment, studio, or floor"/>
                            </div>
                            <div class="col-md-6">
                                <label for="inputCity" class="form-label">City</label>
                                <input type="text" class="form-control" id="inputCity"/>
                            </div>
                            <div class="col-md-2">
                                <label for="inputZip" class="form-label">Zip</label>
                                <input type="text" class="form-control" id="inputZip"/>
                            </div>
                        </fieldset>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary">Edit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="collapse multi-collapse" id="multiCollapseExample2">
                    <div class="card card-body">
                       Tähän listaus tilauksista
                    </div>
                </div>
            </div>
        </div>    
    </div>
  )
}