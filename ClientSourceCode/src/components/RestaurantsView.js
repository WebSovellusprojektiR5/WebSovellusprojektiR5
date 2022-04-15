import React from 'react'

export default function RestaurantsView(props) {

  const VIEWS = {
    MENUITEM : "menuitem"}

    return (
    <div className="pageItem" onClick={() => props.onRestaurantClicked(VIEWS.MENUITEM)}>
        <img src={props.item.thumbnail_url}/>
        <div className="nimi">{props.item.name}</div>
        <div className="kuvaus">{props.item.description}</div>
        <div className="Hintaluokka">€€€€</div>
    </div>
  )
}