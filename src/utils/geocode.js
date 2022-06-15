const request = require("request");

const geoCode = (address, callBack) => {
    const KEY = "pk.eyJ1IjoieGVub2NvZGVjcyIsImEiOiJjbDM5cm5qMDQwY2gzM2lvNmx2MzRvaWViIn0.Cu6eEuwePlKfuU-iejEjYQ";
    const COUNTRY = address;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${COUNTRY}.json?access_token=${KEY}`;

    request({ url: url, json: true }, (error, res) => {
        if (error) {
            callBack("Unable to connect to location services", undefined);
        } else if (res.body.features.length === 0) {
            callBack("Unable to find location!", undefined);
        } else {
            callBack(undefined, {
                location: res.body.features[0].place_name,
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0]
            });
        }
    })
}

module.exports = geoCode;