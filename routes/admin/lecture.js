const express = require('express');
const auth = require('../../middleware/apiAuth');
const lectureValidation = require('../../validations/lecture.validation');
const lectureController = require('../../controllers/lecture');
const validate = require('../../middleware/validate');

const router = express.Router();

router.route('/').post(validate(lectureValidation.createLecture), lectureController.createLecture);
router.route('/').get(validate(lectureValidation.getAllLecture), lectureController.getAllLecture);

router.route('/:id').put(validate(lectureValidation.updateLecture), lectureController.updateLecture);
router.route('/:id').delete(validate(lectureValidation.deleteLecture), lectureController.deleteLecture);

module.exports = router;