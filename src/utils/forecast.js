const request = require("request");

const forecast = (lat, long, callback) => {
    const type = "current";
    const KEY = process.env.FORECAST_KEY;
    const LATITUDE = lat;
    const LONGITUDE = long;
    const QUERY = `${LATITUDE},${LONGITUDE}`;
    const UNITS = "f";
    const url = `http://api.weatherstack.com/${type}?access_key=${KEY}&query=${QUERY}&units=${UNITS}`;

    request({ url: url, json: true }, (error, res) => {

        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (res.body.error) {
            callback("Unable to find the location!", undefined);
        } else {
            callback(undefined, {
                degrees: res.body.current.temperature,
                chance: res.body.current.feelslike,
                skyType: res.body.current.weather_descriptions[0],
            });
        }
    });
}

module.exports = forecast;