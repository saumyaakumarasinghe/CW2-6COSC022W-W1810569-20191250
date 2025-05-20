const axios = require('axios');

const URL = 'https://restcountries.com/v3.1';

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

module.exports = { getAllRestCountries };
