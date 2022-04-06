import React from 'react'
import {useState} from 'react';

export default function Navbar(props) {

    const VIEWS = {
        RESTAURANTS : "restaurants",
        ITEMS : "items",
        SIGNIN : "signin",
        SIGNUP : "signup",
        ORDERHISTORY : "orderhistory"
    }

    //State Hooks
    const[searchValue, setSearchValue] = useState("");

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') props.onSearchClicked(searchValue);
    }

    return (
    <div className="container">
       <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Group 5 Wolt</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
          <a class="nav-link" href="#" onClick={() => props.onNavBtnClicked(VIEWS.RESTAURANTS)}>Home</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" href="#" onClick={() => props.onNavBtnClicked(VIEWS.SIGNUP)}>Sign Up</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" href="#" onClick={() => props.onNavBtnClicked(VIEWS.SIGNIN)}>Sign In</a>
      </li>
      <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Profile
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
           <a class="dropdown-item" href="#">Order history</a>
           <a class="dropdown-item" href="#">Personal info</a>
           <a class="dropdown-item" href="#">Restaurant Info</a>
           <a class="dropdown-item" href="#">Create Menu Item</a>
           <div class="dropdown-divider"></div>
           <a class="dropdown-item" href="#">Delete account</a>
          </div>
      </li>
      <li class="nav-item">
          <a class="nav-link" href="#">Shopping Cart</a>
      </li>
  </ul>
      <div class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value ={searchValue} onChange={(event) => setSearchValue(event.target.value)} onKeyDown={handleSearchKeyDown}></input>
          <button class="btn btn-outline-success my-2 my-sm-0" onClick={() => props.onSearchClicked(searchValue)}>Search</button>
      </div>
  </div>
</nav>
    </div>
  )
}