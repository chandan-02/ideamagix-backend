const express = require('express');
const auth = require('../../middleware/apiAuth');
const lectureValidation = require('../../validations/lecture.validation');
const lectureController = require('../../controllers/lecture');
const validate = require('../../middleware/validate');

const router = express.Router();

router.route('/:id').get(validate(lectureValidation.getByInstructor), lectureController.getLectureByInstructor);

module.exports = router;