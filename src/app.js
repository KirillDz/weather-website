const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public'); // this is directory with frontend files
const viewsPath = path.join(__dirname, '../templates/views'); // this is path for dynamic html
const partialPath = path.join(__dirname, '../templates/partials') // this is the path to partials for html files


app.set('view engine', 'hbs'); //here we show express which engine we use
app.set('views', viewsPath); // here we show folder with dynamic html files
hbs.registerPartials(partialPath); // here the path that need for hbs

app.use(express.static(publicDirectoryPath)); // here we show static directory for html

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'KyrylDz'
  });
});


app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    gover: 'Goverment of Ukraine',
    name: 'Kyryl'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Kyryl'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You need to put correct address!'
    });
  }
  geocode(req.query.address, (error, {
    latitude,
    longitude,
    location
  } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term!'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found'
  })
});

app.get('*', (req, res) => { // '*' - this is all routes exept
  res.render('404', {
    errorMessage: 'Page not found',
  });
});

app.listen(3333, () => {
  console.log('Server is up on port 3333. You fukingmatherfucker!!');
});