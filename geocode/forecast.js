const request = require('request');
//api key for my forecast - b0133f76f3811520f0a65dd1e276e921

weatherForecast = (obj,callback) => {
    request({
        url: 'https://api.darksky.net/forecast/b0133f76f3811520f0a65dd1e276e921/' + obj.Latitude + ',' + obj.Longitude,
        json: true
    }, (error, response, body) => {
        if (response.statusCode == 200) {
            callback(undefined,body.currently.temperature);
            //callback();
        }
        else if (response.statusCode == 403) {
            callback("Unable to connect to server");
        }
        else if (response.statusCode == 400) {
            callback(body.error);
        }

    })
}

module.exports = {
    weatherForecast
}