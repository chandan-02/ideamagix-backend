const mongoose = require("mongoose");

const lectureScheme = new mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "course",
            required: true,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        date : {
            type: Date,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("lecture", lectureScheme);