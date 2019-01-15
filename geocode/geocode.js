const request = require('request');

geocodeAddress = (address,callback) => {
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + "&key=" + 'AIzaSyDMBhqVrcNNdOJHJhzHKP56EuZdypLlZt8',
        json: true
    }, (error, response, body) => {
        //console.log(JSON.stringify(body,undefined,2));
        if (error) {
            callback("Unable to connect to google server");
        }
        else if (body.status === "OVER_QUERY_LIMIT") {
            callback(body.error_message);
        } else if (body.status === "ZERO_RESULTS") {
            callback("Unable to find that address..")
        }
        else if (body.status === "OK") {
            callback(undefined,JSON.stringify({
                Address:body.results[0].formatted_address,
                Latitude:body.results[0].geometry.location.lat,
                Longitude:body.results[0].geometry.location.lng
            },undefined,2))
            console.log(`Address :${body.results[0].formatted_address}`);
            console.log("Latitude:", body.results[0].geometry.location.lat);
            console.log("Longitude:", body.results[0].geometry.location.lng);
        }

    })
}

module.exports = {
    geocodeAddress
}