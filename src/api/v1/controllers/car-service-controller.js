const carUtils = require('../utils/carUtils')
const cache = require('../cache/car-service-cache')

function loadCarsFromService (params) {
  return new Promise(async (resolve, reject) => {
    cache.loadCarsFromCache(params).then((output) => {
      const carInfo = carUtils.extractCarsFromResponse(output)
      output = processOutput(carInfo, params)
      resolve(output)
    })
  })
}

function processOutput (response, params) {
  if (params.removeDuplicates === 'true') {
    carUtils.removeDuplicates(response)
  }

  if (params.cheapestOnly === 'true') {
    carUtils.filterCheapestOnly(response)
  }

  if (params.filterByCode !== undefined) {
    carUtils.filterByCarCode(response, params.filterByCode)
  }

  if (params.sortBy !== undefined) {
    carUtils.sort(response, params.sortBy, params.sortDirection)
  }

  return response
}

module.exports = { loadCarsFromService }
