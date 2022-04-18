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
            <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
              <option selected>Choose...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>
            <button class="btn btn-outline-primary" type="button">Button</button>
          </div> }
    </div>
  )
}