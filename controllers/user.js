const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const moment = require('moment');
const { generateToken, } = require('../utils/token')

//models
const { User, Batch, Course, Lecture } = require('../models/index');

//controllers

exports.createNewUser = asyncHandler(async (req, res) => {
    try {
        // create user
        const userCreation = await User.create(req.body);
        return res.status(201).json({ success: true, data: userCreation });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
})

exports.getAllUser = asyncHandler(async (req, res) => {
    const { select, page, limit } = req.query;
    try {
        const userData = await User.find({}).select(select?.split(",")).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 })
        return res.status(200).json({ success: true, data: userData })
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
})

exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await User.deleteOne({ _id: id });
        return res.status(200).json({ success: true, data: "User deleted successfully" })
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
})

exports.updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const UserUser = await User.findOne({ _id: id });
        Object.assign(UserUser, req.body);
        await UserUser.save();
        return res.status(201).json({ success: true, data: UserUser });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
})

exports.getTotals = asyncHandler(async (req, res) => {
    try {
        let totalAdmin = await User.countDocuments({ role: 'admin' });
        let totalInstructor = await User.countDocuments({ role: 'instructor' });
        let totalBatch = await Batch.countDocuments({});
        let totalCourse = await Course.countDocuments({});
        let totalLectures = await Lecture.countDocuments({});

        let data = { totalAdmin, totalInstructor, totalBatch, totalCourse, totalLectures }
        return res.status(200).json({ success: true, data: data });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
})
exports.loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    try {
        const userData = await User.findOne({ username });
        if (!userData || !(await userData.isPasswordMatch(password))) {
            return res.status(400).json({ success: false, message: "Incorrect Username or Password" });
        }
        const expires = moment().add(30, 'days');
        const token = generateToken(userData._id, expires);
        return res.status(200).json({ success: true, data: userData, meta: { jwt: token } });
    } catch (error) {
        throw new ApiError(`Server error :${error}`, httpStatus.INTERNAL_SERVER_ERROR);
    }
})

