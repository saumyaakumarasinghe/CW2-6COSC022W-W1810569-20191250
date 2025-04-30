const express = require('express');
const countryService = require('../../services/country.service');
const countryRoutes = express.Router();

countryRoutes.get('/:countryName', countryService.getCountryByName);

countryRoutes.get('/', countryService.getAllCountries);

module.exports = countryRoutes;
