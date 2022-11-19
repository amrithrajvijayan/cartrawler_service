const carUtils = require('../../src/api/v1/utils/carUtils');
const carTrawlerResponseTemplate = require('../sample-responses/carTrawlerApiResponse.json');


const testResponseTemplateObject = {
    "result":[
        {"supplier":"MN","description":"Toyota Rav4 or similar","rentalCost":"120.00","passengerCapacity":"5+","baggageCapacity":"3","carCode":"IFAR"},
        {"supplier":"CD","description":"Chrysler 300 or similar","rentalCost":"90.50","passengerCapacity":"4","baggageCapacity":"4","carCode":"PCAR"},
        {"supplier":"XY","description":"Chevrolet Impala or similar","rentalCost":"100","passengerCapacity":"4","baggageCapacity":"10","carCode":"FDAR"},
        {"supplier":"AB","description":"Chevrolet Impala or similar","rentalCost":"50.75","passengerCapacity":"5","baggageCapacity":"10","carCode":"FCAR"}
    ]
}


test('extractCarsFromResponse', () => {
    const carTrawlerResponseTemplateCopy = JSON.parse(JSON.stringify(carTrawlerResponseTemplate)); // clone the object
    const response = carUtils.extractCarsFromResponse(carTrawlerResponseTemplateCopy);
    expect(response.result.length).toBe(10);
});



test('Testing removeDuplicates', () => {
    const responseCopy = JSON.parse(JSON.stringify(testResponseTemplateObject)); // clone the object
    carUtils.removeDuplicates(responseCopy);
    expect(responseCopy.result.length).toBe(3);
});

test('Testing filterCheapestOnly', () => {
    const responseCopy = JSON.parse(JSON.stringify(testResponseTemplateObject)); 
    carUtils.filterCheapestOnly(responseCopy);
    expect(responseCopy.result.length).toBe(3);
    expect(responseCopy.result[2].rentalCost).toBe("50.75");
});

test('Testing filterByCarCode: Valid code', () => {
    const responseCopy = JSON.parse(JSON.stringify(testResponseTemplateObject)); 
    carUtils.filterByCarCode(responseCopy, 'FDAR');
    expect(responseCopy.result.length).toBe(1);
    expect(responseCopy.result[0].supplier).toBe("XY");
});

test('Testing filterByCarCode: Invalid code', () => {
    const responseCopy = JSON.parse(JSON.stringify(testResponseTemplateObject)); 
    carUtils.filterByCarCode(responseCopy, 'ABC');
    expect(responseCopy.result.length).toBe(0);
});


test('Testing sort by corporate : descending order', () => {
    const responseCopy = JSON.parse(JSON.stringify(testResponseTemplateObject)); 
    carUtils.sort(responseCopy, 'corporate', 'desc');
    expect(responseCopy.result.length).toBe(4);
    expect(responseCopy.result[0].supplier).toBe("XY");
});

test('Testing sort by corporate : ascending order', () => {
    const responseCopy = JSON.parse(JSON.stringify(testResponseTemplateObject)); 
    carUtils.sort(responseCopy, 'corporate', 'asc');
    expect(responseCopy.result.length).toBe(4);
    expect(responseCopy.result[0].supplier).toBe("AB");
});


test('Testing sort by price : descending order', () => {
    const responseCopy = JSON.parse(JSON.stringify(testResponseTemplateObject)); 
    carUtils.sort(responseCopy, 'price', 'desc');
    expect(responseCopy.result.length).toBe(4);
    expect(responseCopy.result[0].supplier).toBe("MN");
});

test('Testing sort by price : ascending order', () => {
    const responseCopy = JSON.parse(JSON.stringify(testResponseTemplateObject)); 
    carUtils.sort(responseCopy, 'price', 'asc');
    expect(responseCopy.result.length).toBe(4);
    expect(responseCopy.result[0].supplier).toBe("AB");
});