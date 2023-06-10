const express = require('express');
const auth = require('../../middleware/apiAuth');
const courseValidation = require('../../validations/course.validation');
const courseController = require('../../controllers/course');
const validate = require('../../middleware/validate');

const router = express.Router();

router.route('/').post(validate(courseValidation.createCourse), courseController.createCourse);
router.route('/').get(validate(courseValidation.getAllCourse), courseController.getAllCourse);

router.route('/:id').put(validate(courseValidation.updateCourse), courseController.updateCourse);
router.route('/:id').delete(validate(courseValidation.deleteCourse), courseController.deleteCourse);

module.exports = router;