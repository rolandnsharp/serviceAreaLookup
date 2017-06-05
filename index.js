const express = require('express')
const app = express()
const geolocate = require('./lib/geolocate')
const serviceAreaLookup = require('./lib/serviceAreaLookup')

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => res.render('index'))

app.get('/geolocate', (req, res, next) => {

  const searchString = req.query.search

  geolocate(searchString, (err, data) => {
    if (err) return next(err)

    if (!data) {
      return res.status(404).send({
        status: 'NOT_FOUND',
        search: searchString
      })
    }

    const {lat, lng} = data.location

    serviceAreaLookup(lat, lng, function(err, serviceArea) {
      if (err) return next(err)

      if (!serviceArea) {
        return res.status(404).send({
          status: 'NOT_FOUND',
          search: searchString
        })
      }

      data.location.serviceArea = serviceArea

      res.status(200).send(data)
    })
  })
})

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!', err)
})

const port = Number(process.env.PORT || 5000)

app.listen(port, () => {
  console.log('Listening on ' + port)
})

module.exports = app
