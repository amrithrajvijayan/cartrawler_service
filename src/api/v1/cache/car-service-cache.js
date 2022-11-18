const carService = require('../services/car-service')
const carConstants = require('../constants/car-constants')

let cache = null
let lastUpdateTime = 0

function getEpocSeconds () {
  return Math.floor(Date.now() / 1000)
}

function loadCarsFromCache (params) {
  if (cache == null || lastUpdateTime < (getEpocSeconds() - carConstants.CACHE_UPDATE_SECONDS)) {
    return new Promise((resolve, reject) => {
      carService.loadCars().then((output) => {
        if (output == null) {
          reject(new Error('Error loading car information'))
        } else {
          cache = JSON.parse(output)
          lastUpdateTime = getEpocSeconds()
          resolve(JSON.parse(output)) // Return a copy of response object
        }
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(JSON.stringify(cache))) // Return a clone of the cache object.
    })
  }
}

module.exports = { loadCarsFromCache }
