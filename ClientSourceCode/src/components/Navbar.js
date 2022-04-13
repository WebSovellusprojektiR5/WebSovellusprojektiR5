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

    //State Hook
    const[searchValue, setSearchValue] = useState("");

    //Search key clicked
    const onSearchKeyDown = (event) => {
        if (event.key === 'Enter') props.onSearchBtnClicked(searchValue);
    }

    //Return NavBar
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Group 5 Wolt</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#" onClick={() => props.onNavItemClicked(VIEWS.RESTAURANTS)}>Home</a>
                        </li>
                        { props.statevars.loggedinToken !== "" ?
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Profile
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#" onClick={() => props.onNavItemClicked(VIEWS.PERSONALINFO)}>Personal info</a>
                                { props.statevars.loggedinUserRole === "owner" ?
                                <a className="dropdown-item" href="#" onClick={() => props.onNavItemClicked(VIEWS.RESTAURANTINFO)}>Restaurant Info</a> : <></> }
                                { props.statevars.loggedinUserRole === "owner" ?
                                <a className="dropdown-item" href="#" onClick={() => props.onNavItemClicked(VIEWS.NEWMENUITEM)}>Create Menu Item</a> : <></> }
                                { props.statevars.loggedinUserRole === "owner" ?
                                <a className="dropdown-item" href="#" onClick={() => props.onNavItemClicked(VIEWS.NEWRESTAURANT)}>Create Restaurant</a> : <></> }
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#" onClick={() => props.onNavItemClicked(VIEWS.DELETEACCOUNT)}>Delete account</a>
                            </div>
                        </li> : <></> }  
                    </ul>
                    <div className="form-inline my-2 my-lg-0 mr-auto">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value ={searchValue} onChange={(event) => setSearchValue(event.target.value)} onKeyDown={onSearchKeyDown}></input>
                        <button className="btn btn-outline-primary my-2 my-sm-0" onClick={() => props.onSearchBtnClicked(searchValue)}>Search</button>
                    </div>
                    <ul className="navbar-nav">
                        { props.statevars.loggedinToken !== "" && props.statevars.loggedinUserRole !== "owner" ?
                        <li className="nav-item">
                            <a className="nav-link" href="#">Shopping Cart</a>
                        </li> : <></> }
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => props.onNavItemClicked(VIEWS.SIGNUP)}>Sign Up</a>
                        </li>
                        <li className="nav-item">
                            { props.statevars.loggedinToken == "" ?
                                <a className="nav-link" href="#" onClick={() => props.onNavItemClicked(VIEWS.SIGNIN)}>Sign In</a> :
                                <a className="nav-link" href="#" onClick={() => props.onSignoutClicked()}>Sign Out</a>
                            }
                        </li> 
                    </ul>
                </div>
            </nav>
        </div>
    )
}
