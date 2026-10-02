const emailExtractServices=require("../services/emailExtractionService");

async function analyzeEmail(req, res){
    try {
        // Company Name
        const data1 = req.body.sender;
        const data2 = req.body.emailText;
        const companyName1 = emailExtractServices.extractCompany1(data1);
        const companyName2 = emailExtractServices.extractCompany2(data2, companyName1)

        // Company Stage

        const companyStage = emailExtractServices.stage(data2);
        // Date and Time
        const processDateDetails = emailExtractServices.processDate(data2);

        // Role 
        const role = emailExtractServices.roleExtract(data2);

        // Job Type
        const job = emailExtractServices.jobType(data2);

        // Meeting Link
        const meetingLinkData =emailExtractServices. meetingLinkExtract(data2);
        res.json({
            company: companyName2,
            stage: companyStage,
            date: processDateDetails.date,
            time: processDateDetails.time,
            role: role,
            jobtype: job,
            meetingLink: meetingLinkData
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Server error"
        });
    }
}
   module.exports=analyzeEmail;