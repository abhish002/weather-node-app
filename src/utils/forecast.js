const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const accessKey = 'c4afe8ab4a16713034cf99e01c87ebe4';
    // const city = encodeURIComponent(geocode)
    const requestUrl = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}&units=f`;

    request({ url: requestUrl, json: true }, (error, response) => {
        if (error) {            
            callback('Unable to connect to weather api.', undefined);
        } else if (response.body.error) {            
            callback('Could not find location.', undefined);
        } else {
            const data = response.body.current;
            const { temperature, feelslike, weather_descriptions } = data;            
            const message = `The forecast is ${weather_descriptions[0]} with a temperature of ${temperature} degrees Farenheight and it feels like ${feelslike} degrees farenheight.`
            callback(undefined, message);
        }
    });
}

module.exports = forecast;