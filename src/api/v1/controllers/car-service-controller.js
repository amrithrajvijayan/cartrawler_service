const { param } = require('../routes/car-router');
const carService = require('../services/car-service');
const carUtils = require('../utils/carUtils');

function loadCarsFromService(params) {
    return new Promise(async (resolve, reject) => {
        let pr = carService.loadCars();
        let output = await pr;
        let carInfo = carUtils.processResponse(JSON.parse(output));
        output = processOutput(carInfo, params);
        resolve(output);
    });
}

function processOutput(response, params) {

    if (params.removeDuplicates === 'true') {
        carUtils.removeDuplicates(response);
    }

    if (params.cheapestOnly === 'true') {
        carUtils.filterCheapestOnly(response);
    }

    if (params.filterByCode !== undefined) {
        carUtils.filterByCarCode(response, params.filterByCode);
    }

    if (params.sortBy !== undefined) {
        carUtils.sort(response, params.sortBy, params.sortDirection);
    }

    return response;
}


module.exports = {loadCarsFromService};