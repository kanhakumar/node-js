const request = require('request');

const KEY = require('../constants/constants');

const API_ENDPOINT = 'http://api.openweathermap.org';
const API_KEY = KEY.API_KEY_OW;

var getWeather = (lat, lon, callback) => {
    request({
        url: `${API_ENDPOINT}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to server');
        } else if (body.cod === 200) {
            callback(undefined,{
                temperature:body.main.temp,
                status:body.weather[0].main,
                description:body.weather[0].description
            })
        } else {
            callback(undefined, {
                statusCode:response.statusCode,
                statusMessage:response.statusMessage,
                code:body.cod,
                message:body.message
            })
        }
    });
};

module.exports.getWeather = getWeather;