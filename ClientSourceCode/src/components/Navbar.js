import React from 'react'
import {useState} from 'react';

export default function Navbar(props) {

        //VIEWS constant (ENUM)
    const VIEWS = {
        RESTAURANTS : "restaurants",
        ITEMS : "items",
        SIGNIN : "signin",
        SIGNUP : "signup",
        ORDERHISTORY : "orderhistory",
        NEWMENUITEM : "newmenuitem",
        DELETEACCOUNT : "deleteaccount",
        PERSONALINFO : "personalinfo",
        RESTAURANTINFO : "restaurantinfo",
        NEWRESTAURANT : "newrestaurant"
    }

    //State Hooks
    const[searchValue, setSearchValue] = useState("");

    //Search key clicked
    const onSearchKeyDown = (event) => {
        if (event.key === 'Enter') props.onSearchBtnClicked(searchValue);
    }

    //Return NavBar
    return (
    <div class="container">
       <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Group 5 Wolt</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
          <a class="nav-link" href="#" onClick={() => props.onNavItemClicked(VIEWS.RESTAURANTS)}>Home</a>
      </li>
      <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Profile
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
           <a class="dropdown-item" href="#" onClick={() => props.onNavItemClicked(VIEWS.PERSONALINFO)}>Personal info</a>
           <a class="dropdown-item" href="#" onClick={() => props.onNavItemClicked(VIEWS.RESTAURANTINFO)}>Restaurant Info</a>
           <a class="dropdown-item" href="#" onClick={() => props.onNavItemClicked(VIEWS.NEWMENUITEM)}>Create Menu Item</a>
           <a class="dropdown-item" href="#" onClick={() => props.onNavItemClicked(VIEWS.NEWRESTAURANT)}>Create Restaurant</a>
           <div class="dropdown-divider"></div>
           <a class="dropdown-item" href="#" onClick={() => props.onNavItemClicked(VIEWS.DELETEACCOUNT)}>Delete account</a>
          </div>
      </li>
      
  </ul>
      <div class="form-inline my-2 my-lg-0 mr-auto">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value ={searchValue} onChange={(event) => setSearchValue(event.target.value)} onKeyDown={onSearchKeyDown}></input>
          <button class="btn btn-outline-primary my-2 my-sm-0" onClick={() => props.onSearchBtnClicked(searchValue)}>Search</button>
      </div>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">Shopping Cart</a>
        </li>
      <li class="nav-item">
          <a class="nav-link" href="#" onClick={() => props.onNavItemClicked(VIEWS.SIGNUP)}>Sign Up</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" href="#" onClick={() => props.onNavItemClicked(VIEWS.SIGNIN)}>Sign In</a>
      </li>
    </ul>
  </div>
</nav>
    </div>
  )
}