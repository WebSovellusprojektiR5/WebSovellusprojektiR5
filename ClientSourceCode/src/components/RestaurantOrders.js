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
                                <th>Order #</th>
                                <th>Customer Name</th>
                                <th>status</th>
                                <th>Total</th>
                                <th>Created</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody class="table-body">
                            <tr class="cell-1">
                                <td class="text-center">1</td>
                                <td>#SO-13487</td>
                                <td>Masa mainio</td>
                                <td><span class="badge badge-success">Fullfilled</span></td>
                                <td>15,00€</td>
                                <td>18/04/2022</td>
                                <td><i class="fa fa-ellipsis-h text-black-50"></i></td>
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