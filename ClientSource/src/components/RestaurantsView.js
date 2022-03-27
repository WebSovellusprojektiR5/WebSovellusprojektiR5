import React from 'react'

export default function RestaurantsView(props) {
    return (
    <div key={props.id} className="pageItem">
        <img src={props.item.thumbnail_url} />
        <div>{props.item.name}</div>
        <div>{props.item.description}</div>
    </div>
  )
}