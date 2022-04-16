import './App.css';

import {useEffect, useState} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; 
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Categories from './components/Categories';
import ItemTypes from './components/ItemTypes';
import NewMenuItem from './components/NewMenuItem';
import DeleteAccount from './components/DeleteAccount';
import PersonalInfo from './components/PersonalInfo';
import RestaurantInfo from './components/RestaurantInfo';
import NewRestaurant from './components/NewRestaurant';
import RestaurantsView from './components/RestaurantsView';
import ShoppingCart from './components/ShoppingCart';
import MenuItem from './components/MenuItem';

function App() {

  const RESTURL = 'https://webfoodr5.herokuapp.com';
  //const RESTURL = 'http://localhost:8080';

  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setfilteredItems] = useState([]);
  const [restaurantTypes, setRestaurantTypes] = useState([]);
  const [restaurantItemTypes, setRestaurantItemTypes] = useState([]);
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
    "loggedinUserRole" : "",
    "loggedinUserID" : -1
  });

  const [activeRestaurantID, setActiveRestaurantID] = useState(-1);

  //* First entry or page refresh: GET restaurants, restauranttypes and userroles. Sign in if token is stored *
  useEffect(() => {
    var token = window.sessionStorage.getItem("sessionToken");
    var urole = "";
    var uid = -1;
    if (token !== null && token !== "null") {
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
    GetRestaurants(urole, uid);
    axios.get(RESTURL + '/restauranttypes')
    .then(response => {
      setRestaurantTypes(response.data);
    });
    axios.get(RESTURL + '/userroles')
    .then(response => {
      setUserRoles(response.data);
    });

  }, []);

  //* NavBar Navigation button clicked : Update stateVars.viewState *
  const ChangeView = (view, newStateVars = "", forceUpdate = false) => {
    if(view !== stateVars.viewState || forceUpdate) {
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
    if(stateVars.loggedinUserRole === "owner") newrestaurants = newrestaurants.filter(n => n.idperson === stateVars.loggedinUserID);
    if(filterCatID >= 0 && filterCatID < 1000) newrestaurants = newrestaurants.filter(f => f.idrestauranttype === filterCatID);
    if(filterCatID >= 1000) newrestaurants = newrestaurants.filter(f => f.price_level === filterCatID - 1000);  
    setfilteredRestaurants(newrestaurants);
  }
  const FilterRestaurantsByCatID = (id) => {
    setFilterCatID(id);
    let newrestaurants = restaurants.filter(n => n.name.toLowerCase().includes(filterText.toLowerCase()) || n.description.toLowerCase().includes(filterText.toLowerCase()));
    if(stateVars.loggedinUserRole === "owner") newrestaurants = newrestaurants.filter(n => n.idperson === stateVars.loggedinUserID);
    if(id >= 0 && id < 1000) newrestaurants = newrestaurants.filter(f => f.idrestauranttype === id);
    if(id >= 1000) newrestaurants = newrestaurants.filter(f => f.price_level === id - 1000);
    setfilteredRestaurants(newrestaurants);
  }

  //* Update filteredItems object *
  const FilterItemsBySearchText = (text) => {
    setFilterText(text);   
    let newitems = items.filter(n => n.name.toLowerCase().includes(text.toLowerCase()) || n.description.toLowerCase().includes(text.toLowerCase()));
    if(filterCatID >= 0) newitems = newitems.filter(f => f.iditemCategory === filterCatID);
    setfilteredItems(newitems);
  }
  const FilterItemsByCatID = (id) => {
    setFilterCatID(id);
    let newitems = items.filter(n => n.name.toLowerCase().includes(filterText.toLowerCase()) || n.description.toLowerCase().includes(filterText.toLowerCase()));
    if(id >= 0) newitems = newitems.filter(f => f.iditemCategory === id);
    setfilteredItems(newitems);
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
    }
    //POST query
    axios.post(RESTURL + '/restaurants', jsonBody)
    .then(response => {
      //ok : Try to add image
      let fdata = new FormData();
      fdata.append('ID', response.data);
      fdata.append('file', formdata["itemImage"].files[0]);
      axios.put(RESTURL + '/restaurantimage', fdata)
      .then(response => {
        ShowMessageBar("Restaurant added successfully", "alert alert-success");
        GetRestaurants(stateVars.loggedinUserRole, stateVars.loggedinUserID);
        setTimeout(() => { ShowMessageBar(""); ChangeView(VIEWS.RESTAURANTS); }, 3000);
      })
      .catch(error => {
        ShowMessageBar(error.toString(), "alert alert-danger");
        GetRestaurants(stateVars.loggedinUserRole, stateVars.loggedinUserID);
        setTimeout(() => { ShowMessageBar(""); ChangeView(VIEWS.RESTAURANTS); }, 3000);
      })
    }).catch(error => {
      //nok : Set messagebar errormessage, wait and set info message
      if (error.response == null) ShowMessageBar(error.toString(), "alert alert-danger");
      else ShowMessageBar(error.response.data.message, "alert alert-danger");
      setTimeout(() => ShowMessageBar("Create Restaurant - Enter valid data to each field"), 6000);
    }); 
  }

  //* Get restaurants *
  const GetRestaurants = (urole, uid) => {
    axios.get(RESTURL + '/restaurants')
    .then(response => {
      setRestaurants(response.data);
      var rants = response.data;
      if(urole === "owner" && uid >= 0) rants = rants.filter(n => n.idperson === uid);
      setfilteredRestaurants(rants);
    });
  }

  //* Create Item button clicked : POST new item *
  const CreateItemBtnClicked = (formdata) => {
    //Generate JSON body
    let jsonBody = {
      "name" : formdata["inputItemName"].value,
      "description" : formdata["inputDescription"].value,
      "price" : parseFloat(formdata["inputPrice"].value),
      "idrestaurant" : activeRestaurantID
    }
    //ok : Add item category if not exist already
    axios.post(RESTURL + '/categories', {"name" : formdata["ItemType"].value })
    .then(response => {   
      jsonBody["iditemcategory"] = response.data.id;
      //ok : Add item
      axios.post(RESTURL + '/items', jsonBody)
      .then(response => {
        //ok : Try to add image
        let fdata = new FormData();
        fdata.append('ID', response.data);
        fdata.append('file', formdata["itemImage"].files[0]);
        axios.put(RESTURL + '/itemimage', fdata)
        .then(response => {
          ShowMessageBar("Item added successfully", "alert alert-success");
          GetRestaurantMenuItems(activeRestaurantID);
          setTimeout(() => { ShowMessageBar(""); ChangeView(VIEWS.MENUITEM); }, 3000);
        })
        .catch(error => {
          //nok: Image adding failed (Item is added without image)
          ShowMessageBar(error.toString(), "alert alert-danger");
          GetRestaurantMenuItems(activeRestaurantID);
          setTimeout(() => { ShowMessageBar(""); ChangeView(VIEWS.MENUITEM); }, 3000);
        })
      })
      .catch(error => {
        //nok: Item adding failed!
        ShowMessageBar(error.toString(), "alert alert-danger");
        setTimeout(() => { ShowMessageBar(""); ChangeView(VIEWS.MENUITEM); }, 3000);
      })        
    })
    .catch(error => {
      //nok: Item category failed!
      ShowMessageBar(error.toString(), "alert alert-danger");
      setTimeout(() => ShowMessageBar("Create Menu Item - Enter valid data to each field"), 6000);
    });        
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
    axios.post(RESTURL + '/users', jsonBody)
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
      axios.post(RESTURL + '/loginbasic', {}, {
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
    axios.get(RESTURL + '/user', { params: {userID: UID} })
    .then(response => { setPersonInfo(response.data); 
    });
  }

  //* Get Restaurant menu items and categories*
  const GetRestaurantMenuItems = (RID) => {
    axios.get(RESTURL + '/itemsbyrestaurant', { params: {restaurantID: RID} })
    .then(response => {
      setItems(response.data);
      setfilteredItems(response.data);
      axios.get(RESTURL + '/categoriesbyrestaurant', { params: {restaurantID: RID} })
      .then(response => { 
        setRestaurantItemTypes(response.data);
        setActiveRestaurantID(RID);
        ChangeView(VIEWS.MENUITEM);
      });
    });
  }

  //Return Single-Page application
  return (
    <div>
      <Navbar onNavItemClicked={ChangeView} onSearchBtnClicked={stateVars.viewState === VIEWS.RESTAURANTS ? FilterRestaurantsBySearchText : FilterItemsBySearchText} onSignoutClicked={SignOut} statevars={stateVars} />
      { stateVars.viewState === VIEWS.RESTAURANTS ? <Categories types={restaurantTypes} onItemClicked={FilterRestaurantsByCatID}/> : <></> }
      { stateVars.viewState === VIEWS.MENUITEM ? <ItemTypes types={restaurantItemTypes} onItemClicked={FilterItemsByCatID}/> : <></> }
      { message !== "" ? <div className="messageArea"><div className={msgClass} role="alert">{message}</div></div> : <div className="messageArea"/>}
      { stateVars.viewState === VIEWS.NEWMENUITEM ? <NewMenuItem types={restaurantItemTypes} showMessage={ShowMessageBar} onSubmitBtnClicked={CreateItemBtnClicked} /> : <></> }
      { stateVars.viewState === VIEWS.DELETEACCOUNT ? <DeleteAccount/> : <></> }
      { stateVars.viewState === VIEWS.PERSONALINFO ? <PersonalInfo data={personInfo} roles={userRoles} showMessage={ShowMessageBar} onSubmitBtnClicked={EditUserBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.RESTAURANTINFO ? <RestaurantInfo/> : <></> }
      { stateVars.viewState === VIEWS.NEWRESTAURANT ? <NewRestaurant showMessage={ShowMessageBar} onSubmitBtnClicked={CreateRestaurantBtnClicked} types={restaurantTypes} /> : <></> }
      { stateVars.viewState === VIEWS.SHOPPINGCART? <ShoppingCart/> : <></> }
      { stateVars.viewState === VIEWS.SIGNIN ? <SignIn showMessage={ShowMessageBar} onSubmitBtnClicked={SigninBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.SIGNUP ? <SignUp showMessage={ShowMessageBar} roles={userRoles} onSubmitBtnClicked={SignupBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.RESTAURANTS ?
        <div className="pageContainer">
        {
            filteredRestaurants.map(i => <RestaurantsView key={i.id} item={i} onRestaurantClicked={GetRestaurantMenuItems} />)
        }
        </div> : <></> 
      }
      { stateVars.viewState === VIEWS.MENUITEM ?
        <div className="pageContainer">
        {
            filteredItems.map(i => <MenuItem key={i.id} item={i} />)
        }
        </div> : <></> 
      }
    </div>
  );
}

export default App;
