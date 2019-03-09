const express = require('express')
const app = express()
const port = 3001
const DarkSky = require('./dark-sky')
const darksky = new DarkSky('fb9f3a9953d9305d6b9ecdd2a909fe3a')
const NodeGeocoder = require('node-geocoder');

// const options = {
//   provider: 'mapquest',
//   apiKey: 'nKdKSQZb22Nm984QWhTXoIC3VRDhjqK7'
// }; 

// const options = {
//   provider: 'opencage',
//   apiKey: '0b675c47de9c4488b400828b76afb085'
// }; 

const options = {
  provider: 'google',
  apiKey: 'AIzaSyCDY0eJpkeOTx-kIqGtYzDPGAPCcwlavqo'
}; 

const geocoder = NodeGeocoder(options);

app.get('/data', (req, res) => {
  let location = req.query.location;
  let countryCode = req.query.countryCode;
  let date = req.query.date;

  geocoder.geocode({address: location, country: countryCode})
    .then((data) => {
      darksky.lat(data[0].latitude).long(data[0].longitude)           
        .time(date)         
        .get()                          
        .then((darkskyData) => {
          let responseData = {
            ...darkskyData,
            location: data[0].city,
            countryCode: data[0].countryCode
          }
          res.send(JSON.stringify(responseData));
        })
        .catch(console.log)  
    })
    .catch((err) => {
      console.log(err);
    });
})

app.get('/currentLocation', (req, res) => {
  let lat = req.query.lat;
  let long = req.query.long;
  let date = req.query.date;

  geocoder.reverse({lat:lat, lon:long})
    .then((data) => {
      darksky.lat(lat).long(long) 
         .time(date)
         .get()                          
         .then((darkskyData) => {
           let responseData = {
             ...darkskyData,
             location: data[0].city,
             countryCode: data[0].countryCode
           }
           res.send(JSON.stringify(responseData));
          })
          .catch(console.log) 
    })
    .catch((err) => {
      console.log(err);
    });
})

app.listen(port, () => console.log(`App listening on port ${port}!`))