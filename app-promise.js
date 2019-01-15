const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        address: {
            describe: 'Address to find Weather for',
            demand: true,
            alias: 'a',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(argv.address) + "&key=" + 'AIzaSyDMBhqVrcNNdOJHJhzHKP56EuZdypLlZt8';

axios.get(encodedURL).then((response) => {
    //console.log(response);
    if (response.data.status == "ZERO_RESULTS") {
        throw new Error('Unable to find address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;

    var WeatherUrl = `https://api.darksky.net/forecast/b0133f76f3811520f0a65dd1e276e921/${lat},${lng}`;
    return axios.get(WeatherUrl)
})
    .then((response) => {
        //console.log(response);
        console.log("Temperature",response.data.currently.temperature);
    })
    .catch((error) => {
        //console.log(error);
        if (error.code == "ETIMEDOUT" || error.code == "ENOTFOUND") {
            console.log("Unable to Connect to server");
        }
        else {
            console.log(error.message);
        }

    })