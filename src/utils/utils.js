const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZ2V0YW5kcmVzc2VkIiwiYSI6ImNrbW9sbTRnNzI2M2oyd3F1OHRrOXh1cXAifQ.um7DTIh3sEA3dS-XY77vFw&limit=1`;
  request({ url, json: true }, (error, {body}) => {
    const { features } = body;
    if (error) {
      callback("Unable to connect to location services");
      return;
    }
    if (features.length < 1) {
      callback("Unable to find location. Try again!");
      return;
    }
    const lat = features[0].center[1];
    const long = features[0].center[0];
    callback(undefined, { lat, long });
  });
};

const forecast = (coordinates, callback) => {
  const {lat, long} = coordinates;
  const url = `http://api.weatherstack.com/current?access_key=df802d4e7ae66a7ae0eff1444fc9575a&query=${lat},${long}`;
  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services');
      return;
    }
    if (body.error) {
      callback('Unable to find location! Please try again!');
      return;
    }
    const { current, location } = body;
    callback(undefined, {
      forecast: `It is currently ${current.weather_descriptions[0]} and the temperature is ${current.temperature}c in ${location.name}, ${location.country}. It feels like ${current.feelslike}c`
    });
  })
}

module.exports = { geocode, forecast };
