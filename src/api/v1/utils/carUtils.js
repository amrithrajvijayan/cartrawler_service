
const Car = require('../models/Car')

function extractCarsFromResponse (responseObject) {
  const carsList = []
  for (const responseObjectIndex in responseObject) {
    const responseObjectEntry = responseObject[responseObjectIndex]

    for (const index in responseObjectEntry.VehAvailRSCore.VehVendorAvails) {
      const venderVehAvail = responseObjectEntry.VehAvailRSCore.VehVendorAvails[index]
      const vendorInfo = venderVehAvail.Vendor
      const vehAvails = venderVehAvail.VehAvails

      for (const vehIndex in vehAvails) {
        const vehicle = vehAvails[vehIndex]
        carsList.push(new Car(
          vendorInfo['@Name'],
          vehicle.Vehicle.VehMakeModel['@Name'],
          vehicle.TotalCharge['@EstimatedTotalAmount'],
          vehicle.Vehicle['@PassengerQuantity'],
          vehicle.Vehicle['@BaggageQuantity'],
          vehicle.Vehicle['@Code']
        ))
      }
    }
  }
  return { result: carsList }
}

// Removes duplicate car names.
function removeDuplicates (responseObject) {
  const validationMap = new Map()
  const carsArray = []
  for (const objKey in responseObject.result) {
    const carObject = responseObject.result[objKey]
    const mapKey = carObject.description
    if (!validationMap.has(mapKey)) {
      carsArray.push(carObject)
      validationMap.set(mapKey, true)
    }
  }
  responseObject.result = carsArray
}

function filterByCarCode (responseObject, filter) {
  const carsArray = []

  if (filter !== undefined && filter.length > 0) {
    for (const objKey in responseObject.result) {
      const carObject = responseObject.result[objKey]

      if (carObject.carCode === filter) {
        carsArray.push(carObject)
      }
    }
    responseObject.result = carsArray
  }
}

function sort (responseObject, sortBy, sortDirection) {
  if (sortBy === 'corporate') {
    sortByCorporate(responseObject, sortDirection)
  } else if (sortBy === 'price') {
    sortByPrice(responseObject, sortDirection)
  }
}

function sortByCorporate (responseObject, sortDirection) {
  responseObject.result.sort((a, b) => {
    if (sortDirection === 'asc') {
      if (a.supplier === b.supplier) {
        return (Number(a.rentalCost) - Number(b.rentalCost))
      } else { return a.supplier.localeCompare(b.supplier) }
    } else {
      if (a.supplier === b.supplier) {
        return (Number(a.rentalCost) - Number(b.rentalCost))
      } else { return b.supplier.localeCompare(a.supplier) }
    }
  })
}

function sortByPrice (responseObject, sortDirection) {
  responseObject.result.sort((a, b) => {
    if (sortDirection === 'asc') { return (Number(a.rentalCost) - Number(b.rentalCost)) } else return (Number(b.rentalCost) - Number(a.rentalCost))
  })
}

function filterCheapestOnly (responseObject) {
  const validationMap = new Map()
  const carsArray = []
  for (const objKey in responseObject.result) {
    const carObject = responseObject.result[objKey]
    const mapKey = carObject.description

    if (validationMap.has(mapKey)) {
      const existingObject = validationMap.get(mapKey)

      if (existingObject.rentalCost > carObject.rentalCost) {
        carsArray[existingObject.position] = carObject
        validationMap.set(mapKey, { cost: carObject.rentalCost, position: existingObject.position })
      }
    } else {
      validationMap.set(mapKey, { cost: carObject.rentalCost, position: carsArray.length })
      carsArray.push(carObject)
    }
  }
  responseObject.result = carsArray
}

module.exports = { extractCarsFromResponse, removeDuplicates, filterCheapestOnly, filterByCarCode, sort }
