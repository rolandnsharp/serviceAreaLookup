const redis = require('redis')
const port = 6379
const host = '127.0.0.1'

const client = redis.createClient(port, host, {
  // options
})

client.on('connect', () => {
    console.log('connected to redis.')
})

client.on('error', (err) => {
    console.error('Errorzzz ', err)
})

module.exports = client
