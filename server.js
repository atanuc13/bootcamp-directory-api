const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const fileUpload = require('express-fileupload');

// load env vars
dotenv.config({ path: './config/config.env' });


// connect to database
connectDB();

// load route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();


// body parser
app.use(express.json());


// dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// File Upload
app.use(fileUpload());


// mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);


const port = process.env.PORT || 5000;

const server = app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // close the server
    server.close(() => process.exit(1));
});