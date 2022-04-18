import React from 'react'
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";

export default function ItemInfo(props) {
    
    //Form submit button pressed : Validate password and fire app.js onSubmitBtnClicked
    const handleSubmit = (e) => {
        e.preventDefault();
        if(e.target["ItemType"].value !== "") {
            //ok : call app.js function
            props.onSubmitBtnClicked(e.target);
        }   
        else {
            //nok : clear passwords and show error on messagebar
            props.showMessage("Please set item category!", "alert alert-danger");
            setTimeout(() => props.showMessage(""), 7000);
        }
    }

    return (
    <div className="containerTwo">
        <form className="row g-3" onSubmit = {handleSubmit}>
            <div className="col-md-6">
                <label htmlFor="inputItemName" className="form-label">Name</label>
                <input type="text" maxLength="45" className="form-control" id="inputItemName" defaultValue={props.data.name} required/>
            </div>
            <div className="form-group">
                <label htmlFor="itemImage">Import Thumbnail</label>
                <input type="file" className="form-control-file" id="itemImage" accept="image/png, image/gif, image/jpeg"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="inputDescription" className="form-label">Description</label>
                <input type="text" maxLength="255" className="form-control" id="inputDescription" defaultValue={props.data.description} required/>
            </div>

            <div className="col-md-3">
                <label htmlFor="inputPrice" className="form-label">Price</label>
                <input type="number" min="0.01" max="10000.00" step="0.01" placeholder="1.00" className="form-control" id="inputPrice" defaultValue={props.data.price} required/>
            </div>
            <div className="col-md-6">
                <label htmlFor="ItemType" className="form-label">Category</label>
                <Combobox data={props.types} dataKey="id" textField="name" name="ItemType" placeholder="Choose from the list or enter a new one:" defaultValue={props.types.filter(i => i.id === props.data.id)[0].name}/>
            </div>

            <div className="col-12">
                <br/>
                <button type="submit" className="btn btn-primary">Edit</button>
            </div>
        </form>
      </div>
  )
}
