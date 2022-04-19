import React from 'react'

export default function RestaurantOrders(props) {
return(
<div className="containerTwo">
    <div className="d-flex justify-content-center row">
        <div className="col-md-10">
            <div className="rounded">
                <div className="table-responsive table-borderless">
                    <table className="table">

                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th>Customer Name</th>
                                <th>status</th>
                                <th>Total</th>
                                <th>Created</th>
                            </tr>
                        </thead>

                        <tbody className="OrderRow table-body">
                            {props.history.length > 0 ?
                            props.history.map((d) =>
                            <tr key={d.id} className="cell-1">
                                <td className="text-center">{d.id}</td>
                                <td className="customerName">{props.usrs.filter(n => n.id === d.idperson)[0].firstname} {props.usrs.filter(n => n.id === d.idperson)[0].lastname}</td>
                                <td className="state"><span className="badge badge-success">Fullfilled</span></td>
                                <td className="price">{d.price}</td>
                                <td className="orderDate">{d.completed_time}</td>
                            </tr>) : <tr><td>Empty</td></tr>}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
 )
}