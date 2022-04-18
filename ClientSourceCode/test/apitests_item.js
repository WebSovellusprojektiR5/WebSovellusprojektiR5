const { should } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const chaiJsonSchemaAjv = require('chai-json-schema-ajv');
chai.use(chaiJsonSchemaAjv);

const restaurantInfoArraySchema = require('../schemas/restaurantsInfoArray.schema.json');

describe('webfoodr5 item tests', function(){
    describe('add new item', function(){
        it('should accept item data when data is correct', function(done){
            chai.request('https://webfoodr5.herokuapp.com')
                .post('/items')
                .send({
                    name: "makkaraperunat",
                    description: "perunaa ja makkaraa",
                    thumbnail_url: "thumbnail_url",
                    price: 8,
                    idrestaurant: 9,
                    iditemcategory: 2,
                    active: true
                })
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })
    describe('edit item', function(){
        it('should accept changes when item data is correct', function(done){
            chai.request('https://webfoodr5.herokuapp.com')
                .put('/items')
                .send({
                    id: 6,
                    name: "makkaraperunat",
                    description: "perunaa ja makkaraa",
                    thumbnail_url: "thumbnail_url",
                    price: 8,
                    idrestaurant: 9,
                    iditemcategory: 2,
                    active: true
                })
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })
    describe('deactivate item', function(){
        it('should deactivate item when item data is correct', function(done){
            chai.request('https://webfoodr5.herokuapp.com')
                .put('/itemdelete')
                .send({
                    id: 6
                })
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })
})