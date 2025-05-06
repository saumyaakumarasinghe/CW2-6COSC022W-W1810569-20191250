const axios = require('axios');

const URL = 'https://restcountries.com/v3.1';

async function getRestCountryByName(countryName) {
  try {
    const url = `${URL}/name/${encodeURIComponent(countryName)}?fullText=true`;

    const response = await axios.get(url);
    const country = response.data[0];

    return country;
  } catch (err) {
    console.log(err.message);
    return null; // Return null if the country is not found
  }
}

async function getAllRestCountries() {
  try {
    const url = `${URL}/all`;
    const response = await axios.get(url);

    return response.data;
  } catch (err) {
    console.log(err.message);
    return null; // Return null if the request fails
  }
}

module.exports = { getRestCountryByName, getAllRestCountries };
