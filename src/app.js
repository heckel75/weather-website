const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//Setup handelbars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Heykel Jelassi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Heykel Jelassi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMsg: 'I wanna Help ya !',
        name: 'Heykel Jelassi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 
        
    geocode(req.query.address,(error,{latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

    forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
            return res.send({error})
        }

         res.send({
            location,
            forecast: forecastdata,
            address: req.query.address
        })

            })
        })  

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMsg: 'Help article not found',
        name: 'Heykel Jelassi'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMsg: 'Page not found',
        name: 'Heykel Jelassi'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})