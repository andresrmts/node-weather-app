const express = require('express');
const path = require('path');
const hbs = require('hbs');
const utils = require('./utils/utils')

// Variables

const name = 'Andres R';

// Define paths for express conf
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

//Setup handlebar engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static dir to serve
app.use(express.static(publicDir));

//Setup routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name
  })
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You need to specify an address!'
    })
  }
  utils.geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error })
    }
    utils.forecast(data, (error, data) => {
      if (error) {
        return res.send({ error })
      }
      const { forecast } = data;
      res.send({
        forecast
      })
    })
  })
});


app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Help',
    message: 'Help article not found!',
    name
  })
});

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error',
    message: 'Page not found!',
    name
  })
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})