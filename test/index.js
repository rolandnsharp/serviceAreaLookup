var app = require('../index')
var request = require('supertest')(app)
const should = require('should')

describe('TESTS', function() {

  it('homepage should return 200 OK', function(done) {
    request.get('/')
      .expect(200, function(err, res) {
        should.not.exist(err);

        done();
      });
  });

  it('ec1r5df should return 200 OK', function(done) {
    request.get('/geolocate?search=ec1r5df')
      .expect(200, function(err, res) {
        should.not.exist(err);
        res.body.status.should.equal('OK')
        res.body.search.should.equal('ec1r5df')
        res.body.location.postcode.should.equal('EC1R 5DF');
        res.body.location.lat.should.equal(51.5221993);
        res.body.location.lng.should.equal(-0.1097618);
        res.body.location.serviceArea.should.equal('LONCENTRAL');

        done();
      });
  });

  it('White Bear Yard should return 200 OK', function(done) {
    request.get('/geolocate?search=White Bear Yard')
      .expect(200, function(err, res) {
        should.not.exist(err);
        res.body.status.should.equal('OK')
        res.body.search.should.equal('White Bear Yard')
        res.body.location.addressNumber.should.equal('144A')
        res.body.location.addressStreet.should.equal('Clerkenwell Road')
        res.body.location.postcode.should.equal('EC1R 5DF');
        res.body.location.lat.should.equal(51.5222735);
        res.body.location.lng.should.equal(-0.1097034);
        res.body.location.serviceArea.should.equal('LONCENTRAL');

        done();
      });
  });

  it('should return 404 NOT_FOUND', function(done) {
    request.get('/geolocate?search=asdfg')
      .expect(404, function(err, res) {
        should.not.exist(err);
        res.body.status.should.equal('NOT_FOUND')
        res.body.search.should.equal('asdfg')

        done();
      });
  });

});
