# cartrawler_service
#Car Trawler - Cars Service.


## What is this Service About.
    This service returns the list of cars which are available along with the car information like 
       1. The supplier of the car
       2. Car Description
       3. Cost to Rent
       4. Passenger Capacity
       5. Baggage Capacity.


## How to install this service
    You can install this service by doing the following
    1. Git clone https://github.com/amrithrajvijayan/cartrawler_service.git download the source code.
    2. Go to the folder in command line and execute 'npm install' to install dependencies.


## How to run this service
    Execute 'npm run start' to start this service.

## How to access this service.
    This service can be accessed using url http://<host>:3000/api/v1/cars.This will return all the cars available in the system.
    There are additional parameters supported by this service. They are as below.

    1. removeDup
        Type: boolean
        Required: Optional
        Acceptable values:  true or false. 
        Description: By passing true, any duplicate car models will be removed from the response.

    2. cheapestOnly
        Type: boolean
        Required: Optional
        Acceptable values:  true or false. 
        Description: By passing true, the response will be filtered to return only the cheapest of each vehicle types.

    3. sortBy
        Type: string
        Required: Optional
        Acceptable values:  corporate/price
        Description: If corporate value is passed, the response will be sorted by corporate name ( supplier ). If price is passed, the response will be sorted based on price. 

    4. sortDir
        Type: string
        Required: Optional
        Acceptable values:  desc/asc
        Description: This will decide the sort direction (ascending/descending) for the sorting. This is used in conjunction with sortBy parameter.
        If sortDir is not used, by default, the sorting will be on ascending order.
        
    5. filterByCode 
        Type: string
        Required: Optional
        Acceptable values:  Acceptable values are car codes (ECAR/CDAR/ICAR etc)
        Description: The response will be filtered based on the code which is passed.
        Eg: http://localhost:3000/api/v1/cars?filterByCode=CDAR

Example with all parameters : http://localhost:3000/api/v1/cars?removeDup=false&cheapestOnly=true&sortBy=corporate&sortDir=desc&filterByCode=