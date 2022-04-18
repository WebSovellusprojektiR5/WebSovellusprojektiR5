import React from 'react'


export default function MenuItem(props) {
  const onConfirm = (text) => {
    console.log(text)
  }
  const onCancel = (text) => {
    console.log(text)
  }

  return(
    <div className="pageItemTwo">
        <img src={props.item.thumbnail_url}/>
        <div className="nimi">{props.item.name}</div>
        <div className="kuvaus">{props.item.description}</div>
        <div className="Hinta">{props.item.price}€</div>
        {props.userRole.toLowerCase() === "owner" ?
        <div><button type="button" className="btn btn-primary" onClick={() => props.onEditItemClicked(props.item.id)}>Edit</button>
        <button type="button" className="btn btn-danger" onClick={() => props.onDeleteItemClicked(props.item.id)}>Delete</button></div> : 
          <div class="input-group">
            <input type="number" min="1.00" max="10000.00" step="1.00" placeholder="1.00" className="form-control" id="inputQuantity" required/>
            <button class="btn btn-outline-primary" type="button">Add to cart</button>
          </div> }
    </div>
  )
}