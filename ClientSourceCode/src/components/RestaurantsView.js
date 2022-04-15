import React from 'react'

export default function RestaurantsView(props) {
  var currency="€";
  return (
    <div className="pageItem" onClick={() => props.onRestaurantClicked(props.item.id)}>
        <img src={props.item.thumbnail_url}/>
        <div className="nimi">{props.item.name}</div>
        <div className="kuvaus">{props.item.description}</div>
        <div className="Hintaluokka">{currency.repeat(props.item.price_level)}</div>
    </div>
  )
}