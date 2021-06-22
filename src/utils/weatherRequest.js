const request = require('request');
const geocode = require('./geocode');

const weatheReq = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=fc81412f4e1da1e7b1882fa9309c7f64&query=' +
    latitude +
    ',' +
    longitude +
    '&units=m';

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect', undefined);
    } else if (response.body.error) {
      callback('Unable to connect', undefined);
    } else {
      callback(
        undefined,
        'It is currently ' +
          response.body.current.temperature +
          ' degree celcius out'
      );
    }
  });
};
module.exports = weatheReq;
