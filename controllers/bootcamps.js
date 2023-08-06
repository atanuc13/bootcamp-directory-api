const BootCamp = require('../models/bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/bootcamp');


// @desc        get all bootcamps
// @routes      GET /api/v1/bootcamps/
// @access      public
exports.getBootcamps = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults);
});


// @desc        get a bootcamp by id
// @routes      GET /api/v1/bootcamps/:id
// @access      public
exports.getBootcamp = asyncHandler(async(req, resp, next) => {
    const bootcamp = await BootCamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    resp.status(200).send({
        sucess: true,
        data: bootcamp
    });
});


// @desc        create a bootcamp
// @routes      POST /api/v1/bootcamps/
// @access      private
exports.createBootcamp = asyncHandler(async(req, resp, next) => {
    const bootcamp = await BootCamp.create(req.body);

    resp.status(201).send({
        sucess: true,
        data: bootcamp
    });
});


// @desc        update a bootcamp by id
// @routes      PUT /api/v1/bootcamps/:id
// @access      private
exports.updateBootcamp = asyncHandler(async(req, resp, next) => {
    const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    resp.status(200).send({
        sucess: true,
        data: bootcamp
    });
});


// @desc        delete a bootcamp by id
// @routes      DELETE /api/v1/bootcamps/:id
// @access      private
exports.deleteBootcamp = asyncHandler(async(req, resp, next) => {
    const bootcamp = await BootCamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    bootcamp.remove();

    resp.status(200).send({
        sucess: true,
        data: bootcamp
    });
});


// @desc        get bootcamp with in a radius
// @routes      GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access      private
exports.getBootcampsInRadius = asyncHandler(async(req, resp, next) => {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: {
                $centerSphere: [
                    [lng, lat], radius
                ]
            }
        }
    });

    resp.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
});