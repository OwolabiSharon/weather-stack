const request = require('postman-request');


const geocode = (address, callback) => {
  const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2hhcm9ub3dvbGFiaSIsImEiOiJja3Q1OXd5YW4wNmprMnVwZ2l6aDdrbnpzIn0.QWCmfu6aVUOX4LJU7wf7jQ&"


  request({ url:geocodeUrl, json: true}, (error,response) =>{
    if (error) {
      callback("unable to link with api");
    } else if (response.body.features.length === 0) {
      callback("your location doesng exist");

    }else {
      const longitude = response.body.features[0].geometry.coordinates[0];
      const latitude = response.body.features[0].geometry.coordinates[1];
      const location = response.body.features[0].place_name;
      callback(undefined ,{
        'longitude':longitude,'latitude': latitude,'location':location}
      );
    }

  })
}


module.exports = geocode
