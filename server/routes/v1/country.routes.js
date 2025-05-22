const express = require('express');
const countryController = require('../../controllers/country.controller');
const countryRoutes = express.Router();

countryRoutes.get('/', countryController.getAllCountries);

module.exports = countryRoutes;
