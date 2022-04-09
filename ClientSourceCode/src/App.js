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
  const [message, setMessage] = useState("");
  const [msgClass, setMsgClass] = useState("alert alert-primary");

  //* Set top bar message text (not visible if empty or restaurant view active) and Bootstrap style *
  //Example BootStrap styles: alert alert-primary, alert alert-danger, alert alert-success
  const showMessageBar = (msg, msgclass = "alert alert-primary") => {    
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
  const FilterRestaurants = (text) => {
    setfilteredRestaurants(restaurants.filter(n => n.name.toLowerCase().includes(text.toLowerCase())));
  }

  //* Signup Submit button clicked : POST new user *
  const SignupBtnClicked = (formdata) => {
    //Generate JSON body
    let city = formdata["inputZip"].value === "" ? formdata["inputCity"].value : formdata["inputZip"].value + ' ' + formdata["inputCity"].value;
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
      showMessageBar(response.data.message, "alert alert-success");
      setTimeout(() => { showMessageBar(""); ChangeView(stateVars.lastViewState); }, 3000);
    }).catch(error => {
      //nok : Set messagebar errormessage, wait and set info message
      showMessageBar(error.response.data.message, "alert alert-danger");
      setTimeout(() => showMessageBar("SIGN UP - Enter valid data to each field"), 5000);
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
      showMessageBar("Logged in", "alert alert-success");
      let decoded = jwt_decode(response.data.token);
      let newStateVars={...stateVars};
      newStateVars.loggedinToken = response.data.token;
      newStateVars.loggedinUserID = decoded.userid;
      newStateVars.loggedinUserRoleID = decoded.roleid;
      setStateVars(newStateVars); 
      ChangeView(stateVars.lastViewState, newStateVars);  //Statehook slow updating workaround
      setTimeout(() => { 
        showMessageBar("");               
      }, 3000);
      
    }).catch(error => {
      //nok : Set messagebar errormessage, set states, wait and set info message
      let newStateVars={...stateVars};
      newStateVars.loggedinToken = "";
      newStateVars.loggedinUserID = -1;
      newStateVars.loggedinUserRoleID = -1;
      setStateVars(newStateVars); 
      showMessageBar(error.response.data.message, "alert alert-danger");
      setTimeout(() => showMessageBar("SIGN IN - Enter username and password"), 5000);
    });  
  }

  //Return Single-Page application
  return (
    <div>
      <Navbar onNavItemClicked={ChangeView} onSearchBtnClicked={FilterRestaurants} onSignoutClicked={SignOut} statevars={stateVars}/>
      { stateVars.viewState === VIEWS.RESTAURANTS ? <Categories types={restaurantTypes}/> : 
        message !== "" ? <div className="messageArea"><div className={msgClass} role="alert">{message}</div></div> : <div className="messageArea"/>}
      { stateVars.viewState === VIEWS.NEWMENUITEM ? <NewMenuItem/> : <></> }
      { stateVars.viewState === VIEWS.DELETEACCOUNT ? <DeleteAccount/> : <></> }
      { stateVars.viewState === VIEWS.PERSONALINFO? <PersonalInfo/> : <></> }
      { stateVars.viewState === VIEWS.RESTAURANTINFO? <RestaurantInfo/> : <></> }
      { stateVars.viewState === VIEWS.NEWRESTAURANT? <NewRestaurant/> : <></> }
      { stateVars.viewState === VIEWS.SIGNIN ? <SignIn showMessage={showMessageBar} onSubmitBtnClicked={SigninBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.SIGNUP ? <SignUp showMessage={showMessageBar} roles={userRoles} onSubmitBtnClicked={SignupBtnClicked}/> : <></> }
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
