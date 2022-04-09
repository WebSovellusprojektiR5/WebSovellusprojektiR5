import React from 'react'

export default function NewMenuItem(props) {
    return (
    <div class="containerTwo">
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Name</label>
                <input type="email" class="form-control" id="inputItemName"/>
            </div>
            <div class="form-group">
                <label for="exampleFormControlFile1">Import Image</label>
                <input type="file" class="form-control-file" id="ItemImage"/>
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Price</label>
                <input type="password" class="form-control" id="inputPrice"/>
            </div>
           
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Categories</label>
                <input type="password" class="form-control" id="inputCategories"/>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Add</button>
            </div>
        </form>
      </div>
  )
}