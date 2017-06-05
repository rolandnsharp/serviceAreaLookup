const geocoder = require('geocoder')

module.exports = function googleGeoCoder(searchString, callback) {

  geocoder.geocode(searchString, (err, data) => {
    if (err) {
      return callback(err)
    }

    if (data.results.length === 0) {
      return callback(null, null)
    }

    const [firstResult] = data.results // @TODO if other results ask user to confirm correct result
    const {lat, lng} = firstResult.geometry.location

    let formattedResult = {   
      status: 'OK',
      search: searchString,
      location: {
        addressNumber: null,
        addressStreet: null,
          city: null,
          postcode: null,
          lat: lat,
          lng: lng
      }
    }

    firstResult.address_components.forEach((component) => {

      if (component.types.includes('street_number')) {
        formattedResult.location.addressNumber = component.long_name;
      }

      if (component.types.includes('route')) {
        formattedResult.location.addressStreet = component.long_name;
      }

      if (component.types.includes('locality')) {
        formattedResult.location.city = component.long_name;
      }

      if (component.types.includes('postal_code')) {
        formattedResult.location.postcode = component.long_name;
      }

    })

    callback(null, formattedResult)
  })
}
