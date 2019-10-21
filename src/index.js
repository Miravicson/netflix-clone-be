const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const configJwt = require('./utils/passport-jwt');
const config = require('./config');
const router = require('./api/route');
const logger = require('./utils/logger');

/**
 *
 * @param {*} decorators - An array of middleware decorators to setup the application. The order of the decorators matters. its typical to setup general middleware, followed by routes and the error handlers
 * @param {*} expressApp - express application instance
 */
const composeApp = (decorators, expressApp) => decorators.reduce((app, decorator) => decorator(app), expressApp);

const middlewareDecorator = app => {
  configJwt();
  app.use(cors());
  app.use(morgan('combined'));
  app.use(passport.initialize());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  return app;
};

const errorHandlerDecorator = app => {
  app.use('/', (req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route or Invalid Method For the Route';
    logger.error(`${req.method}: ${req.path}:=>  ${error.message}`);
    error.status = 404;
    next(error);
  });
  app.use('/', (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      method: req.method,
      path: req.path,
      success: false,
      error: {
        message: error.message,
      },
    });
    next();
  });

  return app;
};

const routesDecorator = app => {
  app.use('/', router);
  return app;
};

const handleGracefulShutdown = server => {
  process.on('SIGTERM', () => {
    server.close(() => {
      process.exit(0);
    });
  });
};

const app = composeApp([middlewareDecorator, routesDecorator, errorHandlerDecorator], express());
const server = app.listen(config.serverPort, () => {
  mongoose.connect(config.mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  const db = mongoose.connection;
  db.on('error', err => {
    logger.error(
      `Error connecting to DB: Ensure that you have a good network if you are connecting to a remote DB. Else run the command 'mongod' to stat the local mongodb database server`
    );
    process.exit(1);
  });
  db.once('open', () => {
    logger.info(`Application is listening on port: ${config.serverPort}`);
  });
});

handleGracefulShutdown(server);
