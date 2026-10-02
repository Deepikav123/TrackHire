const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        // required: true,
        enum: ["upcoming", "completed", "failed"]
    }
})

const applicationSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            required: true,
            trim: true
        },
        jobtype: {
            type: String,
            trim: true
        },
        location: {
            type: String,
            trim: true
        },
        applicationDate: {
            type: String,
            trim: true
        },
        applicationTime: {
            type: String,
            trim: true
        },
        link: {
            type: String,
            trim: true
        },
        salary: {
            type: String,
            trim: true
        },
        notes: {
            type: String,
            trim: true
        },
        stage: [stageSchema]
    }
)
const applicationModel = mongoose.model("Applications", applicationSchema);

module.exports=applicationModel;