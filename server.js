const express = require('express')
const app = express()
const port = 3001
const DarkSky = require('./dark-sky')
const darksky = new DarkSky('fb9f3a9953d9305d6b9ecdd2a909fe3a')
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  apiKey: 'nKdKSQZb22Nm984QWhTXoIC3VRDhjqK7'
};

const geocoder = NodeGeocoder(options);

app.get('/data', (req, res) => {
  let location = req.query.location;
  let date = req.query.date;
  console.log(date);
  geocoder.geocode(location)
    .then((data) => {
      darksky.lat(data[0].latitude).long(data[0].longitude)           
        .time(date)         
        .get()                          
        .then((darkskyData) => {
          let responseData = {
            ...darkskyData,
            city: data[0].city + ", " + data[0].countryCode
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