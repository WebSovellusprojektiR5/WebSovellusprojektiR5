import React from 'react'
import {useState} from 'react'

export default function ShoppingCart(props) {

    var ctotal = 0;
    return (

    <div className="container-fluid mt-100">
        <div className="row">
            <div className="col-md-12">
                <div className="card">

                    <div className="card-header">
                        <h5>Cart</h5>
                    </div>

                    <div className="card-body cart">
                        <div className="col-sm-12 empty-cart-cls text-center"> 
                            <h2>ShoppingCart</h2>
                                <div className="d-flex justify-content-center row">
                                    <div className="col-md-10">
                                        <div className="rounded">
                                            <div className="table-responsive table-borderless">
                                                <table className="table">

                                                <thead>
                                                    <tr>
                                                        <th className="text-center">#</th>
                                                        <th>Item</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                        <th>Delete</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>

                                                <tbody className="table-body">
                                                { props.rid >= 0 && props.data.length > 0 && props.items.length > 0 ?
                                                props.data.map((d) =>
                                                    <tr key={d.id} className="cell-1">                                                  
                                                        <td className="text-center">{d.id}</td> 
                                                        <td>{props.items.filter(n => n.id === d.iditem)[0].name}</td> 
                                                        <td><input type="number" min="1.00" max="10000.00" step="1.00" placeholder="1.00" className="form-control" id="inputQuantity" defaultValue={d.quantity} readOnly/></td>
                                                        <td className="total">{d.quantity * (props.items.filter(n => n.id === d.iditem)[0].price)}</td>
                                                        <script>{ctotal = ctotal + d.quantity * (props.items.filter(n => n.id === d.iditem)[0].price)}</script>
                                                        <td><button type="submit" className="btn btn-danger btn-sm" onClick={()=>{ alert('Shopping cart editing is not yet enabled...'); }}>Delete</button></td>
                                                        <td><i className="fa fa-ellipsis-h text-black-50"></i></td>
                                                    </tr>) : <tr><td>Empty</td></tr>}
                                                </tbody>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            { props.rid >= 0 && props.data.length > 0 && props.items.length > 0 ?
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary" onClick={() => props.onCheckOutClicked(props.data[0].idorder, ctotal)}>Check Out</button>
                            </div> : <></> }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}