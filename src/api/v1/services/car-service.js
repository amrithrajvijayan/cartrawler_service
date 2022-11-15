const CONSTANTS = require('../constants/car-constants')

const http = require('http')
const options = {
  host: CONSTANTS.REQUEST_HOST,
  path: CONSTANTS.CAR_SERVICE_URI
}

function loadCars () {
  return new Promise((resolve, reject) => {
    return http.request(options, (response) => {
      let str = ''

      response.on('data', function (chunk) {
        str += chunk
      })

      response.on('end', function () {
        resolve(str)
      })

      response.on('error', function () {
        reject(new Error('Error making connection to car service'))
      })
    }
    ).end()
  })
}

module.exports = { loadCars }
