const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const chaiJsonSchemaAjv = require('chai-json-schema-ajv');
chai.use(chaiJsonSchemaAjv);

const restaurantInfoArraySchema = require('../schemas/restaurantsInfoArray.schema.json');

describe('webfoodr5 tests', function(){
    describe('get restaurants', function(){
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
})