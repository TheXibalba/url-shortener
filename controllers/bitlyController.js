const axios = require("axios");
require("dotenv").config();
const headers = {
  Authorization: process.env.BITLY_TOKEN,
  "Content-Type": "application/json",
};
const bitlyController = async (longUrl) => {
  const obj = { long_url: longUrl };
  
  const dataString = JSON.stringify(obj);
  let temp = await axios
    .post("https://api-ssl.bitly.com/v4/shorten", dataString, {
      headers: headers,
    })
    .then((response) => {
      return response.data.link;
    })
    .catch((err) => {
      console.log(err.data);
    });
  return temp;
};

module.exports = bitlyController;
