const express = require("express");
const dotenv = require("dotenv");

// load env vars
dotenv.config({ path: './config/config.env' });

// load route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// mount routers
app.use('/api/v1/bootcamps', bootcamps);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));