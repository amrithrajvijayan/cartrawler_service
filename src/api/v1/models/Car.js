
module.exports = class Car {
  constructor (supplier, description, rentalCost, passengerCapacity, baggageCapacity, carCode) {
    this.supplier = supplier
    this.description = description
    this.rentalCost = rentalCost
    this.passengerCapacity = passengerCapacity
    this.baggageCapacity = baggageCapacity
    this.carCode = carCode
  }
}
