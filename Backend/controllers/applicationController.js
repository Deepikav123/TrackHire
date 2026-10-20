const authMiddleware = require("../middleware/authMiddleware");
const applicationModel = require("../models/Application");
async function getApplications(req, res) {
    try {
        const allApplications = await applicationModel.find({
            user: req.user.userId
        });
        res.json(allApplications);
    }
    catch (err) {
        res.status(500).json({
            message: "Server error"
        });

    }
}

async function getApplication(req, res) {
    try {

        const id = req.params.id;
        const findApplication = await applicationModel.findOne({
            $and: [
                { user: req.user.userId },
                { _id: id }
            ]

        });
        if (!findApplication) {
            return res.status(404).json(
                { message: "Application not found" }
            )
        }
        res.json(findApplication);
    }
    catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

async function createApplication(req, res) {
    try {

        const data = req.body;
        const applicationData = {
            ...data,
            user: req.user.userId
        }
        let applicationFilter = await applicationModel.findOne({
            $and: [
                { user: applicationData.user },
                { company: applicationData.company },
                { role: applicationData.role }
            ]
        })
        if (applicationFilter) {
            applicationFilter.stage[applicationFilter.stage.length - 1].status = "Completed"
            applicationFilter.stage.push(applicationData.stage);
            await applicationFilter.save();
            res.json(applicationFilter)
        }
        else {

            const applicationCreation = await applicationModel.create(applicationData);

            res.status(201).json(applicationCreation);

        }

    }
    catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid application data",
                error: err.message
            });
        }

        res.status(500).json({
            message: "Server error"
        });
    }
}

async function updateApplication(req, res) {

    try {
        const data = req.body;
        const id = req.params.id;
        const extractedApplication = {
            ...data,
            user: req.user.userId
        };
        const applicationUpdate = await applicationModel.findOneAndUpdate(
            {
                _id: id,
                user: extractedApplication.user

            },
            {
                $set: {
                    company: extractedApplication.company,
                    role: extractedApplication.role,
                    applicationDate: extractedApplication.applicationDate,
                    location: extractedApplication.location,
                    jobtype: extractedApplication.jobtype,
                    salary: extractedApplication.salary,
                    notes: extractedApplication.notes,
                    stage: extractedApplication.stage
                }
            },
            {
                runValidators: true,
                returnDocument: 'after'
            }
        )
        if (!applicationUpdate) {
            return res.status(404).json(
                { message: "Application not found" }

            )
        }
        res.json(applicationUpdate);

    }
    catch (err) {
         if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid application data",
                error: err.message
            });
        }
        res.status(500).json({
            message: "Server error"
        });
    }
}


async function deleteApplication(req, res) {
    try {

        const id = req.params.id;
        const applicationDeletion = await applicationModel.findOneAndDelete({
            user:req.user.userId,
            _id:id
        }
        )
        if (!applicationDeletion) {
            return res.status(404).json(
                { message: "Application not found" }

            )
        }
        res.json(applicationDeletion);
    }
    catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
}
module.exports = { getApplications, getApplication, createApplication, updateApplication, deleteApplication }