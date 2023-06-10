const asyncHandler = require('../middleware/asyncHandler');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

//models
const { Course } = require('../models/index');

//controllers

exports.createCourse = asyncHandler(async (req, res) => {
    try {
        const courseData = await Course.create(req.body);
        return res.status(httpStatus.CREATED).json({ success: true, data: courseData });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
});

exports.updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (!(await Course.findOne({ _id: id }))) {
            throw new ApiError(`Course with id ${id} not found`, httpStatus.BAD_REQUEST);
        }
        const courseData = await Course.findOneAndUpdate({ _id: id }, req.body, { returnOriginal: false });
        return res.status(httpStatus.CREATED).json({ success: true, data: courseData });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
});

exports.deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (!(await Course.findOne({ _id: id }))) {
            throw new ApiError(`Course with id ${id} not found`, httpStatus.BAD_REQUEST);
        }
        await Course.deleteOne({ _id: id });
        return res.status(httpStatus.OK).json({ success: true, data: "Course Deleted Successfully" });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
});

exports.getAllCourse = asyncHandler(async (req, res) => {
    const { page, limit, select } = req.query;
    try {
        const courseData = await Course.find({}).select(select?.split(",")).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 })
        return res.status(httpStatus.OK).json({ success: true, data: courseData });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
