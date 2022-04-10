import React from 'react'

export default function NewMenuItem(props) {
    return (
    <div className="containerTwo">
        <form className="row g-3">
            <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Name</label>
                <input type="email" className="form-control" id="inputItemName"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Import Image</label>
                <input type="file" className="form-control-file" id="ItemImage"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Price</label>
                <input type="password" className="form-control" id="inputPrice"/>
            </div>
           
            <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Categories</label>
                <input type="password" className="form-control" id="inputCategories"/>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Add</button>
            </div>
        </form>
      </div>
  )
}