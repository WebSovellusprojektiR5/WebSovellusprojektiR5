import React from 'react'

export default function RestaurantInfo(props) {

    //Form submit button pressed : Validate password and fire app.js onSubmitBtnClicked
    const handleSubmit = (e) => {
        e.preventDefault();
        if(e.target["selectPriceRange"].value !== "" && e.target["selectCategory"].value !== "") {
            //ok : call app.js function
            props.onSubmitBtnClicked(e.target);
        }   
        else {
            //nok : clear passwords and show error on messagebar  (required attribute is not always working in select field)
            props.showMessage("Please choose price range and restaurant category!", "alert alert-danger");
            setTimeout(() => props.showMessage(""), 7000);
        }
    }
    
    return (      
    <div className="containerTwo">
        <form className="row g-3" encType="multipart/form-data" onSubmit = {handleSubmit}>
            <div className="col-md-6">
                <label htmlFor="inputRestaurantName" className="form-label">Restaurant Name</label>
                <input type="text" maxLength="80" className="form-control" id="inputRestaurantName" defaultValue={props.data.name} required/>
            </div>

            <div className="form-group">
                <label htmlFor="itemImage">Import Thumbnail</label>
                <input type="file" className="form-control-file" id="itemImage" accept="image/png, image/gif, image/jpeg" />
            </div>
            
            <div className="col-md-12">
                <label htmlFor="inputSlogan" className="form-label">Slogan</label>
                <input type="text" maxLength="255" className="form-control" id="inputSlogan" defaultValue={props.data.description} required/>
            </div>
            <div className="col-12">
                <label htmlFor="inputAddress1" className="form-label">Address 1</label>
                <input type="text" maxLength="80" className="form-control" id="inputAddress1" defaultValue={props.data.address1} required/>
            </div>
            <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                <input type="text" maxLength="80" className="form-control" id="inputAddress2" defaultValue={props.data.address2} placeholder="Streetname, Apartment, studio, or floor"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">City</label>
                <input type="text" maxLength="45" className="form-control" id="inputCity" defaultValue={props.data.city} required/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPhone" className="form-label">Phone Number</label>
                <input type="tel" maxLength="80" className="form-control" id="inputPhone" defaultValue={props.data.phone} required/>
            </div>

            <div className="form-inline">
                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Price Range</label>
                    <select className="custom-select my-1 mr-sm-2" id="selectPriceRange" defaultValue={props.data.price_level}>
                        <option>Choose...</option>
                        <option value="1">€</option>
                        <option value="2">€€</option>
                        <option value="3">€€€</option>
                        <option value="4">€€€€</option>
                    </select>

                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Restaurant Category</label>
                    <select className="custom-select my-1 mr-sm-2" id="selectCategory" defaultValue={props.data.idrestauranttype}>
                        <option>Choose...</option>
                        { props.types.map((t) => <option key={t.id} value={t.id} className="nav-item">{t.name}</option> )}
                    </select>
            </div>
            <br/>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Edit</button>
            </div>
        </form>
        
    </div>
  )
}