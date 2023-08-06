const Bootcamp = require('../models/bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const path = require('path');


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
    const bootcamp = await Bootcamp.findById(req.params.id);

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
    const bootcamp = await Bootcamp.create(req.body);

    resp.status(201).send({
        sucess: true,
        data: bootcamp
    });
});


// @desc        update a bootcamp by id
// @routes      PUT /api/v1/bootcamps/:id
// @access      private
exports.updateBootcamp = asyncHandler(async(req, resp, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
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
    const bootcamp = await Bootcamp.findById(req.params.id);

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



// @desc      Upload photo for bootcamp
// @route     PUT /api/v1/bootcamps/:id/photo
// @access    Private
exports.bootcampPhotoUpload = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to update this bootcamp`,
                401
            )
        );
    }

    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
            new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
                400
            )
        );
    }

    // Create custom filename
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

        res.status(200).json({
            success: true,
            data: file.name
        });
    });
});