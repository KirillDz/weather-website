const request = require('request');


const forecast = (longitude, letitude, callback) => {
  const url = `https://api.darksky.net/forecast/65a514b89e9b289e5aac4ed235d2b897/${longitude},${letitude}?units=si`;
  request({
    url,
    json: true
  }, (error, {
    body
  }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (body.error) {
      console.log('Unable to find location', undefined);
    } else {
      callback(undefined,
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} chance of rain.`);
    }
  });
};

module.exports = forecast;