const googleGeoCoder = require('./locationServices/googleGeoCoder')
const serviceAreaLookup = require('./serviceAreaLookup')

module.exports = function geolocate(searchString, callback) {

  googleGeoCoder(searchString, (err, data) => {
    if (err || data) {
      return callback(err, data);
    }

    // @TODO else if no result then try the next service
    // nextLocationService(searchString, function (err, data) {
    //
    callback(null, null)
    // })
  })
}
