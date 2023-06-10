const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const httpStatus = require('http-status')

require('dotenv').config()

const ApiError = require('./utils/ApiError');
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const Routes = require('./routes/index.js');

const app = express();

// enable cors
app.use(cors());
app.options('*', cors());


//  Logging Middleware 
app.use(morgan("dev"));

// set security HTTP headers
app.use(helmet());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// body parser setup 
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


// main route setup 
app.use("/api/v1", Routes);

// send back a 404 error for any unknown api request 
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Api Route Not found'));
});
// error handler
app.use(errorHandler);

// Express App setup 
const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(
    chalk.yellowBright.bold(
      `Server is running on PORT: ${PORT}, on mode ${process.env.NODE_ENV}.`
    )
  );
});

// Handle unhandled Promise rejections 
process.on("unhandledRejection", (err) => {
  console.log(chalk.bold.redBright(`Error: ${err.message}`));
  console.log(err);
  server.close(() => {
    console.log(
      chalk.bold.redBright("Server closed due to unhandled promise rejection")
    );
    process.exit(1);
  });
});
