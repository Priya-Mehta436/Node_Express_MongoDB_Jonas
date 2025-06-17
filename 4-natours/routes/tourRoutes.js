const express = require(`express`);
const tourController = require('./../controllers/tourController');

const tourRouter= express.Router();

tourRouter
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

tourRouter
    .route('/:id')
    .get(tourController.getTour) 
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

    module.exports =  tourRouter; 
