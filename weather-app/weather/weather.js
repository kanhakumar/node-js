const request = require('request');

const API_ENDPOINT = 'http://api.openweathermap.org';
const API_KEY = 'cfe77c650fea78a8f1ea6537a43b906b';

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