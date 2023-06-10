const express = require("express");
const router = express.Router();

// Routes 
const userRouter = require('./user');
const courseRouter = require('./course');
const batchRouter = require('./batch');
const lectureRouter = require('./lecture');

router.use('/user', userRouter);
router.use('/course', courseRouter);
router.use('/batch', batchRouter);
router.use('/lecture', lectureRouter);

module.exports = router;