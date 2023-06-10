const asyncHandler = require('../middleware/asyncHandler');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

//models
const { Lecture } = require('../models/index');

//controllers

exports.getLectureByInstructor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { select, populate } = req.query;
    try {
        const lectureData = await Lecture.find({ instructor: id }).select(select?.split(",")).populate(populate?.split(","));;
        return res.status(httpStatus.CREATED).json({ success: true, data: lectureData });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
});

exports.createLecture = asyncHandler(async (req, res) => {
    try {
        const instructorSearch = await Lecture.findOne({ instructor: req.body.instructor, date: req.body.date });

        if (!instructorSearch) {
            const LectureData = await Lecture.create(req.body);
            return res.status(httpStatus.CREATED).json({ success: true, data: LectureData });
        }
        return res.status(400).json({ success: false, data: 'Failed: Instructor already has lecture on this day.' });

    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
});

exports.updateLecture = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (!(await Lecture.findOne({ _id: id }))) {
            throw new ApiError(`Lecture with id ${id} not found`, httpStatus.BAD_REQUEST);
        }
        const instructorSearch = await Lecture.findOne({ instructor: req.body.instructor, date: req.body.date });
        if (!instructorSearch) {
            const LectureData = await Lecture.findOneAndUpdate({ _id: id }, req.body, { returnOriginal: false });
            return res.status(httpStatus.CREATED).json({ success: true, data: LectureData });
        }
        return res.status(400).json({ success: false, data: 'Failed: Instructor already has lecture on this day.' });

    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
});

exports.deleteLecture = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (!(await Lecture.findOne({ _id: id }))) {
            throw new ApiError(`Lecture with id ${id} not found`, httpStatus.BAD_REQUEST);
        }
        await Lecture.deleteOne({ _id: id });
        return res.status(httpStatus.OK).json({ success: true, data: "Lecture Deleted Successfully" });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
});

exports.getAllLecture = asyncHandler(async (req, res) => {
    const { page, limit, select, populate } = req.query;
    try {
        const LectureData = await Lecture.find({}).select(select?.split(",")).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 }).populate(populate?.split(","));;
        return res.status(httpStatus.OK).json({ success: true, data: LectureData });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
