import React from 'react'


export default function MenuItem(props) {
  const onConfirm = (text) => {
    console.log(text)
  }
  const onCancel = (text) => {
    console.log(text)
  }

    return(
    <div className="pageItem">
        <img src={props.item.thumbnail_url}/>
        <div className="nimi">{props.item.name}</div>
        <div className="kuvaus">{props.item.description}</div>
        <div className="Hinta">{props.item.price}€</div>
        {props.userRole.toLowerCase() === "owner" ?
        <div><button type="button" className="btn btn-primary" onClick={() => props.onEditItemClicked(props.item.id)}>Edit</button>
        <button type="button" className="btn btn-danger" onClick={() => props.onDeleteItemClicked(props.item.id)}>Delete</button></div> : 
        <div>Qty and basket come here</div> }
    </div>
  )
}