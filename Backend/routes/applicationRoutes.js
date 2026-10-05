// const authMiddleware=require("../middleware/authMiddleware")
const express=require("express");
const router= express.Router();
const applicationController=require("../controllers/applicationController")

router.get('/', applicationController.getApplications)

router.get('/:id',applicationController.getApplication);

router.post('/',applicationController.createApplication);

router.put('/:id',applicationController.updateApplication);

router.delete('/:id',applicationController.deleteApplication);

module.exports= router;