import React from 'react'
import {useState, useEffect} from 'react'
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";

export default function NewMenuItem(props) {

    //Form submit button pressed : Validate combobox and fire app.js onSubmitBtnClicked
    const handleSubmit = (e) => {
        e.preventDefault();
        if(e.target["ItemType"].value !== "") {
            //ok : call app.js function
            props.onSubmitBtnClicked(e.target);
        }   
        else {
            //nok : clear passwords and show error on messagebar
            props.showMessage("Please set item category!", "alert alert-danger");
            setTimeout(() => props.showMessage("Create Menu Item - Enter valid data to each field"), 7000);
        }
    }

    //First run : Set messagebar 
    useEffect(() => {
        props.showMessage("Create Menu Item - Enter valid data to each field")
    }, []);

    return (
    <div className="containerTwo">
        <form className="row g-3" onSubmit = {handleSubmit}>
            <div className="col-md-6">
                <label htmlFor="inputItemName" className="form-label">Name</label>
                <input type="text" maxLength="45" className="form-control" id="inputItemName" required/>
            </div>
            <div className="form-group">
                <label htmlFor="itemImage">Import Thumbnail</label>
                <input type="file" className="form-control-file" id="itemImage" accept="image/png, image/gif, image/jpeg" required/>
            </div>
            <div className="col-md-12">
                <label htmlFor="inputDescription" className="form-label">Description</label>
                <input type="text" maxLength="255" className="form-control" id="inputDescription" required/>
            </div>

            <div className="col-md-3">
                <label htmlFor="inputPassword4" className="form-label">Price</label>
                <input type="number" min="0.01" max="10000.00" step="0.01" className="form-control" id="inputPrice" required/>
            </div>
            <div className="col-md-6">
                <label htmlFor="ItemType" className="form-label">Category</label>
                <Combobox data={props.types} dataKey="id" textField="name" name="ItemType" placeholder="Choose from the list or enter a new one:" />
            </div>

            <div className="col-12">
                <br/>
                <button type="submit" className="btn btn-primary">Add</button>
            </div>
        </form>
      </div>
  )
}