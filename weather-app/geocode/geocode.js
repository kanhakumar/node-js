const request = require('request');

const API_KEY = '2d292f1c2870e69bf13b114ff3a51e32';
// const LIMIT = 1;

var geocodeAddress = (address, callback) => {
    const QUERY = encodeURIComponent(address);

    request({
        url: `http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${QUERY}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Server');
            // console.log('Unable to connect to Server');
            // process.exit(1);
        }
        else if (response.statusCode === 200) {
            if (!body.data.length) {
                callback('Unable to find that address');
                // console.log('Unable to find that address');
            } else {
                callback(undefined, {
                    address: body.data[0].name,
                    latitude: body.data[0].latitude,
                    longitude: body.data[0].longitude
                })
                // console.log(`Address: ${body.data[0].name}`);
                // console.log(`Laitude: ${body.data[0].latitude}`);
                // console.log(`Longitude: ${body.data[0].longitude}`);
            }
        } else {
            callback(undefined, {
                statusCode:response.statusCode,
                statusMessage:response.statusMessage,
                code:body.error.code,
                message:body.error.message
            })
            // console.log(`Error ${response.statusCode} : ${response.statusMessage}`);
            // console.log(`Code: ${body.error.code}`);
            // console.log(`Message: ${body.error.message}`);
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;