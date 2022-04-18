import React from 'react'

export default function RestaurantOrders(props) {
return(
<div className="containerTwo">
    <div class="d-flex justify-content-center row">
        <div class="col-md-10">
            <div class="rounded">
                <div class="table-responsive table-borderless">
                    <table class="table">

                        <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th>Customer Name</th>
                                <th>status</th>
                                <th>Total</th>
                                <th>Created</th>
                                <th>Additional Info</th>
                            </tr>
                        </thead>

                        <tbody className="OrderRow" class="table-body">
                            <tr class="cell-1">
                                <td class="text-center">1</td>
                                <td className="customerName">Masa mainio</td>
                                <td className="state"><span class="badge badge-success">Fullfilled</span></td>
                                <td className="price">15,00€</td>
                                <td className="orderDate">18/04/2022</td>
                                <td className="AdditionalInfo">tomato allergy</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
 )
}