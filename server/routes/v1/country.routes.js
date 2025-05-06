const express = require('express');
const countryController = require('../../controllers/country.controller');
const countryRoutes = express.Router();

countryRoutes.get('/:countryName', countryController.getCountryByName);

countryRoutes.get('/', countryController.getAllCountries);

module.exports = countryRoutes;
