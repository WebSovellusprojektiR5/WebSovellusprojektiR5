import React from 'react'

export default function RestaurantsView(props) {
  var currency="€";
  return (
    <div className="pageItem">
        <img src={props.item.thumbnail_url} onClick={() => props.onRestaurantClicked(props.item.id)}/>
        <div className="nimi">{props.item.name}</div>
        <div className="kuvaus">{props.item.description}</div>
        <div className="Hintaluokka">{currency.repeat(props.item.price_level)}</div>
        {props.userRole.toLowerCase() === "owner" ?
        <div><button type="button" className="btn btn-primary" onClick={() => props.onEditItemClicked(props.item.id)}>Edit</button>
        <button type="button" className="btn btn-danger" onClick={() => props.onDeleteItemClicked(props.item.id)}>Delete</button></div> : <></> }
    </div>
  )
}