import React from 'react'

export default function NewRestaurant(props) {
    return (
    <div class="containerTwo">
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputRestaurantName" class="form-label">Restaurant Name</label>
                <input type="restaurantName" class="form-control" id="inputRestaurantName"/>
            </div>

            <div class="form-group">
                <label for="itemImage">Import Thumbnail</label>
                <input type="file" class="form-control-file" id="itemImage"/>
            </div>
            
            <div class="col-md-6">
                <label for="inputSlogan" class="form-label">Slogan</label>
                <input type="slogan" class="form-control" id="inputSlogan"/>
            </div>

            <form class="form-inline">
                <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Price Range</label>
                    <select class="custom-select my-1 mr-sm-2" id="priceRange">
                        <option selected>Choose...</option>
                        <option value="1">€</option>
                        <option value="2">€€</option>
                        <option value="3">€€€</option>
                        <option value="4">€€€€</option>
                    </select>

                <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Restaurant Category</label>
                    <select class="custom-select my-1 mr-sm-2" id="restaurantCategory">
                        <option selected>Choose...</option>
                        <option value="1">Buffet</option>
                        <option value="2">Fast Food</option>
                        <option value="3">Fast Casual</option>
                        <option value="4">Casual Dining</option>
                        <option value="5">Fine Dining</option>
                    </select>
            </form>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
        </form>
        
    </div>
  )
}