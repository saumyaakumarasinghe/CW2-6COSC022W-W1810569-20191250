const { STATUS_CODES } = require('../constants/status-code.constants');
const { ERROR_MESSAGES } = require('../constants/error.constants');
const { getRestCountryByName, getAllRestCountries } = require('../services/rest-countries.service');

async function getAllCountries(req, res) {
  try {
    const countries = await getAllRestCountries();
    console.log('countries', countries);

    if (!countries || countries.length === 0) {
      console.log(ERROR_MESSAGES.COUNTRY_NOT_FOUND);

      // If country API doesn't work, use default countries
      const defaultCountries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola'];

      console.log('defaultCountries', defaultCountries);

      return res.status(STATUS_CODES.OK).json(defaultCountries);
    }

    // Map the response to the desired format and sort alphabetically
    const payload = countries
      .map((country) => country.name?.common || 'N/A')
      .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

    res.status(STATUS_CODES.OK).json(payload);
  } catch (err) {
    console.log(err.message);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.FAILED_TO_FETCH_COUNTRIES);
  }
}

module.exports = { getAllCountries };
