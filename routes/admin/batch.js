const express = require('express');
const auth = require('../../middleware/apiAuth');
const batchValidation = require('../../validations/batch.validation');
const batchController = require('../../controllers/batch');
const validate = require('../../middleware/validate');

const router = express.Router();

router.route('/').post(validate(batchValidation.createBatch), batchController.createBatch);
router.route('/').get(validate(batchValidation.getAllBatch), batchController.getAllBatch);

router.route('/:id').put(validate(batchValidation.updateBatch), batchController.updateBatch);
router.route('/:id').delete(validate(batchValidation.deleteBatch), batchController.deleteBatch);

module.exports = router;