const { should } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const chaiJsonSchemaAjv = require('chai-json-schema-ajv');
chai.use(chaiJsonSchemaAjv);

const restaurantInfoArraySchema = require('../schemas/restaurantsInfoArray.schema.json');

describe('webfoodr5 user tests', function(){
    describe('add new user', function(){
        it('should accept user data when data is correct', function(done){
            chai.request('https://webfoodr5.herokuapp.com')
                .post('/users')
                .send({
                    active: true,
                    address1: "jeejee",
                    address2: "",
                    city: "oulu",
                    firstname: "jaska",
                    idrole: 1,
                    lastname: "jokunen",
                    phone: "111222",
                    password: "qwerty123",
                    username: "jaskavaan2"
                })
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })
    describe('edit user', function(){
        it('should accept changes when user data is correct', function(done){
            chai.request('https://webfoodr5.herokuapp.com')
                .put('/users')
                .send({
                    id: 6,
                    active: true,
                    address1: "jeejee",
                    address2: "",
                    city: "tampere",
                    firstname: "jaska",
                    idrole: 1,
                    lastname: "jokunen",
                    phone: "111222",
                    password: "qwerty123",
                    username: "jokunen_15"
                })
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })
    describe('deactivate user', function(){
        it('should deactivate user when user data is correct', function(done){
            chai.request('https://webfoodr5.herokuapp.com')
                .put('/userdelete')
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