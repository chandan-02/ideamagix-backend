const mongoose = require("mongoose");

const courseScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        batches: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "batch",
        }],
       
    },
    { timestamps: true }
);

module.exports = mongoose.model("course", courseScheme);