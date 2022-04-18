const { should } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const chaiJsonSchemaAjv = require('chai-json-schema-ajv');
chai.use(chaiJsonSchemaAjv);

const orderInfoArraySchema = require('../schemas/orderInfoArray.schema.json');

describe('webfoodr5 order tests', function(){
    describe('get orders by restaurant', function(){
        it('should return all orders from specified restaurant', function(done){
            //send http request
            chai.request('https://webfoodr5.herokuapp.com')
                .get('/activeorderbyrestaurant')
                .end(function(err, res){
                    expect(err).to.be.null;

                    //check response status
                    expect(res).to.have.status(200);
                    
                    //check response data structure
                    expect(res.body).to.be.jsonSchema(restaurantInfoArraySchema);
                    done();
                })
        })
    })
    describe('get orders by user', function(){
        it('should return all orders from specified user', function(done){
            //send http request
            chai.request('https://webfoodr5.herokuapp.com')
                .get('/ordersbyuser')
                .end(function(err, res){
                    expect(err).to.be.null;

                    //check response status
                    expect(res).to.have.status(200);
                    
                    //check response data structure
                    expect(res.body).to.be.jsonSchema(restaurantInfoArraySchema);
                    done();
                })
        })
    })
    describe('add new order', function(){
        it('should accept order data when data is correct', function(done){
            chai.request('https://webfoodr5.herokuapp.com')
                .post('/ordersbyuser')
                .send({
                    idperson: 6,
                    idrestaurant: 9,
                    address1: "address1",
                    address2: "address2",
                    ordered_time: "8:00",
                    completed_time: "11:00",
                    comment: "comment"
                })
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })
})