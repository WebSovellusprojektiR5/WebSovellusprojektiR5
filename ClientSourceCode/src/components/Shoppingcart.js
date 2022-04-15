import React from 'react'

export default function Shoppingcart(props) {
    return (

<div className="containerTwo">
          <form>
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