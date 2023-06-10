const express = require("express");
const router = express.Router();

// Routes 
const lectureRouter = require('./lecture');

router.use('/lecture', lectureRouter);

module.exports = router;