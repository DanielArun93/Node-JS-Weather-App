const request = require('request');

var geocodepromise = (address) => {

    return new Promise((resolve, reject) => {
        request({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + "&key=" + 'AIzaSyDMBhqVrcNNdOJHJhzHKP56EuZdypLlZt8',
            json: true
        }, (error, response, body) => {
            //console.log(JSON.stringify(body,undefined,2));
            if (error) {
                reject("Unable to connect to google server");
            }
            else if (body.status === "OVER_QUERY_LIMIT") {
                reject(body.error_message);
            } else if (body.status === "ZERO_RESULTS") {
                reject("Unable to find that address..")
            }
            else if (body.status === "OK") {
                resolve(JSON.stringify({
                    Address: body.results[0].formatted_address,
                    Latitude: body.results[0].geometry.location.lat,
                    Longitude: body.results[0].geometry.location.lng
                }, undefined, 2))
                console.log(`Address :${body.results[0].formatted_address}`);
                console.log("Latitude:", body.results[0].geometry.location.lat);
                console.log("Longitude:", body.results[0].geometry.location.lng);
            }

        })

    })
}

geocodepromise('hjghjg').then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})

module.exports = {
    geocodepromise
}