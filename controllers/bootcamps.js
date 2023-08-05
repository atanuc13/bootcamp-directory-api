const BootCamp = require('../models/bootcamp');
const ErrorResponse = require('../utils/errorResponse');


// @desc        get all bootcamps
// @routes      /api/v1/bootcamps/
// @access      public
exports.getBootcamps = async(req, resp, next) => {
    try {
        const bootcamps = await BootCamp.find();

        resp.status(200).send({
            sucess: true,
            count: bootcamps.length,
            data: bootcamps
        });
    } catch (err) {
        next(err);
    }
};


// @desc        get a bootcamp by id
// @routes      /api/v1/bootcamps/:id
// @access      public
exports.getBootcamp = async(req, resp, next) => {
    try {
        const bootcamp = await BootCamp.findById(req.params.id);

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        resp.status(200).send({
            sucess: true,
            data: bootcamp
        });
    } catch (err) {
        next(err);
    }
};


// @desc        create a bootcamp
// @routes      /api/v1/bootcamps/
// @access      private
exports.createBootcamp = async(req, resp, next) => {
    try {
        const bootcamp = await BootCamp.create(req.body);

        resp.status(201).send({
            sucess: true,
            data: bootcamp
        });
    } catch (err) {
        next(err);
    }
};


// @desc        update a bootcamp by id
// @routes      /api/v1/bootcamps/:id
// @access      private
exports.updateBootcamp = async(req, resp, next) => {
    try {
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
    } catch (err) {
        next(err);
    }
};


// @desc        delete a bootcamp by id
// @routes      /api/v1/bootcamps/:id
// @access      private
exports.deleteBootcamp = async(req, resp, next) => {
    try {
        const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        resp.status(200).send({
            sucess: true,
            data: bootcamp
        });
    } catch (err) {
        next(err);
    }
};