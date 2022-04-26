const path = require('path')  //core node module (no need to install)
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectorPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectorPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Klaus Kunze'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Klaus Kunze'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Klaus Kunze',
        helpText: 'This is really helpful'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { //default {} is provided so the app does not crash.
        if (error) {
            return res.send({ error })
        } 
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send( { error })
                }

            res.send({
            location,
            forecast: forecastData,
            address: req.query.address

             })
           
        })
    })
}
    
    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({            //code ends here because of return, if our error is detected
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})


//Other 404 pages

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Klaus Kunze',
        errorMessage: 'Help article not found'
    })
})

//This function has to come last before the app/listen() function

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Klaus Kunze',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

