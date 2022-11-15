const carService = require('../services/car-service');
const carUtils = require('../utils/carUtils');
const carConstants = require('../constants/car-constants');

let cache = null;
let lastUpdateTime = 0;

function getEpocSeconds() {
    return Math.floor(Date.now() / 1000);
}


function loadCarsFromCache(params) {

    if (cache == null || lastUpdateTime < (getEpocSeconds() - carConstants.CACHE_UPDATE_SECONDS)) {
        return new Promise(async (resolve, reject) => {
            let pr = carService.loadCars();
            let output = await pr;
            cache = JSON.parse(output);
            lastUpdateTime = getEpocSeconds();
            resolve(JSON.parse(output)); // Return a copy of response object
        });
    } else {
        return new Promise(async(resolve, resject) => {
            resolve(JSON.parse(JSON.stringify(cache))); // Return a clone of the cache object.
        })
    }
}


module.exports = {loadCarsFromCache}