require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

require('./auth');

app.use(express.urlencoded({extended: true}));

app.use(express.json());

const usersRouter = require('../entities/users/controllers');
app.use('/users', usersRouter);

const propertiesRouter = require('../entities/property/controllers');
app.use('/properties', propertiesRouter);

const errorHandler = require('../middlewares/error-handler');
app.use(errorHandler);

app.get('/images/:path', (req, res, next) => {
  const fileName = req.params.path;
  res.redirect(`${process.env.IMAGE_KIT_URL_ENDPOINT}/${fileName}`);
});

module.exports = app;
