import React from 'react'

export default function ItemTypes(props) {
  return (
    <div className="container">
    <ul className="nav justify-content-center">
        {props.types.length > 0 ?
        <li className="nav-item">
            <a className="nav-link" href="#" onClick={() => props.onItemClicked(-1)}>All</a>
        </li> : <li className="nimi">This restaurant does not have any menu items yet! </li> }
        { props.types.map((t) =>                
        <li key={t.id} className="nav-item">
            <a className="nav-link" href="#" onClick={() => props.onItemClicked(t.id)}>{t.name}</a>
        </li> )}
    </ul>
 </div>
  )
}
