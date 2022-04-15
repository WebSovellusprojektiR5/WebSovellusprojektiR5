import './App.css';

import {useEffect, useState} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; 
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Categories from './components/Categories';
import NewMenuItem from './components/NewMenuItem';
import DeleteAccount from './components/DeleteAccount';
import PersonalInfo from './components/PersonalInfo';
import RestaurantInfo from './components/RestaurantInfo';
import NewRestaurant from './components/NewRestaurant';
import RestaurantsView from './components/RestaurantsView';
import ShoppingCart from './components/ShoppingCart';
import MenuItem from './components/MenuItem';


function App() {

  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [restaurantTypes, setRestaurantTypes] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [personInfo, setPersonInfo] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterCatID, setFilterCatID] = useState(-1);
  const [message, setMessage] = useState("");
  const [msgClass, setMsgClass] = useState("alert alert-primary");

  //* Set top bar message text (not visible if empty or restaurant view active) and Bootstrap style *
  //Example BootStrap styles: alert alert-primary, alert alert-danger, alert alert-success
  const ShowMessageBar = (msg, msgclass = "alert alert-primary") => {    
      setMsgClass(msgclass);  
      setMessage(msg);
  }
  
  //* VIEWS constant (ENUM) *
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
    NEWRESTAURANT : "newrestaurant",
    SHOPPINGCART : "shoppingcart",
    MENUITEM : "menuitem"
  }

  //* Application state variables *
  const [stateVars, setStateVars] = useState({
    "viewState" : VIEWS.RESTAURANTS,  
    "lastViewState" : VIEWS.RESTAURANTS,
    "loggedinToken" : "",
    "loggedinUserRoleID" : -1,
    "loggedinUserID" : -1,
    "selectedRestaurantID" : -1
  })


  //* First run: GET restaurants, restauranttypes and userroles *
  useEffect(() => {
    axios.get('https://webfoodr5.herokuapp.com/restaurants')
    .then(response => {
      setRestaurants(response.data);
      setfilteredRestaurants(response.data);
    });
    axios.get('https://webfoodr5.herokuapp.com/restauranttypes')
    .then(response => {
      setRestaurantTypes(response.data);
    });
    axios.get('https://webfoodr5.herokuapp.com/userroles')
    .then(response => {
      setUserRoles(response.data);
    });
  }, []);

  //* NavBar Navigation button clicked : Update stateVars.viewState *
  const ChangeView = (view, nStateVars = "") => {
    if(view != stateVars.viewState) {
      let newStateVars = nStateVars;
      if(newStateVars == "") newStateVars = {...stateVars};
      newStateVars.lastViewState = newStateVars.viewState;
      newStateVars.viewState = view;
      setStateVars(newStateVars); 
      ShowMessageBar("");
    } 
  }

  //* Signout button clicked *
  const SignOut = () => {
    let newStateVars={...stateVars};
    newStateVars.loggedinToken = "";
    newStateVars.loggedinUserID = -1;
    newStateVars.loggedinUserRoleID = -1;
    setStateVars(newStateVars); 
  }

  //* Update filteredRestaurants object *
  const FilterRestaurantsBySearchText = (text) => {
    setFilterText(text);
    let newrestaurants = restaurants.filter(n => n.name.toLowerCase().includes(text.toLowerCase()) || n.description.toLowerCase().includes(text.toLowerCase()));
    if(filterCatID >= 0 && filterCatID < 1000) newrestaurants = newrestaurants.filter(f => f.idrestauranttype === filterCatID);
    if(filterCatID >= 1000) newrestaurants = newrestaurants.filter(f => f.price_level === filterCatID - 1000);
    setfilteredRestaurants(newrestaurants);
  }
  const FilterRestaurantsByCatID = (id) => {
    setFilterCatID(id);
    let newrestaurants = restaurants.filter(n => n.name.toLowerCase().includes(filterText.toLowerCase()) || n.description.toLowerCase().includes(filterText.toLowerCase()));
    if(id >= 0 && id < 1000) newrestaurants = newrestaurants.filter(f => f.idrestauranttype === id);
    if(id >= 1000) newrestaurants = newrestaurants.filter(f => f.price_level === id - 1000);
    setfilteredRestaurants(newrestaurants);
  }

  //* Signup Submit button clicked : POST new user *
  const SignupBtnClicked = (formdata) => {
    //Generate JSON body
    let city = formdata["inputZip"].value + ' ' + formdata["inputCity"].value;
    let jsonBody = {
      "firstname" : formdata["inputFirstName"].value,
      "lastname" : formdata["inputLastName"].value,
      "address1" : formdata["inputAddress1"].value,
      "address2" : formdata["inputAddress2"].value,
      "city" : city,
      "phone" : formdata["inputPhone"].value,
      "username" : formdata["inputUserName"].value,
      "password" : formdata["inputPassword1"].value,
      "idrole" : formdata["selectRole"].value
    };
    //POST query
    axios.post('https://webfoodr5.herokuapp.com/users', jsonBody)
    .then(response => {
      //ok : Set messagebar text, wait and change view
      ShowMessageBar(response.data.message, "alert alert-success");
      setTimeout(() => { ShowMessageBar(""); ChangeView(stateVars.lastViewState); }, 3000);
    }).catch(error => {
      //nok : Set messagebar errormessage, wait and set info message
      ShowMessageBar(error.response.data.message, "alert alert-danger");
      setTimeout(() => ShowMessageBar("SIGN UP - Enter valid data to each field"), 5000);
    });
  }

  //* Signin Submit button clicked POST login data and get token *
  const SigninBtnClicked = (formdata) => {
      axios.post('https://webfoodr5.herokuapp.com/loginbasic', {}, {
      auth: {
        username: formdata["inputUserName"].value,
        password: formdata["inputPassword"].value
      }
    }).then(response => {
      //ok : Set messagebar text, set states, wait and change view
      ShowMessageBar("Logged in", "alert alert-success");
      let decoded = jwt_decode(response.data.token);
      let newStateVars={...stateVars};
      newStateVars.loggedinToken = response.data.token;
      newStateVars.loggedinUserID = decoded.userid;
      newStateVars.loggedinUserRoleID = decoded.roleid;
      setStateVars(newStateVars); 
      ChangeView(stateVars.lastViewState, newStateVars);  //Statehook slow updating workaround
      GetPersonInfo(decoded.userid);
      setTimeout(() => { 
        ShowMessageBar("");               
      }, 3000);
    }).catch(error => {
      //nok : Set messagebar errormessage, set states, wait and set info message
      let newStateVars={...stateVars};
      newStateVars.loggedinToken = "";
      newStateVars.loggedinUserID = -1;
      newStateVars.loggedinUserRoleID = -1;
      setStateVars(newStateVars); 
      ShowMessageBar(error.response.data.message, "alert alert-danger");
      setTimeout(() => ShowMessageBar("SIGN IN - Enter username and password"), 5000);
    });  
  }

  //* Get person info *
  const GetPersonInfo = (UID) => {
    axios.get('https://webfoodr5.herokuapp.com/user', { params: {userID: UID} })
    .then(response => { setPersonInfo(response.data); 
    });
  }

  const GetRestaurantMenu = (UID) => {
   // axios.get('https://webfoodr5.herokuapp.com/itemsbyrestaurant', { params: {userID: UID} })
  //  .then(response => { itemsByRestaurant(response.data); 
  //  });
 }

  //Return Single-Page application
  return (
    <div>
      <Navbar onNavItemClicked={ChangeView} onSearchBtnClicked={FilterRestaurantsBySearchText} onSignoutClicked={SignOut} statevars={stateVars}/>
      { stateVars.viewState === VIEWS.RESTAURANTS ? <Categories types={restaurantTypes} onItemClicked={FilterRestaurantsByCatID}/> : 
        message !== "" ? <div className="messageArea"><div className={msgClass} role="alert">{message}</div></div> : <div className="messageArea"/>}
      { stateVars.viewState === VIEWS.NEWMENUITEM ? <NewMenuItem/> : <></> }
      { stateVars.viewState === VIEWS.DELETEACCOUNT ? <DeleteAccount/> : <></> }
      { stateVars.viewState === VIEWS.PERSONALINFO? <PersonalInfo data={personInfo}/> : <></> }
      { stateVars.viewState === VIEWS.RESTAURANTINFO? <RestaurantInfo/> : <></> }
      { stateVars.viewState === VIEWS.NEWRESTAURANT? <NewRestaurant/> : <></> }
      { stateVars.viewState === VIEWS.SHOPPINGCART? <ShoppingCart/> : <></> }
      { stateVars.viewState === VIEWS.SIGNIN ? <SignIn showMessage={ShowMessageBar} onSubmitBtnClicked={SigninBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.SIGNUP ? <SignUp showMessage={ShowMessageBar} roles={userRoles} onSubmitBtnClicked={SignupBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.RESTAURANTS ?
        <div className="pageContainer">
        {
            filteredRestaurants.map(i => <RestaurantsView key={i.id} item={i} onRestaurantClicked={GetRestaurantMenu} />)
        }
        </div> : <></> 
      }
    </div>
  );
}

export default App;
