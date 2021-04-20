
const express = require('express');
const fs = require('fs');
const APP = express();
const bodyParser = require('body-parser');
const helmet = require("helmet");
APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(bodyParser.json());
APP.use(helmet());
const PORT = process.env.PORT || 3001;

// UTILITY FUNCTIONS ==========================================================================> 
// Gets car data, and creates the file if it doesn't exist
function getCars(){
    try {
        const CONTENT = fs.readFileSync('cars.json')
        return JSON.parse(CONTENT)
    } catch(e){ // file non-existent
        fs.writeFileSync('cars.json', '[]')
        return []
    }
}

// Adds a new car
function addCar(name){
    let cars = getCars()
    cars.push(name)
    fs.writeFileSync('cars.json', JSON.stringify(cars))
}

// Deletes a car
function deleteCar(id){
    let cars = getCars();
    const INDEX = parseInt(id);
    // Alters the object in the array at position i
    cars.splice(INDEX, 1);
    fs.writeFileSync('cars.json', JSON.stringify(cars));
}

// Edits a car
function editCar( index, make, model, seats ){
    let cars = getCars();
    // -1 corrects for index difference
    //const index = (parseInt(id));
    // Alters the object.seats in the array at position "index"
    cars[index].make = make;
    cars[index].model = model;
    cars[index].seats = seats;
    fs.writeFileSync('cars.json', JSON.stringify(cars));
}

// Checks if a car exists
function carExists( position ){
    const CARS = getCars();
    // Returns a object with a boolean and a index
    let exist = {exists:false, index: null};
    for (let i = 0; i < CARS.length; i++) {
        if ( CARS[i].id === position)  {
            exist.exists = true
            exist.index = i
        }
    }
    return exist;
}

// UTILITY FUNCTIONS END =======================================================================> 

// returns the json file with all the cars
APP.get('/api', (req, resp)=>{
    const CARS = getCars()
    resp.send(CARS);
})

// create new car
APP.post('/cars/add', (req, resp)=>{
    const CARS = getCars()
    // Const carId = req.body.id;
    let carId = ((CARS.length === 0 ) ? 1 : CARS[CARS.length - 1].id + 1);
    
    // Checks if the car exists
    let exist = carExists(parseInt(carId));
    if ( exist.exists ) {
       resp.send(`Car with id = ${carId} already exists.`)
    }else {
        // New car object
        let carObj = {"id": parseInt(carId), "make": req.body.make,"model": req.body.model,"seats": parseInt(req.body.seats), "img": req.body.img};
        
        addCar(carObj)
        resp.send("Car added.");
    } 

})

// Delete car
APP.delete('/cars/delete', (req, resp) => {
    let carId = req.body.id;
    // Checks if the car exists
    let exist = carExists(parseInt(carId));
    if ( exist.exists ) {
        // Calls the function that delets car
        deleteCar(exist.index);
        resp.send("Car deleted.");
     }else {
        resp.send(`Car with id = ${req.body.id} does not exist.`)
     }
})

// Update car info
APP.put('/cars/edit', (req, resp)=>{
    let carId = req.body.id;
    let make = req.body.make;
    let model = req.body.model;
    let seats = parseInt(req.body.seats);
    
    // Checks if the car exists
    let exist = carExists(parseInt(carId));
    if ( exist.exists ) {
        // Calls the function that changes the seat value
        editCar( exist.index, make, model, seats )
        resp.send("Values adjusted")
    }else {
        resp.send(`Car with id = ${carId} does not exist.`)
    }
})

// Returns error code 
if (process.env.NODE_ENV === 'production'){
    APP.use(express.static(path.join(__dirname, 'react-app/build')));
    APP.get('*',(req,res)=> {
        if (res.status === 200) {
            res.sendFile(path.resolve(__dirname, 'react-app', 'build','index.html'));
        }else{
            let err = new Error('Page Not Found');
            err.statusCode = 404;
            res.send(err)
        }
        
    });
// DEVELOPMENT 404 
}else {
    APP.get('*', function(req, res) {
        let err = new Error('Page Not Found');
        err.statusCode = 404;
        res.send(err)
    });
}

// Port listener
APP.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
