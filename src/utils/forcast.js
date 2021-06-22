const request = require('request');

const forcast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=fc81412f4e1da1e7b1882fa9309c7f64&query=' +
    latitude +
    ',' +
    longitude +
    '&units=m';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather forcast', undefined);
    } else if (body.error) {
      callback('Unable to connect to weather forcast Ahole', undefined);
    } else {
      callback(
        undefined,
        'It is currently ' + body.current.temperature + ' degree celcius out'
      );
    }
  });
};

module.exports = forcast;
