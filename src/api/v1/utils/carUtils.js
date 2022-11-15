
function processResponse(responseObject) {

    let carsList = [];
    for (let responseObjectIndex in responseObject) {
        let responseObjectEntry = responseObject[responseObjectIndex];

        for (let index in responseObjectEntry.VehAvailRSCore.VehVendorAvails) {

            let venderVehAvail = responseObjectEntry.VehAvailRSCore.VehVendorAvails[index];
            let vendorInfo = venderVehAvail.Vendor;
            let vehAvails = venderVehAvail.VehAvails;

            for (let vehIndex in vehAvails) {
                let vehicle = vehAvails[vehIndex];
                carsList.push({
                    supplier : vendorInfo['@Name'],
                    description: vehicle['Vehicle']['VehMakeModel']['@Name'],
                    rentalCost: vehicle['TotalCharge']['@EstimatedTotalAmount'],
                    passengerCapacity:vehicle['Vehicle']['@PassengerQuantity'],
                    baggageCapacity:vehicle['Vehicle']['@BaggageQuantity'],
                    carCode: vehicle['Vehicle']['@Code']
                });
            }
        } 
    }
    return { 'result': carsList };
}


function removeDuplicates(responseObject) {
    let validationMap = new Map();
    const carsArray = [];
    for (let objKey in responseObject.result) {
        let carObject = responseObject.result[objKey];
        let mapKey = carObject.description;
        if (!validationMap.has(mapKey)) {
           carsArray.push(carObject);
           validationMap.set(mapKey, true);
        }
    }
    responseObject.result = carsArray;
}

function filterByCarCode(responseObject, filter) {
    const carsArray = [];

    if (filter !== undefined && filter.length > 0) {
        for (let objKey in responseObject.result) {
            let carObject = responseObject.result[objKey];

            if (carObject.carCode === filter) {
                carsArray.push(carObject);
            } 
        }
        responseObject.result = carsArray;
    }
}

function sort(responseObject, sortBy, sortDirection) {
    if (sortBy === 'corporate') {
        sortByCorporate(responseObject, sortDirection);
    } else if (sortBy === 'price') {
        sortByPrice(responseObject, sortDirection);
    }
}

function sortByCorporate(responseObject, sortDirection) {
    responseObject.result.sort((a,b) => {
        if (sortDirection === 'asc') {
            if (a.supplier === b.supplier) {
                return (Number(a.rentalCost) - Number(b.rentalCost));
            }
            else 
                return a.supplier.localeCompare(b.supplier);
        }
        else { 
            if (a.supplier === b.supplier) {
                return (Number(a.rentalCost) - Number(b.rentalCost));
            }
            else 
                return b.supplier.localeCompare(a.supplier);
        }
    });
}

function sortByPrice(responseObject, sortDirection) {
    responseObject.result.sort((a,b) => {
        if (sortDirection === 'asc')
            return (Number(a.rentalCost) - Number(b.rentalCost));
        else return (Number(b.rentalCost) - Number(a.rentalCost));
    });
}


function filterCheapestOnly(responseObject) {
    let validationMap = new Map();
    const carsArray = [];
    for (let objKey in responseObject.result) {
        let carObject = responseObject.result[objKey];
        let mapKey = carObject.description;

        if (validationMap.has(mapKey)) {
            let existingObject = validationMap.get(mapKey);
            
            if (existingObject.rentalCost > carObject.rentalCost) {
                carsArray[existingObject.position] = carObject;
                validationMap.set(mapKey, {cost: carObject.rentalCost, position: existingObject.position});
            } 
        } else  {
            validationMap.set(mapKey, {cost: carObject.rentalCost, position: carsArray.length});
            carsArray.push(carObject);
        }
    }
    responseObject.result = carsArray;
}





module.exports = {processResponse, removeDuplicates, filterCheapestOnly, filterByCarCode, sort};