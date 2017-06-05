const client = require('./lib/redis')
const serviceAreaLookup = require('./lib/serviceAreaLookup')
// not properly tested

// get all serviceArea keys.
client.keys('{lat:*', (err, result) => {
  if (err) return console.error(err)

  const keys = result

  // fluch database
  client.flushdb(function(err, succeeded) {
    if (err) return console.error(err)

    let count = 0

    keys.forEach((key, index) => {

      // pull lat and lng from the key name
      const {lat, lng } = JSON.parse(keys[i])

      // rebuild cache
      serviceAreaLookup(lat, lng, (err, serviceArea) => {
        count++

        if (count === keys.length -1) {
          console.log('fin.');
        }

      })
    })
  })
})
