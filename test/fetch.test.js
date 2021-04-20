let expect = require('chai').expect;
let request = require('request');

describe('fetch status', function() {
    it('Response status', function(done){
        request('http://localhost:3001/api', function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});