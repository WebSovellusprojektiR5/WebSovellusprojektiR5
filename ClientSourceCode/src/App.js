import './App.css';
import RestaurantsView from './components/RestaurantsView';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Categories from './components/Categories';

function App() {

  const [restaurants, setRestaurants] = useState([]);
  const [filteredrestaurants, setfilteredRestaurants] = useState([]);
  
  //VIEWS constant (ENUM)
  const VIEWS = {
    RESTAURANTS : "restaurants",
    ITEMS : "items",
    SIGNIN : "signin",
    SIGNUP : "signup",
    ORDERHISTORY : "orderhistory"
  }

  //Application state variables
  const [stateVars, setStateVars] = useState({
    "viewState" : VIEWS.RESTAURANTS,  
    "logintoken" : "",
    "userRole" : 0,
    "loggedinUserID" : 0,
    "selectedRestaurantID" : 0
  })


  //on first run: Get restaurants
  useEffect(() => {
    axios.get('https://webfoodr5.herokuapp.com/restaurants')
    .then(response => {
      setRestaurants(response.data);
      setfilteredRestaurants(response.data);
    })
  }, []);

  //NavBar Search Button Clicked
  const DoSearch = (text) => {
    setfilteredRestaurants(restaurants.filter(n => n.name.toLowerCase().includes(text.toLowerCase())));
  }

  //NavBar Navigation button clicked
  const NavItemClicked = (view) => {
    let newStateVars=[stateVars];
    newStateVars.viewState = view;
    setStateVars(newStateVars);
  }

  //Return Single-Page application
  return (
    <div>
      <Navbar onNavItemClicked={NavItemClicked} onSearchBtnClicked={DoSearch}/>
      { stateVars.viewState === VIEWS.RESTAURANTS ? <Categories/> : <></> }
      { stateVars.viewState === VIEWS.SIGNIN ? <SignIn/> : <></> }
      { stateVars.viewState === VIEWS.SIGNUP ? <SignUp/> : <></> }
      { stateVars.viewState === VIEWS.RESTAURANTS ?
        <div className="pageContainer">
        {
            filteredrestaurants.map(i => <RestaurantsView item={i} />)
        }
        </div> : <></> 
      }
    </div>
  );
}

export default App;
