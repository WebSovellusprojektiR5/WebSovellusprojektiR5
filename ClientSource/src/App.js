import './App.css';
import RestaurantsView from './components/RestaurantsView';
import {useEffect, useState} from 'react';
import axios from 'axios';


function App() {

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    //Tällä hetkellä paikallinen.. muuta Herokun osoitteeksi, kunhan build on tehty ja siirretty Javan static kansioon
    //https://websovellusprojektir5.herokuapp.com/restaurants
    axios.get('http://localhost:8080/restaurants')
    .then(response => {
      //console.log(response.data);
      setRestaurants(response.data);
    })
  }, []);

  return (
    <div className="pageContainer">
    {
        restaurants.map(i => <RestaurantsView item={i} />)
    }
    </div>
  );
}

export default App;
