const express = require('express')

const router = express.Router()
const jobController = require("../controllers/job");
const auth = require('../middlewares/auth');

router.post('/create-job', auth, jobController.createJob)

router.get('/get-job', auth, jobController.getJob)

router.patch("/update-job/:id", auth, jobController.updateJob)

router.delete("/delete-job/:id", auth, jobController.deleteJob)


// jobs tats filter

router.get('/job-stats', auth, jobController.jobStatsController)
module.exports = router;