const request = require('request');

const geocode = (address, callback) => {
    const mapBoxApiKey = 'pk.eyJ1IjoiYWJoaXNoMDAyIiwiYSI6ImNrYTRvM3B1cTAycmozbnBkcW00a2ZveWsifQ.Q89EfWlR6NPNMWQX7XDJCg';
    const searchText = encodeURIComponent(address);
    const language = 'en';
    const mapBoxRequestUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${mapBoxApiKey}&limit=1`;
    request({ url: mapBoxRequestUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to geo location service.', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location data.', undefined)
        } else {
            const { place_name } = response.body.features[0];
            const [longitude, lattitude] = response.body.features[0].center;

            callback(undefined, {
                lattitude,
                longitude,
                location: place_name,
            });
        }
    })
}

module.exports = geocode;