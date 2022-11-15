const express = require('express')
const router = express.Router()
const carController = require('../controllers/car-service-controller')

/**
 *  Get the cars list
 * @param : removeDup (Optional). Values = true/false
 * @param : cheapestOnly (optional). Values = true/false
 * @param : filterByCode (optional). Values = string
 * @param : sortBy (optional). Value = string (corporate/price)
 * @param : sortDir (optional). Value = string (asc/desc);
 *
 */
router.get('/', async function (req, res, next) {
  const params = {
    removeDuplicates: req.query.removeDup,
    cheapestOnly: req.query.cheapestOnly,
    filterByCode: req.query.filterByCode,
    sortBy: req.query.sortBy,
    sortDirection: req.query.sortDir
  }
  res.send(await carController.loadCarsFromService(params))
})

module.exports = router
