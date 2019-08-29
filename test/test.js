var should = require('should');

var supertest = require('supertest');

var server = supertest.agent('http://localhost:3000'); //use for port setting of server
//unit testing
describe('File upload test cases', function(){
    it('Should upload file', function(done){
        server
        .post('/api/photo')
        .field('filename', 'test file')
        .attach('file', 'upload/userPhoto-1566991440849.jpg')
        .expect(200)
        .end(function(err, res){
             res.status.should.equal(200)
            done();
        })
    })
})