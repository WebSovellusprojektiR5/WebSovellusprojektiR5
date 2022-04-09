import './App.css';
import RestaurantsView from './components/RestaurantsView';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Categories from './components/Categories';
import NewMenuItem from './components/NewMenuItem';
import DeleteAccount from './components/DeleteAccount';
import PersonalInfo from './components/PersonalInfo';
import RestaurantInfo from './components/RestaurantInfo';
import NewRestaurant from './components/NewRestaurant';

function App() {

  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [restaurantTypes, setRestaurantTypes] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [message, setMessage] = useState("");
  const [msgClass, setMsgClass] = useState("alert alert-primary");

  //Set top bar message text (not visible if empty or restaurant view active) and Bootstrap style
  //Example BootStrap styles: alert alert-primary, alert alert-danger, alert alert-success
  const showMessageBar = (msg, msgclass = "alert alert-primary") => {    
      setMsgClass(msgclass);  
      setMessage(msg);
  }
  
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

  //Application state variables
  const [stateVars, setStateVars] = useState({
    "viewState" : VIEWS.RESTAURANTS,  
    "logintoken" : "",
    "userRole" : 0,
    "loggedinUserID" : 0,
    "selectedRestaurantID" : 0
  })


  //on first run: GET restaurants, restauranttypes and userroles
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

  //NavBar Search Button Clicked: Update filteredRestaurants object
  const DoSearch = (text) => {
    setfilteredRestaurants(restaurants.filter(n => n.name.toLowerCase().includes(text.toLowerCase())));
  }

  //NavBar Navigation button clicked : Update stateVars.viewState
  const NavItemClicked = (view) => {
    let newStateVars=[stateVars];
    newStateVars.viewState = view;
    setStateVars(newStateVars); 
  }

  //Signup Submit button clicked : POST new user
  const SignupBtnClicked = (formdata) => {
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

    axios.post('https://webfoodr5.herokuapp.com/users', jsonBody)
    .then(response => {
      showMessageBar(response.data.message, "alert alert-success")
      setTimeout(() => { showMessageBar(""); NavItemClicked(VIEWS.SIGNIN); }, 5000);
    }).catch(error => {
      showMessageBar(error.response.data.message, "alert alert-danger")
      setTimeout(() => showMessageBar("Enter valid data to each field"), 7000);
    });
  }

  //Return Single-Page application
  return (
    <div>
      <Navbar onNavItemClicked={NavItemClicked} onSearchBtnClicked={DoSearch}/>
      { stateVars.viewState === VIEWS.RESTAURANTS ? <Categories types={restaurantTypes}/> : 
        message !== "" ? <div class="messageArea"><div class={msgClass} role="alert">{message}</div></div> : <div class="messageArea"/>}
      { stateVars.viewState === VIEWS.NEWMENUITEM ? <NewMenuItem/> : <></> }
      { stateVars.viewState === VIEWS.DELETEACCOUNT ? <DeleteAccount/> : <></> }
      { stateVars.viewState === VIEWS.PERSONALINFO? <PersonalInfo/> : <></> }
      { stateVars.viewState === VIEWS.RESTAURANTINFO? <RestaurantInfo/> : <></> }
      { stateVars.viewState === VIEWS.NEWRESTAURANT? <NewRestaurant/> : <></> }
      { stateVars.viewState === VIEWS.SIGNIN ? <SignIn/> : <></> }
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
