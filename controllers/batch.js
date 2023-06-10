const asyncHandler = require('../middleware/asyncHandler');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

//models
const { Batch } = require('../models/index');

//controllers
exports.createBatch = asyncHandler(async (req, res) => {
    try {
        const BatchData = await Batch.create(req.body);
        return res.status(httpStatus.CREATED).json({ success: true, data: BatchData });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
});

exports.updateBatch = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (!(await Batch.findOne({ _id: id }))) {
            throw new ApiError(`Batch with id ${id} not found`, httpStatus.BAD_REQUEST);
        }
        const BatchData = await Batch.findOneAndUpdate({ _id: id }, req.body, { returnOriginal: false });
        return res.status(httpStatus.CREATED).json({ success: true, data: BatchData });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
});

exports.deleteBatch = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (!(await Batch.findOne({ _id: id }))) {
            throw new ApiError(`Batch with id ${id} not found`, httpStatus.BAD_REQUEST);
        }
        await Batch.deleteOne({ _id: id });
        return res.status(httpStatus.OK).json({ success: true, data: "Batch Deleted Successfully" });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
});

exports.getAllBatch = asyncHandler(async (req, res) => {
    const { page, limit, select } = req.query;
    try {
        const BatchData = await Batch.find({}).select(select?.split(",")).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 })
        return res.status(httpStatus.OK).json({ success: true, data: BatchData });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
