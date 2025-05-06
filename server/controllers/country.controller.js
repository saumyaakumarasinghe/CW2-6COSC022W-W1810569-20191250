const { STATUS_CODES } = require('../constants/status-code.constants');
const { ERROR_MESSAGES } = require('../constants/error.constants');
const { getRestCountryByName, getAllRestCountries } = require('../services/rest-countries.service');

async function getCountryByName(req, res) {
  try {
    const { countryName } = req.params;
    if (!countryName) {
      return res.status(STATUS_CODES.BAD_REQUEST).json(ERROR_MESSAGES.INVALID_REQUEST_PARAMS);
    }

    const country = await getRestCountryByName(countryName);
    if (!country) {
      return res.status(STATUS_CODES.NOT_FOUND).json(ERROR_MESSAGES.COUNTRY_NOT_FOUND);
    }

    // Map the response to the desired format
    const payload = {
      name: country.name.common,
      capital: country.capital ? country.capital[0] : 'N/A',
      currencies: country.currencies ? Object.keys(country.currencies) : [],
      languages: country.languages ? Object.values(country.languages) : [],
      flag: country.flags?.svg || country.flags?.png || 'N/A',
    };
    res.status(STATUS_CODES.OK).json(payload);
  } catch (err) {
    console.log(err.message);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.FAILED_TO_FETCH_COUNTRIES);
  }
}

async function getAllCountries(req, res) {
  try {
    const countries = await getAllRestCountries();
    if (!countries || countries.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json(ERROR_MESSAGES.COUNTRY_NOT_FOUND);
    }

    // Map the response to the desired format
    const payload = countries.map((country) => ({
      name: country.name?.common || 'N/A',
      capital: country.capital ? country.capital[0] : 'N/A',
      currencies: country.currencies ? Object.keys(country.currencies) : [],
      languages: country.languages ? Object.values(country.languages) : [],
      flag: country.flags?.svg || country.flags?.png || 'N/A',
    }));

    res.status(STATUS_CODES.OK).json(payload);
  } catch (err) {
    console.log(err.message);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.FAILED_TO_FETCH_COUNTRIES);
  }
}

module.exports = { getCountryByName, getAllCountries };
