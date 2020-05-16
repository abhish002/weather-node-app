const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

// init express server
const app = express();
// when deployed to herolu the port will come from process.env.PORT
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup express to use hbs to handle dynamic templates
// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// serves up static file at root path
// setup static directories to serve
app.use(express.static(publicDirPath));

// listen to requests from root url eg: localhost:3000
app.get('', (req, res) => {
    // render dynamic content
    res.render('index', {
        title: 'Weather',
        name: 'Abhish'
    });
});

// listen to requests from root/help url eg localhost:3000/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'some help text',
        name: 'Abhish'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Abhish'
    });
});

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({
            error: 'Please enter address to search.'
        })        
    }
    geocode(address, (error, { lattitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error,
            });            
        }        

        forecast(lattitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error,
                });
            }

            res.send({
                forecast,
                location,
                address
            });
        })
    });
});

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('page-not-found', {
        title: '404',
        name: 'Abhish',
        error: 'Help content not found.'
    });
});

app.get('*', (req, res) => {
    res.render('page-not-found', {
        title: '404',
        name: 'Abhish',
        error: '404 Page not found.'
    });
});

// make express server listen to localhost port 3000
app.listen(port, () => {
    console.log(`server up on port ${port}`);
});