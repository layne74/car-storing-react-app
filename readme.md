# REST API cars

Car api. Stores and returns information about cars

## Install 🚀️

Save contents do desired location. Open cmd in current dir. Type ```npm sinstall``` for the node_modules.

## Get Postman

You can download Postman [here](https://www.postman.com/downloads/).

Run the installer, it install pretty quickly.

## Run the API

Open cmd in current location and type ```npm start```.

## Start Postman

Open up Postman, under "Get started with postman" click on "create new".

Enter a request and change the request method, and click send. You will see the response below.

# USAGE 🎉️

## Get list of all cars 🚀️

### Request

`GET /api`

`http://localhost:3000/api`

### Response

```
Content-Type: application/json; charset=utf-8
Content-Length: 180
Date: Fri, 09 Apr 2021 20:49:51 GMT

[
   {
      "id":1,
      "make":"Mercedes-Benz",
      "model":"A-class",
      "seats":5
   },
   {
      "id":2,
      "make":"Land Rover",
      "model":"Defender 90",
      "seats":6
   }
]

```

## Add a new Car 🚀️

### Request

`POST /cars`

`http://localhost:3000/cars?id=5&make=Ford&model=Escort Mk2&seats=4`

### Response

```
Content-Type: text/html; charset=utf-8
Content-Length: 10
Date: Fri, 09 Apr 2021 20:49:51 GMT

"Car added"
```

## Delete car 🚀️

### Request

`DELETE /cars/id`

`http://localhost:3000/cars/5`

### Response

```
Content-Type: text/html; charset=utf-8
Content-Length: 12
Date: Fri, 09 Apr 2021 20:49:51 GMT

"Car deleted."
```

## Alter car model 🚀️

### Request

`PUT /cars/id/model`

`http://localhost:3000/cars/3/model/?model=Golf Mk2`

### Response

```
Content-Type: text/html; charset=utf-8
Content-Length: 26
Date: Fri, 09 Apr 2021 20:49:51 GMT

"Model changed to Golf Mk2."
```

## Alter car 🚀️

### Request

`PUT /cars/edit

`http://localhost:3000/cars/edit

```apache
requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // Fetch body
            body: JSON.stringify({ 
                id: this.state.carId, 
                make: this.state.carMake, 
                model: this.state.carModel, 
                seats: this.state.carSeats, 
            })
        };
```

### Response

```
Content-Type: text/html; charset=utf-8
Content-Length: 24
Date: Fri, 09 Apr 2021 20:49:51 GMT

"Car edited."
```

# Author

[Layne Hutchings](https://github.com/layne74)
