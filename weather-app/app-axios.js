const yargs = require('yargs');
const axios = require('axios');

const KEY = require('./constants/constants');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.a);
const API_KEY_PS = KEY.API_KEY_PS;
const geocodeUrl = `http://api.positionstack.com/v1/forward?access_key=${API_KEY_PS}&query=${encodedAddress}`;
const API_ENDPOINT = 'http://api.openweathermap.org';
const API_KEY_OW = KEY.API_KEY_OW;

axios.get(geocodeUrl).then((response) => {
    if (response.data.data.length === 0) {
        throw new Error('Unable to find that address');
    }
    var lat = response.data.data[0].latitude;
    var lon = response.data.data[0].longitude;

    var weatherUrl = `${API_ENDPOINT}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_OW}&units=metric`;
    console.log(response.data.data[0].name);
    return axios.get(weatherUrl);
}).then((response)=>{
    var temperature = response.data.main.temp;
    var apparentTemperature = response.data.main.feels_like;
    var status = response.data.weather[0].main;
    var description = response.data.weather[0].description;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
    console.log(`Status : ${status}`);
    console.log(`Description : ${description}`);

}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});