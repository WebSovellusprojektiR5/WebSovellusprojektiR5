import React from 'react'

export default function RestaurantInfo(props) {
    return (
    <div className="containerTwo">
        <form className="row g-3">
        <fieldset disabled>
            <div className="col-md-6">
                <label htmlFor="inputRestaurantName" className="form-label">Restaurant Name</label>
                <input type="restaurantName" className="form-control" id="inputRestaurantName"/>
            </div>

            <div className="form-group">
                <label htmlFor="itemImage">Import Thumbnail</label>
                <input type="file" className="form-control-file" id="itemImage"/>
            </div>
            
            <div className="col-md-6">
                <label htmlFor="inputSlogan" className="form-label">Slogan</label>
                <input type="slogan" className="form-control" id="inputSlogan"/>
            </div>

            <form className="form-inline">
                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Price Range</label>
                    <select className="custom-select my-1 mr-sm-2" id="priceRange">
                        <option selected>Choose...</option>
                        <option value="1">€</option>
                        <option value="2">€€</option>
                        <option value="3">€€€</option>
                        <option value="4">€€€€</option>
                    </select>

                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Restaurant Category</label>
                    <select className="custom-select my-1 mr-sm-2" id="restaurantCategory">
                        <option selected>Choose...</option>
                        <option value="1">Buffet</option>
                        <option value="2">Fast Food</option>
                        <option value="3">Fast Casual</option>
                        <option value="4">Casual Dining</option>
                        <option value="5">Fine Dining</option>
                    </select>
            </form>

        </fieldset>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Edit</button>
                </div>
        </form>
        
    </div>
  )
}