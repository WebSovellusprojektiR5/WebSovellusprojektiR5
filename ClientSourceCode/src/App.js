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
import ItemInfo from './components/ItemInfo';
import NewRestaurant from './components/NewRestaurant';
import RestaurantsView from './components/RestaurantsView';
import ShoppingCart from './components/ShoppingCart';
import MenuItem from './components/MenuItem';
import RestaurantOrders from './components/RestaurantOrders';


function App() {

  const RESTURL = 'https://webfoodr5.herokuapp.com';
  //const RESTURL = 'http://localhost:8080';

  const [restaurants, setRestaurants] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
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
  const [activeRestaurantID, setActiveRestaurantID] = useState(-1);
  const [activeItemID, setActiveItemID] = useState(-1);
  const [activeRestaurantName, setActiveRestaurantName] = useState("");


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
    ITEMINFO : "iteminfo",
    NEWRESTAURANT : "newrestaurant",
    SHOPPINGCART : "shoppingcart",
    MENUITEM : "menuitem",
    RESTAURANTORDERS : "restaurantorders"
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
      if(view === VIEWS.SHOPPINGCART && activeRestaurantID >= 0) {
        UpdateShoppingCart();
        setActiveRestaurantName(restaurants.filter(i => i.id === activeRestaurantID)[0].name)
      }
      if(newStateVars === "") newStateVars = {...stateVars};
      newStateVars.lastViewState = newStateVars.viewState;
      //Only owner can select some VIEWS. Otherwise set restaurants view
      if (newStateVars.loggedinUserRole !== "" && newStateVars.loggedinUserRole.toLowerCase() !== "owner" && 
       (view === VIEWS.NEWMENUITEM || view === VIEWS.NEWRESTAURANT || view === VIEWS.RESTAURANTINFO)) view = VIEWS.RESTAURANTS;  
      newStateVars.viewState = view;
      setStateVars(newStateVars); 
      //Hide Active restaurant name bar
      if (view !== VIEWS.NEWMENUITEM && view !== VIEWS.MENUITEM && view !== VIEWS.RESTAURANTINFO && view === VIEWS.SHOPPINGCART) setActiveRestaurantName("");
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
    if(stateVars.loggedinUserRole.toLowerCase() === "owner") newrestaurants = newrestaurants.filter(n => n.idperson === stateVars.loggedinUserID);
    if(filterCatID >= 0 && filterCatID < 1000) newrestaurants = newrestaurants.filter(f => f.idrestauranttype === filterCatID);
    if(filterCatID >= 1000) newrestaurants = newrestaurants.filter(f => f.price_level === filterCatID - 1000);  
    setfilteredRestaurants(newrestaurants);
  }
  const FilterRestaurantsByCatID = (id) => {
    setFilterCatID(id);
    let newrestaurants = restaurants.filter(n => n.name.toLowerCase().includes(filterText.toLowerCase()) || n.description.toLowerCase().includes(filterText.toLowerCase()));
    if(stateVars.loggedinUserRole.toLowerCase() === "owner") newrestaurants = newrestaurants.filter(n => n.idperson === stateVars.loggedinUserID);
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
  const CreateRestaurantBtnClicked = (formdata, method="POST") => {
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
    if(method === "PUT") jsonBody["id"] = activeRestaurantID;
    if(formdata["itemImage"].value === "") jsonBody["thumbnail_url"] = restaurants.filter(i => i.id === activeRestaurantID)[0].thumbnail_url;
    //POST/PUT query
    const config = { method: method, url: RESTURL + '/restaurants', data: jsonBody }
    axios(config)
    //axios.post(RESTURL + '/restaurants', jsonBody)
    .then(response => {
      if(formdata["itemImage"].value !== "")
      {
        //ok : Try to add image
        let fdata = new FormData();
        fdata.append('ID', response.data);
        fdata.append('file', formdata["itemImage"].files[0]);
        axios.put(RESTURL + '/restaurantimage', fdata)
        .then(response => {
          if(method==="POST") ShowMessageBar("Restaurant added successfully", "alert alert-success");
          else ShowMessageBar("Restaurant edited successfully", "alert alert-success");
          GetRestaurants(stateVars.loggedinUserRole, stateVars.loggedinUserID);
          setTimeout(() => { ShowMessageBar(""); ChangeView(VIEWS.RESTAURANTS); }, 3000);
        })
        .catch(error => {
          ShowMessageBar(error.toString(), "alert alert-danger");
          GetRestaurants(stateVars.loggedinUserRole, stateVars.loggedinUserID);
          setTimeout(() => { ShowMessageBar(""); ChangeView(VIEWS.RESTAURANTS); }, 3000);
        })
      }
      else {
        ShowMessageBar("Restaurant edited successfully", "alert alert-success");
        GetRestaurants(stateVars.loggedinUserRole, stateVars.loggedinUserID);
        setTimeout(() => { ShowMessageBar(""); ChangeView(VIEWS.RESTAURANTS); }, 3000);
      }
    }).catch(error => {
      //nok : Set messagebar errormessage, wait and set info message
      if (error.response == null) ShowMessageBar(error.toString(), "alert alert-danger");
      else ShowMessageBar(error.response.data.message, "alert alert-danger");
      setTimeout(() => ShowMessageBar("Create Restaurant - Enter valid data to each field"), 6000);
    }); 
  }
  //* Edit restaurant button clicked: edit restaurant (PUT) *
  const EditRestaurantBtnClicked = (formdata) => {
    CreateRestaurantBtnClicked(formdata, "PUT");
  }

  //* Get restaurants *
  const GetRestaurants = (urole, uid) => {
    axios.get(RESTURL + '/restaurants')
    .then(response => {
      setRestaurants(response.data);
      var rants = response.data;
      if(urole.toLowerCase() === "owner" && uid >= 0) rants = rants.filter(n => n.idperson === uid);
      setfilteredRestaurants(rants);
    });
  }
  //* Delete restaurant clicked : set not active (PUT) *

  const DeleteRestaurantItemBtnClicked = (RID) => {
    if(window.confirm('Are you sure you wish to delete this restaurant?'))
    {
      let fdata = new FormData();
      fdata.append('restaurantID', RID);
      axios.put(RESTURL + "/restaurantdelete", fdata)
      .then(response => {
        //ok : Set messagebar text, wait and change view
        ShowMessageBar(response.data.message, "alert alert-success");
        GetRestaurants(stateVars.loggedinUserRole, stateVars.loggedinUserID);
        setTimeout(() => { ShowMessageBar(""); }, 3000);
      })
      .catch(error => {
        //nok : Set messagebar errormessage, wait and set info message
        if (error.response == null) ShowMessageBar(error.toString(), "alert alert-danger");
        else ShowMessageBar(error.response.data.message, "alert alert-danger");
        setTimeout(() => { ShowMessageBar(""); ChangeView(stateVars.lastViewState); }, 3000);
      });
    }
  }

  //* Create Item button clicked : POST new item *
  const CreateItemBtnClicked = (formdata, method="POST") => {
    //Generate JSON body
    let jsonBody = {
      "name" : formdata["inputItemName"].value,
      "description" : formdata["inputDescription"].value,
      "price" : parseFloat(formdata["inputPrice"].value).toFixed(2),
      "idrestaurant" : activeRestaurantID
    }   
    if(formdata["itemImage"].value === "") jsonBody["thumbnail_url"] = items.filter(i => i.id === activeItemID)[0].thumbnail_url;
    if(method === "PUT") jsonBody["id"] = activeItemID;
    //ok : Add item category if not exist already
    axios.post(RESTURL + '/categories', {"name" : formdata["ItemType"].value })
    .then(response => {   
      jsonBody["iditemcategory"] = response.data.id;
      //ok : Add item
      //POST/PUT query
      const config = { method: method, url: RESTURL + '/items', data: jsonBody }
      axios(config)
      .then(response => {
        //ok : Try to add image
        if(formdata["itemImage"].value !== "") {
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
        }
        else {
          ShowMessageBar("Item added successfully", "alert alert-success");
          GetRestaurantMenuItems(activeRestaurantID);
          setTimeout(() => { ShowMessageBar(""); ChangeView(VIEWS.MENUITEM); }, 3000);
        }
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


  //* Edit item button clicked *
  const EditItemBtnClicked = (formdata) => {
    CreateItemBtnClicked(formdata, "PUT");
  }

  //* Delete item button clicked *
  const DeleteItemBtnClicked = (IID) => {
    if(window.confirm('Are you sure you wish to delete this menu item?'))
    {
      let fdata = new FormData();
      fdata.append('id', IID);
      axios.put(RESTURL + "/itemdelete", fdata)
      .then(response => {
        //ok : Set messagebar text, wait and change view
        ShowMessageBar(response.data.message, "alert alert-success");
        GetRestaurantMenuItems(stateVars.loggedinUserRole, stateVars.loggedinUserID);
        setTimeout(() => { ShowMessageBar(""); }, 3000);
      })
      .catch(error => {
        //nok : Set messagebar errormessage, wait and set info message
        if (error.response == null) ShowMessageBar(error.toString(), "alert alert-danger");
        else ShowMessageBar(error.response.data.message, "alert alert-danger");
        setTimeout(() => { ShowMessageBar(""); ChangeView(stateVars.lastViewState); }, 3000);
      });
    }
  }
  //* Signup Submit button clicked : POST new user *
  const SignupBtnClicked = (formdata, method="POST") => {
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
    if(method === "PUT") jsonBody["id"] = stateVars.loggedinUserID;
    //POST/PUT query
    const config = { method: method, url: RESTURL + '/users', data: jsonBody }
    //axios.post(RESTURL + '/users', jsonBody)
    axios(config)
    .then(response => {
      //ok : Set messagebar text, wait and change view
      ShowMessageBar(response.data.message, "alert alert-success");
      setTimeout(() => { ShowMessageBar(""); ChangeView(stateVars.lastViewState); }, 3000);
    }).catch(error => {
      //nok : Set messagebar errormessage, wait and set info message
      if (error.response == null) ShowMessageBar(error.toString(), "alert alert-danger");
      else ShowMessageBar(error.response.data.message, "alert alert-danger");
      setTimeout(() => {method === "POST" ? ShowMessageBar("SIGN UP - Enter valid data to each field") : ShowMessageBar("")}, 6000); 
    });
  }

  //* Edit user button clicked: edit user (PUT) *
  const EditUserBtnClicked = (formdata) => {
    SignupBtnClicked(formdata, "PUT");
  }

  //* Delete user account clicked : clear user data and set not active (PUT) *
  const DeleteAccountClicked = (confirmed) => {
    if(confirmed) {
      let fdata = new FormData();
      fdata.append('userID', stateVars.loggedinUserID);
      axios.put(RESTURL + "/userdelete", fdata)
      .then(response => {
        //ok : Set messagebar text, wait and change view
        ShowMessageBar(response.data.message, "alert alert-success");
        setTimeout(() => { ShowMessageBar(""); SignOut(); }, 3000);
        SignOut();
      })
      .catch(error => {
        //nok : Set messagebar errormessage, wait and set info message
        if (error.response == null) ShowMessageBar(error.toString(), "alert alert-danger");
        else ShowMessageBar(error.response.data.message, "alert alert-danger");
        setTimeout(() => { ShowMessageBar(""); ChangeView(stateVars.lastViewState); }, 3000);
      });
    }
    else ChangeView(stateVars.lastViewState);
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
      newStateVars.viewState = VIEWS.RESTAURANTS;
      newStateVars.loggedinToken = response.data.token;
      newStateVars.loggedinUserID = decoded.userid;
      newStateVars.loggedinUserRoleID = decoded.roleid; 
      newStateVars.loggedinUserRole = decoded.userrole;   
      setStateVars(newStateVars); 
      window.sessionStorage.setItem("sessionToken", response.data.token);
      //owner can see only his/her own restaurants
      if(decoded.userrole.toLowerCase() === "owner") {
        let newrestaurants = restaurants.filter(n => n.idperson === decoded.userid);
        setfilteredRestaurants(newrestaurants);
      }     
      //update personinfo
      GetPersonInfo(decoded.userid);
      setTimeout(() => { ShowMessageBar(""); ChangeView(VIEWS.RESTAURANTS, newStateVars); }, 3000);  //Statehook slow updating workaround              
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
        setActiveRestaurantName(restaurants.filter(i => i.id === RID)[0].name);
        ChangeView(VIEWS.MENUITEM);
      });
    });
  } 

  //* Add item to existing order. If order does not exist create it first *
  const AddToChartClicked = (IID, qty) => {
    let OID = -1;
    if(stateVars.loggedinUserID < 0) {
      ShowMessageBar("You must sign in before making an order!", "alert alert-danger");
      setTimeout(() => ShowMessageBar(""), 6000);
      return;
    }
    
    let jsonOrderBody = {
      "address1" : "",
      "address2" : "",
      "idrestaurant" : activeRestaurantID,
      "idperson" : stateVars.loggedinUserID
    }
    let jsonItemBody = {
      "iditem" : IID,
      "quantity" : parseInt(qty)
    }

    //Find active order by restaurant id
    axios.get(RESTURL + '/activeorderbyrestaurant', { params: {restaurantID: activeRestaurantID} })
    .then(response => { 
      if(response.data === '') {
        //not found: add an order
        axios.post(RESTURL + '/ordersbyuser', jsonOrderBody)
        .then(response => {
          //add item to order
          OID = response.data;
          jsonItemBody["idorder"] = OID;
          axios.post(RESTURL + "/orderitem", jsonItemBody)
          .then(response => {
            //ok: Item added
            UpdateShoppingCart(OID);
            ShowMessageBar(qty + "x " + items.filter(i => i.id === IID)[0].name + " is added to the shopping chart", "alert alert-success");
            setTimeout(() => { ShowMessageBar(""); }, 3000);
          })
          .catch(error => {
            //nok: Adding item
            ShowMessageBar(error.toString(), "alert alert-danger");
            setTimeout(() => { ShowMessageBar(""); ChangeView(stateVars.lastViewState); }, 3000);
          })
        })
        .catch(error => {
          //nok: Adding an order
          ShowMessageBar(error.toString(), "alert alert-danger");
          setTimeout(() => { ShowMessageBar(""); ChangeView(stateVars.lastViewState); }, 3000);
          return;
        })       
      }
      else {
        //found: add item to order
        OID = response.data.id;
        jsonItemBody["idorder"] = OID;
        axios.post(RESTURL + "/orderitem", jsonItemBody)
        .then(response => {
          //ok: Item added
          UpdateShoppingCart(OID);
          ShowMessageBar(qty + "x " + items.filter(i => i.id === IID)[0].name + " is added to the shopping chart");
          setTimeout(() => { ShowMessageBar(""); }, 3000);
        })
        .catch(error => {
          //nok: Adding item
          ShowMessageBar(error.toString(), "alert alert-danger");
          setTimeout(() => { ShowMessageBar(""); ChangeView(stateVars.lastViewState); }, 3000);
        })
      }   
    })
    .catch(error => {
      //nok: Get order id failed
      ShowMessageBar(error.toString(), "alert alert-danger");
      setTimeout(() => { ShowMessageBar(""); ChangeView(stateVars.lastViewState); }, 3000);
      return;
    })       
  }

  //Get order items
  const UpdateShoppingCart = () => {
    if(activeRestaurantID < 0) {
      ShowMessageBar("You must set active restaurant ID!", "alert alert-danger");
      setTimeout(() => ShowMessageBar(""), 3000);
      return;
    }
    //Find active order by restaurant
    axios.get(RESTURL + '/activeorderbyrestaurant', { params: {restaurantID: activeRestaurantID} })
    .then(response => {
      if (response.data.id >= 0) {
        //get items by that order
        axios.get(RESTURL + '/orderitem', { params: {orderID: response.data.id} })
        .then(response => { setShoppingCart(response.data); })
        .catch(error => {
          ShowMessageBar(error.toString(), "alert alert-danger");
          setTimeout(() => { ShowMessageBar(""); }, 3000);
        });
      }
    })
    .catch(error => {
      ShowMessageBar(error.toString(), "alert alert-danger");
      setTimeout(() => { ShowMessageBar(""); }, 3000);
    });
  }


  const EditItemItemBtnClicked = (IID) => {
    setActiveItemID(IID);
    ChangeView(VIEWS.ITEMINFO);
  }

  const EditRestaurantItemBtnClicked = (RID) => {
    setActiveRestaurantID(RID);
    ChangeView(VIEWS.RESTAURANTINFO);
  }

  const RestaurantNameClicked = () => {ChangeView(VIEWS.RESTAURANTS); }

  //Return Single-Page application
  return (
    <div>
      <Navbar rid={activeRestaurantID} onNavItemClicked={ChangeView} onSearchBtnClicked={stateVars.viewState === VIEWS.RESTAURANTS ? FilterRestaurantsBySearchText : FilterItemsBySearchText} onSignoutClicked={SignOut} statevars={stateVars} />
      { stateVars.viewState === VIEWS.RESTAURANTS ? <Categories types={restaurantTypes} onItemClicked={FilterRestaurantsByCatID}/> : <></> }
      { activeRestaurantName !== "" ? <div className="messageArea" onClick={RestaurantNameClicked}><div className="alert alert-primary" role="alert">{activeRestaurantName}</div></div> : <></>}
      { stateVars.viewState === VIEWS.MENUITEM ? <ItemTypes types={restaurantItemTypes} onItemClicked={FilterItemsByCatID} onReturnClicked={ChangeView} /> : <></> }
      { message !== "" ? <div className="messageArea"><div className={msgClass} role="alert">{message}</div></div> : <div className="messageArea"/>}
      { stateVars.viewState === VIEWS.NEWMENUITEM ? <NewMenuItem types={restaurantItemTypes} showMessage={ShowMessageBar} onSubmitBtnClicked={CreateItemBtnClicked} /> : <></> }
      { stateVars.viewState === VIEWS.DELETEACCOUNT ? <DeleteAccount onSubmitBtnClicked={DeleteAccountClicked}/> : <></> }
      { stateVars.viewState === VIEWS.PERSONALINFO ? <PersonalInfo data={personInfo} roles={userRoles} showMessage={ShowMessageBar} onSubmitBtnClicked={EditUserBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.RESTAURANTINFO ? <RestaurantInfo data={restaurants.filter(i => i.id === activeRestaurantID)[0]} types={restaurantTypes} onSubmitBtnClicked={EditRestaurantBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.RESTAURANTORDERS ? <RestaurantOrders data={restaurants.filter(i => i.id === activeRestaurantID)[0]} types={restaurantTypes} onSubmitBtnClicked={EditRestaurantBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.ITEMINFO ? <ItemInfo showMessage={ShowMessageBar} types={restaurantItemTypes} data={items.filter(i => i.id === activeItemID)[0]} onSubmitBtnClicked={EditItemBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.NEWRESTAURANT ? <NewRestaurant showMessage={ShowMessageBar} onSubmitBtnClicked={CreateRestaurantBtnClicked} types={restaurantTypes} /> : <></> }
      { stateVars.viewState === VIEWS.SHOPPINGCART? <ShoppingCart rid={activeRestaurantID} items={items} data={shoppingCart} /> : <></> }
      { stateVars.viewState === VIEWS.SIGNIN ? <SignIn showMessage={ShowMessageBar} onSubmitBtnClicked={SigninBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.SIGNUP ? <SignUp showMessage={ShowMessageBar} roles={userRoles} onSubmitBtnClicked={SignupBtnClicked}/> : <></> }
      { stateVars.viewState === VIEWS.RESTAURANTS ?
        <div className="pageContainer">
        {
            filteredRestaurants.map(i => <RestaurantsView key={i.id} item={i} userRole={stateVars.loggedinUserRole} onRestaurantClicked={GetRestaurantMenuItems} onEditItemClicked={EditRestaurantItemBtnClicked} onDeleteItemClicked={DeleteRestaurantItemBtnClicked}/>)
        }
        </div> : <></> 
      }
      { stateVars.viewState === VIEWS.MENUITEM ?
        <div className="pageContainer">
        {
            filteredItems.map(i => <MenuItem key={i.id} item={i} userRole={stateVars.loggedinUserRole} onAddToChartClicked={AddToChartClicked} onEditItemClicked={EditItemItemBtnClicked} onDeleteItemClicked={DeleteItemBtnClicked}/>)
        }
        </div> : <></> 
      }
    </div>
  );
}

export default App;
