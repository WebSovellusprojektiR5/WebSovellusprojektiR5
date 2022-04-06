import React from 'react'

export default function SignUp(props) {
    return (
    <div class="container">
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">First Name</label>
                <input type="email" class="form-control" id="inputFirstName"/>
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Last Name</label>
                <input type="password" class="form-control" id="inputLastName"/>
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword"/>
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword"/>
            </div>
            <div class="col-12">
                <label for="inputAddress" class="form-label">Phone Number</label>
                <input type="text" class="form-control" id="inpuPhoneNumber"/>
            </div>
            <div class="col-12">
                <label for="inputAddress2" class="form-label">Address</label>
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
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Sign Up</button>
            </div>
        </form>
      </div>
  )
}