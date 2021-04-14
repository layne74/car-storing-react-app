const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3001;


// UTILITY FUNCTIONS ==========================================================================> 
// Gets car data, and creates the file if it doesn't exist
function getCars(){
    try {
        const content = fs.readFileSync('cars.json')
        return JSON.parse(content)
    }catch(e){ // file non-existent
        fs.writeFileSync('cars.json', '[]')
        return []
    }
}

// Adds a new car
function addCar(name){
    const cars = getCars()
    cars.push(name)
    fs.writeFileSync('cars.json', JSON.stringify(cars))
}

// Deletes a car
function deleteCar( id ){
    const cars = getCars();
    const index = parseInt(id);
    // Alters the object in the array at position i
    cars.splice(index, 1);
    fs.writeFileSync('cars.json', JSON.stringify(cars));
}

// Edits a car
function editCar( index, make, model, seats ){
    const cars = getCars();
    // -1 corrects for index difference
    //const index = (parseInt(id));
    // Alters the object.seats in the array at position i
    cars[index].make = make;
    cars[index].model = model;
    cars[index].seats = seats;
    fs.writeFileSync('cars.json', JSON.stringify(cars));
}

// Checks if a car exists
function carExists( n ){
    const cars = getCars();
    // Returns a object with a boolean and a index
    let exist = {exists:false, index: null};
    for (let i = 0; i < cars.length; i++) {
        if ( cars[i].id === n)  {
            exist.exists = true
            exist.index = i
            console.log("Car Found")
        }
    }
    return exist;
}

// UTILITY FUNCTIONS END =======================================================================> 

// returns the json file with all the cars
app.get('/api', (req, resp)=>{
    const cars = getCars()
    resp.send(cars);
})

// create new car
app.post('/cars/add', (req, resp)=>{
    const cars = getCars()
    //const carId = req.body.id;
    const carId = ((cars.length === 0 ) ? 1 : cars[cars.length - 1].id + 1);
    
    // Checks if the car exists
    let exist = carExists(parseInt(carId));
    if ( exist.exists ) {
       resp.send(`Car with id = ${carId} already exists.`)
    }else {
        // New car object
        /*let carObj = {"id": parseInt(carId), "make": req.query.make,"model": req.query.model,"seats": parseInt(req.query.seats)};*/
        let carObj = {"id": parseInt(carId), "make": req.body.make,"model": req.body.model,"seats": parseInt(req.body.seats), "img": req.body.img};
        
        console.log(req.body)
        addCar(carObj)
        resp.send("Car added.");
    } 

})

// delete car
app.delete('/cars/delete', (req, resp) => {
    const carId = req.body.id;
    // Checks if the car exists
    let exist = carExists(parseInt(carId));
    if ( exist.exists ) {
        // Calls the function that delets car
        deleteCar(exist.index);
        resp.send("Car deleted.");
     }else {
        resp.send(`Car with id = ${req.body.id} does not exist.`)
        //resp.status(404).send('Sorry, cant find that');
     }
})

// Update car info
app.put('/cars/edit', (req, resp)=>{
    const carId = req.body.id;
    const make = req.body.make;
    const model = req.body.model;
    const seats = parseInt(req.body.seats);
    console.log(carId, make, model, seats)
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
    app.use(express.static(path.join(__dirname, 'react-app/build')));
    app.get('*',(req,res)=> {
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
    app.get('*', function(req, res) {
        let err = new Error('Page Not Found');
        err.statusCode = 404;
        res.send(err)
    });
}

// Port listener
app.listen(port)
