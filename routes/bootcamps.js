const express = require("express");
const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius, bootcampPhotoUpload } = require('../controllers/bootcamps');
const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const Bootcamp = require('../models/bootcamp');


// Include other resource routers
const courseRouter = require('./courses');


// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
    .route('/')
    .get(advancedResults(Bootcamp), getBootcamps)
    .post(createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

router
    .route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);


router
    .route('/:id/photo')
    .put(bootcampPhotoUpload);


module.exports = router;