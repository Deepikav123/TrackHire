const applicationModel=require("../models/Application");
async function getApplications(req, res){
 try {
        const allApplications = await applicationModel.find();
        res.json(allApplications);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Server error"
        });
    }
}

async function getApplication(req, res){
    try {

        const id = req.params.id;
        const findApplication = await applicationModel.findById(id);
        if (!findApplication) {
            return res.status(404).json(
                { message: "Application not found" }
            )
        }
        res.json(findApplication);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Server error"
        });
    }
}

async function createApplication(req, res){
 try {

        const data = req.body;
        let applicationFilter = await applicationModel.find({
            $and: [
                { company: data.company },
                { role: data.role }
            ]
        })
        const storeFilter = applicationFilter[0];
        if (applicationFilter.length > 0) {
            applicationFilter[0].stage[applicationFilter[0].stage.length - 1].status = "completed"
            await storeFilter.save();

            await applicationModel.updateOne(
                {
                    company: applicationFilter[0].company
                },
                {
                    $push: {
                        stage: data.stage
                    }
                }
            )
            const f = await applicationModel.find({ company: data.company });
            res.json(applicationFilter[0])
        }
        else {

            const applicationCreation = await applicationModel.create(data);

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

async function updateApplication(req, res){
  try {
        const id = req.params.id;
        const applicationUpdate = await applicationModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    status: req.body.status
                }
            },
            {
                runValidators: true,
                new: true
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
        console.log(err.message);
        res.status(500).json({
            message: "Server error"
        });
    }
}


async function deleteApplication(req, res){
    try {

        const id = req.params.id;
        const applicationDeletion = await applicationModel.findByIdAndDelete(id
        )
        if (!applicationDeletion) {
            return res.status(404).json(
                { message: "Application not found" }

            )
        }
        res.json(applicationDeletion);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Server error"
        });
    }
}
module.exports= {getApplications,getApplication,createApplication,updateApplication,deleteApplication}