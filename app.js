const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const forecast = require('./geocode/forecast');

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
//console.log(argv);

geocode.geocodeAddress(argv.address,(errorMessage,result) => {
    if(errorMessage){
        console.log(errorMessage);
    }
    else{
        console.log(result);
        //var result = JSON.parse(result);
        forecast.weatherForecast(JSON.parse(result),(error,res) => {
            if(error){
                console.log(error);
            }
            else{
                console.log('Its Feeling like',res);
            }
        })
        
    }
});



