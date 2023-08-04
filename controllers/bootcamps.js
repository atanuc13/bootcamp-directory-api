// @desc        get all bootcamps
// @routes      /api/v1/bootcamps/
// @access      public
exports.getBootcamps = (req, resp, next) => {
    resp.status(200).send({ sucess: true, msg: 'show all bootcamps' });
};


// @desc        get a bootcamp by id
// @routes      /api/v1/bootcamps/:id
// @access      public
exports.getBootcamp = (req, resp, next) => {
    resp.status(200).send({ sucess: true, msg: `show bootcamps ${req.params.id}` });
};


// @desc        create a bootcamp
// @routes      /api/v1/bootcamps/
// @access      private
exports.createBootcamp = (req, resp, next) => {
    resp.status(201).send({ sucess: true, msg: 'created new bootcamp' });
};


// @desc        update a bootcamp by id
// @routes      /api/v1/bootcamps/:id
// @access      private
exports.updateBootcamp = (req, resp, next) => {
    resp.status(200).send({ sucess: true, msg: `updated bootcamps ${req.params.id}` });
};


// @desc        delete a bootcamp by id
// @routes      /api/v1/bootcamps/:id
// @access      private
exports.deleteBootcamp = (req, resp, next) => {
    resp.status(200).send({ sucess: true, msg: `deleted bootcamp ${req.params.id}` });
};