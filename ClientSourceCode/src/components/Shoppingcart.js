import React from 'react'

export default function ShoppingCart(props) {
    return (
      <div class="container-fluid mt-100">
          <div class="row">
              <div class="col-md-12">
                  <div class="card">
                      <div class="card-header">
                          <h5>Shopping Cart</h5>
                      </div>
                      <div class="card-body cart">
                          <div class="col-sm-12 empty-cart-cls text-center"> 
                              <h3><strong>Your Cart is Empty</strong></h3>
                              <h4>Add something to make me happy :)</h4> <a href="#" class="btn btn-primary cart-btn-transform m-3" data-abc="true">continue shopping</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
)
}