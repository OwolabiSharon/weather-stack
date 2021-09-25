const request = require('postman-request');



const forcast = (latitude,longitude, callback) => {
   const url = "http://api.weatherstack.com/current?access_key=d3c2cdfea706328c2d986c8708d7e1d2&query="+latitude+","+longitude+""


   request({ url, json: true}, (error,response) =>{
     if (error) {
       callback("unable to link with api",undefined);
     }
     else if (response.body.error) {
       callback("your location doesng exist");

     }else {
       callback(undefined ,
         response.body.current.weather_descriptions[0] + ". it is currently " + response.body.current.temperature  + " degrees out it feels like " + response.body.current.feelslike + " degrees out"
       );
     }

   })
 }


 module.exports = forcast
