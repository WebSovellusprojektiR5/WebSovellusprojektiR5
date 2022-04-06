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

  useEffect(() => {
    axios.get('https://webfoodr5.herokuapp.com/restaurants')
    .then(response => {
      //console.log(response.data);
      setRestaurants(response.data);
    })
  }, []);

  return (
    <div>
    <Navbar/>
    <Categories/>
    <SignIn/>
    <SignUp/>
        <div className="pageContainer">
        {
            restaurants.map(i => <RestaurantsView item={i} />)
        }
        </div>

    </div>
  );
}

export default App;
