const express = require(`express`)
const userController = require('./../controllers/userController')

const userRouter = express.Router();

userRouter.param('id', (req, res, next, val) =>{
    console.log(`User id is: ${val}`);
    next();
});


userRouter
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)


userRouter
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

    module.exports = userRouter;
