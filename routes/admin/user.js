const express = require('express');
const auth = require('../../middleware/apiAuth');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user');
const validate = require('../../middleware/validate');

const router = express.Router();

router.route('/').post(validate(userValidation.createUser), userController.createNewUser);
router.route('/').get(validate(userValidation.getUserQuery), userController.getAllUser);
router.route('/total').get(userController.getTotals);

router.route('/:id').put(validate(userValidation.updateUser), userController.updateUser);
router.route('/:id').delete(userController.deleteUser);

router.route('/login').post(validate(userValidation.loginUser), userController.loginUser);



module.exports = router;