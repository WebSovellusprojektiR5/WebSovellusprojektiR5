import React from 'react'

export default function MenuItem(props) {
    return(
    <div className="pageItem">
        <img src={props.item.thumbnail_url}/>
        <div className="nimi">{props.item.name}</div>
        <div className="kuvaus">{props.item.description}</div>
        <div className="Hinta">{props.item.price}</div>
    </div>
  )
}