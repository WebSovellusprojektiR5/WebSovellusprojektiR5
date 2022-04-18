import React from 'react'

export default function ShoppingCart(props) {
    return (

<div class="container-fluid mt-100">
    <div class="row">
        <div class="col-md-12">
            <div class="card">

                <div class="card-header">
                    <h5>Cart</h5>
                </div>

                <div class="card-body cart">
                    <div class="col-sm-12 empty-cart-cls text-center"> 
                        <h2>ShoppingCart</h2>

                        <div className="containerTwo">
                            <div class="d-flex justify-content-center row">
                                <div class="col-md-10">
                                    <div class="rounded">
                                        <div class="table-responsive table-borderless">
                                            <table class="table">

                                            <thead>
                                                <tr>
                                                    <th class="text-center">#</th>
                                                    <th>Item</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                    <th>Delete</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody class="table-body">
                                                <tr class="cell-1">
                                                    <td class="text-center">1</td>
                                                    <td>Medium Wings</td>
                                                    <input type="number" min="1.00" max="10000.00" step="1.00" placeholder="1.00" className="form-control" id="inputQuantity" required/>
                                                    <td>16.00€</td>
                                                    <button type="submit" className="btn btn-danger btn-sm">Delete</button>
                                                    <td><i class="fa fa-ellipsis-h text-black-50"></i></td>
                                                </tr>
                                            </tbody>

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
   
                        <div className="col-md-12">
                            <label htmlFor="inputAdditionalInfo" className="form-label">Additional info:</label>
                            <input type="text" maxLength="255" className="form-control" id="inputAdditionalInfo" placeholder="i.e Allergies etc.."/><br/>
                            <button type="submit" className="btn btn-primary">Check Out</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
)
}