const express = require('express');
const countryController = require('../../controllers/country.controller');
const countryRouter = express.Router();

countryRouter.get('/', countryController.getAllCountries);

module.exports = countryRouter;
