const { should } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const chaiJsonSchemaAjv = require('chai-json-schema-ajv');
chai.use(chaiJsonSchemaAjv);

const restaurantInfoArraySchema = require('../schemas/restaurantsInfoArray.schema.json');

describe('webfoodr5 restaurant tests', function(){
    describe('get all active restaurants', function(){
        it('should return all active restaurants', function(done){
            //send http request
            chai.request('https://webfoodr5.herokuapp.com')
                .get('/restaurants')
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
    describe('add new restaurant', function(){
        it('should accept restaurant data when data is correct', function(done){
            chai.request('https://webfoodr5.herokuapp.com')
                .post('/restaurants')
                .send({
                    name: "testing",
                    description: "kokeileva keittiö",
                    thumbnail_url: "",
                    picture_url: "",
                    price_level: 3,
                    address1: "",
                    address2: "",
                    city: "",
                    phone: "",
                    idperson: 1,
                    idrestauranttype: 2,
                    active: true
                })
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })
    describe('edit restaurant', function(){
        it('should accept changes when restaurant data is correct', function(done){
            chai.request('https://webfoodr5.herokuapp.com')
                .put('/restaurants')
                .send({
                    id: 9,
                    name: "eipä mittään",
                    description: "kokeilevaa fuusiota",
                    thumbnail_url: "",
                    picture_url: "",
                    price_level: 3,
                    address1: "",
                    address2: "",
                    city: "",
                    phone: "",
                    idperson: 6,
                    idrestauranttype: 2,
                    active: true
                })
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })
    describe('deactivate restaurant', function(){
        it('should deactivate restaurant if id is correct', function(done){
            chai.request('http://localhost:3000/')
                .put('/restaurantdelete')
                .send({
                    id: 9
                })
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })
})