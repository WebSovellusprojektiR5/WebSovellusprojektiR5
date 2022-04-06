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

function App() {

  const [restaurants, setRestaurants] = useState([]);
<<<<<<< Updated upstream
=======
  const [filteredrestaurants, setfilteredRestaurants] = useState([]);
  
  //VIEWS constant (ENUM)
  const VIEWS = {
    RESTAURANTS : "restaurants",
    ITEMS : "items",
    SIGNIN : "signin",
    SIGNUP : "signup",
    ORDERHISTORY : "orderhistory",
    NEWMENUITEM : "newmenuitem",
    DELETEACCOUNT : "deleteaccount"
  }
>>>>>>> Stashed changes

  useEffect(() => {
    axios.get('https://webfoodr5.herokuapp.com/restaurants')
    .then(response => {
      //console.log(response.data);
      setRestaurants(response.data);
    })
  }, []);

  return (
    <div>
<<<<<<< Updated upstream
    <Navbar/>
    <Categories/>
    <SignIn/>
    <SignUp/>
=======
      <Navbar onNavItemClicked={NavItemClicked} onSearchBtnClicked={DoSearch}/>
      { stateVars.viewState === VIEWS.RESTAURANTS ? <Categories/> : <></> }
      { stateVars.viewState === VIEWS.NEWMENUITEM ? <NewMenuItem/> : <></> }
      { stateVars.viewState === VIEWS.DELETEACCOUNT ? <DeleteAccount/> : <></> }
      { stateVars.viewState === VIEWS.SIGNIN ? <SignIn/> : <></> }
      { stateVars.viewState === VIEWS.SIGNUP ? <SignUp/> : <></> }
      { stateVars.viewState === VIEWS.RESTAURANTS ?
>>>>>>> Stashed changes
        <div className="pageContainer">
        {
            restaurants.map(i => <RestaurantsView item={i} />)
        }
        </div>

    </div>
  );
}

export default App;
