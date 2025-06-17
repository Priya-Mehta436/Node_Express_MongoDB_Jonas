const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//1)Middlewares
app.use(morgan('dev'));
app.use(express.json());


app.use((req, res, next) => {
     console.log('Hello from the middleware 👋');
    next();
});

app.use((req, res, next) => { 
    req.requestTime = new Date().toISOString();
    next();
});

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) Route Handlers

const getAllTours = (req,res) =>{
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime, 
        results: tours.length,
        data: {
            tours
        }
    });
}
 
const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
   
    const tour = tours.find(el => el.id === id)
   

    // if (id > tours.length) { 
    if (!tour) { 
     return res.status(404).json({ 
        status: 'fail',
        message: 'Invalid ID' 
    });
}


    res.status(200).json({
        status: 'success',
        results: tours.length, 
        data: {
            tour
        }
    });
}
 const createTour = (req, res) => {
    /*console.log(req.body);*/

    const newId = [tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);
   


     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })

}

const updateTour = (req, res) => {

    if (req. params.id*1 > tours.length) { 
     return res.status(404).json({ 
        status: 'fail',
        message: 'Invalid ID' 
    });
}

    res.status(200).json({
        status: 'sucess',
        data: null
    });

}

const deleteTour = (req, res) => {

    if (req. params.id*1 > tours.length) { 
     return res.status(404).json({ 
        status: 'fail',
        message: 'Invalid ID' 
    });
}

    res.status(204).json({
        status: 'sucess',
        data: null
    });

};

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};


const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};


const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};


const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};


//3)Routes

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour) 
    .patch(updateTour)
    .delete(deleteTour);

app
    .route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser)


app
    .route('/api/v1/tours/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)


// 4)Start Server
const port = 3000;
app.listen(port,() =>{
    console.log(`App running on port ${port}... `);
})

