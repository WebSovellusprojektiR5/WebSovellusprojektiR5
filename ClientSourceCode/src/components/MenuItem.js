import React from 'react'
import {useState} from 'react'


export default function MenuItem(props) {

  const [qty, setQty] = useState(1);

  return(
    <div className="pageItemTwo">
        <img src={props.item.thumbnail_url}/>
        <div className="nimi">{props.item.name}</div>
        <div className="kuvaus">{props.item.description}</div>
        <div className="Hinta">{props.item.price}€</div>
        {props.userRole.toLowerCase() === "owner" ?
        <div><button type="button" className="btn btn-primary" onClick={() => props.onEditItemClicked(props.item.id)}>Edit</button>
        <button type="button" className="btn btn-danger" onClick={() => props.onDeleteItemClicked(props.item.id)}>Delete</button></div> :
          <div className="input-group">
            <input type="number" min="1" max="100" step="1" placeholder="1" className="form-control" id="inputQuantity" value = {qty} onChange={(event) => setQty(event.target.value)} required/>
            <button className="btn btn-outline-primary" type="button" onClick={() => props.onAddToChartClicked(props.item.id, qty)}>Add to cart</button>
          </div> }
    </div>
  )
}