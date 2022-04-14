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
    NEWRESTAURANT : "newrestaurant"
  }

  //* Application state variables *
  const [stateVars, setStateVars] = useState({
    "viewState" : VIEWS.RESTAURANTS,  
    "lastViewState" : VIEWS.RESTAURANTS,
    "loggedinToken" : "",
    "loggedinUserRoleID" : -1,
    "loggedinUserRole" : "",
    "loggedinUserID" : -1,
    "selectedRestaurantID" : -1
  });

  //* First entry or page refresh: GET restaurants, restauranttypes and userroles. Sign in if token is stored *
  useEffect(() => {
    var token = window.sessionStorage.getItem("sessionToken");
    var urole = "";
    var uid = -1;
    if (token != null && token != "null") {
      let decoded = jwt_decode(token);
      let newStateVars={...stateVars};
      newStateVars.loggedinToken = token;
      uid = decoded.userid;
      newStateVars.loggedinUserID = uid;
      newStateVars.loggedinUserRoleID = decoded.roleid;
      urole = decoded.userrole;
      newStateVars.loggedinUserRole = urole; 
      setStateVars(newStateVars);
      GetPersonInfo(decoded.userid);
    };
    axios.get('https://webfoodr5.herokuapp.com/restaurants')
    .then(response => {
      setRestaurants(response.data);
      var rants = response.data;
      if(urole === "owner" && uid >= 0) rants = rants.filter(n => n.idperson === uid);
      setfilteredRestaurants(rants);
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
  const ChangeView = (view, newStateVars = "", forceUpdate = false) => {
    if(view != stateVars.viewState || forceUpdate) {
      if(newStateVars === "") newStateVars = {...stateVars};
      newStateVars.lastViewState = newStateVars.viewState;
      //Only owner can select some VIEWS. Otherwise set restaurants view
      if (newStateVars.loggedinUserRole !== "" && newStateVars.loggedinUserRole !== "owner" && 
       (view === VIEWS.NEWMENUITEM || view === VIEWS.NEWRESTAURANT || view === VIEWS.RESTAURANTINFO)) view = VIEWS.RESTAURANTS;  
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
    newStateVars.loggedinUserRole = "";
    setStateVars(newStateVars); 
    window.sessionStorage.setItem("sessionToken", null);
    setfilteredRestaurants(restaurants);
    ChangeView(VIEWS.RESTAURANTS);   
  }

  //* Update filteredRestaurants object *
  const FilterRestaurantsBySearchText = (text) => {
    setFilterText(text);
    let newrestaurants = restaurants.filter(n => n.name.toLowerCase().includes(text.toLowerCase()) || n.description.toLowerCase().includes(text.toLowerCase()));
    if(stateVars.loggedinUserRole === "owner") newrestaurants = restaurants.filter(n => n.idperson === stateVars.loggedinUserID);
    if(filterCatID >= 0 && filterCatID < 1000) newrestaurants = newrestaurants.filter(f => f.idrestauranttype === filterCatID);
    if(filterCatID >= 1000) newrestaurants = newrestaurants.filter(f => f.price_level === filterCatID - 1000);  
    setfilteredRestaurants(newrestaurants);
  }
  const FilterRestaurantsByCatID = (id) => {
    setFilterCatID(id);
    let newrestaurants = restaurants.filter(n => n.name.toLowerCase().includes(filterText.toLowerCase()) || n.description.toLowerCase().includes(filterText.toLowerCase()));
    if(stateVars.loggedinUserRole === "owner") newrestaurants = restaurants.filter(n => n.idperson === stateVars.loggedinUserID);
    if(id >= 0 && id < 1000) newrestaurants = newrestaurants.filter(f => f.idrestauranttype === id);
    if(id >= 1000) newrestaurants = newrestaurants.filter(f => f.price_level === id - 1000);
    setfilteredRestaurants(newrestaurants);
  }

  //* Create restaurant button clicked : POST new restaurant *
  const CreateRestaurantBtnClicked = (formdata) => {
    //Generate JSON body
    let jsonBody = {
      "name" : formdata["inputRestaurantName"].value,
      "description" : formdata["inputSlogan"].value,
      "price_level" : parseInt(formdata["selectPriceRange"].value),
      "address1" : formdata["inputAddress1"].value,
      "address2" : formdata["inputAddress2"].value,
      "city" : formdata["inputCity"].value,
      "phone" : formdata["inputPhone"].value,
      "idrestauranttype" : formdata["selectCategory"].value,
      "idperson" : stateVars.loggedinUserID,
      //"file" : formdata["itemImage"].files[0]
    }
    var bodyFormData = new FormData();
    bodyFormData.append('', jsonBody);
    bodyFormData.append('file', formdata["itemImage"].files[0]);

    console.log(bodyFormData);
    //POST query
    //axios.post('https://webfoodr5.herokuapp.com/restaurants', jsonBody, {
    axios.post('http://localhost:8080/restaurants', bodyFormData)
    .then(response => {
      //ok : Set messagebar text, wait and change view
      ShowMessageBar(response.data.message, "alert alert-success");
      setTimeout(() => { ShowMessageBar(""); ChangeView(stateVars.lastViewState); }, 3000);
    }).catch(error => {
      //nok : Set messagebar errormessage, wait and set info message
      if (error.response == null) ShowMessageBar(error.toString(), "alert alert-danger");
      else ShowMessageBar(error.response.data.message, "alert alert-danger");
      setTimeout(() => ShowMessageBar("Create Restaurant - Enter valid data to each field"), 6000);
    });   
  }

  //PAKKO LÄHETTÄÄ ERIKSEEN DATA POST ja KUVA PUT
  const test = (formdata) => {
    let jsonBody = {
      "name" : formdata["inputRestaurantName"].value,
      "description" : formdata["inputSlogan"].value,
      "thumbnail_url" : "",
      "picture_url" : "",
      "price_level" : parseInt(formdata["selectPriceRange"].value),
      "address1" : formdata["inputAddress1"].value,
      "address2" : formdata["inputAddress2"].value,
      "city" : formdata["inputCity"].value,
      "phone" : formdata["inputPhone"].value,
      "idrestauranttype" : formdata["selectCategory"].value,
      "idperson" : stateVars.loggedinUserID,
      //"file" : formdata["itemImage"].files[0]
    }
    var bodyFormData = new FormData();
    bodyFormData.append('file', formdata["itemImage"].files[0]);

    axios.put('http://localhost:8080/restaurantimage2', {jsonBody, bodyFormData})
    .then(response => {
      console.log(response.data);
    })
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
      if (error.response == null) ShowMessageBar(error.toString(), "alert alert-danger");
      else ShowMessageBar(error.response.data.message, "alert alert-danger");
      setTimeout(() => ShowMessageBar("SIGN UP - Enter valid data to each field"), 6000);
    });
  }

  const EditUserBtnClicked = (formdata) => {
    //KESKEN! KUTSU PUT user kun REST on koodattu (mahd. käyttää ylläolevaa?)
    console.log(formdata);
  }

  //* Signin Submit button clicked POST login data and get token *
  const SigninBtnClicked = (formdata) => {
      //axios.post('https://webfoodr5.herokuapp.com/loginbasic', {}, {
      axios.post('http://localhost:8080/loginbasic', {}, {
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
      newStateVars.loggedinUserRole = decoded.userrole;   
      setStateVars(newStateVars); 
      window.sessionStorage.setItem("sessionToken", response.data.token);
      //owner can see only his/her own restaurants
      if(decoded.userrole === "owner") {
        let newrestaurants = restaurants.filter(n => n.idperson === decoded.userid);
        setfilteredRestaurants(newrestaurants);
      }
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
      newStateVars.loggedinUserRole = "";
      setStateVars(newStateVars); 
      if (error.response == null) ShowMessageBar(error.toString(), "alert alert-danger");
      else ShowMessageBar(error.response.data.message, "alert alert-danger");
      setTimeout(() => ShowMessageBar("SIGN IN - Enter username and password"), 6000);
    });  
  }

  //* Get person info *
  const GetPersonInfo = (UID) => {
    axios.get('https://webfoodr5.herokuapp.com/user', { params: {userID: UID} })
    .then(response => { setPersonInfo(response.data); 
    });
  }


  //Return Single-Page application
  return (
    <div>
      <Navbar onNavItemClicked={ChangeView} onSearchBtnClicked={FilterRestaurantsBySearchText} onSignoutClicked={SignOut} statevars={stateVars} />
      { stateVars.viewState === VIEWS.RESTAURANTS ? <Categories types={restaurantTypes} onItemClicked={FilterRestaurantsByCatID}/> : 
        message !== "" ? <div className="messageArea"><div className={msgClass} role="alert">{message}</div></div> : <div className="messageArea"/>}
      { stateVars.viewState === VIEWS.NEWMENUITEM ? <NewMenuItem/> : <></> }
      { stateVars.viewState === VIEWS.DELETEACCOUNT ? <DeleteAccount/> : <></> }
      { stateVars.viewState === VIEWS.PERSONALINFO ? <PersonalInfo data={personInfo} roles={userRoles} showMessage={ShowMessageBar} onSubmitBtnClicked={EditUserBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.RESTAURANTINFO ? <RestaurantInfo/> : <></> }
      { stateVars.viewState === VIEWS.NEWRESTAURANT ? <NewRestaurant showMessage={ShowMessageBar} onSubmitBtnClicked={test} types={restaurantTypes} /> : <></> }
      { stateVars.viewState === VIEWS.SIGNIN ? <SignIn showMessage={ShowMessageBar} onSubmitBtnClicked={SigninBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.SIGNUP ? <SignUp showMessage={ShowMessageBar} roles={userRoles} onSubmitBtnClicked={SignupBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.RESTAURANTS ?
        <div className="pageContainer">
        {
            filteredRestaurants.map(i => <RestaurantsView key={i.id} item={i} />)
        }
        </div> : <></> 
      }
    </div>
  );
}

export default App;
