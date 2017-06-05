const formattedDistricts = require('../formatted-districts.json')
const inside = require('point-in-polygon')
const client = require('./redis');

module.exports = function serviceAreaLookup(lat, lng, callback = function(){}) {

  const key = `{lat:${Math.trunc(lat)},lng:${Math.trunc(lng)}}`

  client.get(key, (err, reply) => {
    if (err) {
      return callback(err)
    }

    if (reply) {
      console.log('using cached servicesArea data', key, reply)
      return callback(null, reply);
    }

    let servicesArea

    formattedDistricts.features.forEach(function(district, index) {

      const [polygon] = district.geometry.coordinates

      if (inside([lng, lat], polygon)) {
        servicesArea = district.properties.Name
      }
    })

    if (!servicesArea) {
      return callback(null, null)
    }

    client.set(key, servicesArea, (err, reply) => {
      if (err) {
        return callback(err);
      }

      console.log('cached servicesArea data set', key, servicesArea)

      callback(null, servicesArea);
    });

  })
}
