const http = require('http');
const DarkSky = require('./dark-sky')
const darksky = new DarkSky('fb9f3a9953d9305d6b9ecdd2a909fe3a')
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  apiKey: 'nKdKSQZb22Nm984QWhTXoIC3VRDhjqK7'
};

const geocoder = NodeGeocoder(options);

const app = http.createServer((req,res) => {
    res.setHeader('Content-Type', 'application/json');
  
    geocoder.geocode(process.env.LOCATION)
    .then((data) => {
      darksky.lat(data[0].latitude).long(data[0].longitude)           
        .time('2019-01-27')         
        .get()                          
        .then((data) => {
          res.end(JSON.stringify(data));
        })
        .catch(console.log)  
    })
    .catch((err) => {
      console.log(err);
    });
  
});
app.listen(3001);