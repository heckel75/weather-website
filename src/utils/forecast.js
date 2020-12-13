const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ad877b3bffd37ef6f1c70b15556d10bd&query=' + latitude + ',' + longitude +'&'
    console.log(url)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback ('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback ('Unable to find location. Try another search', undefined)
        } else {
            callback (undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels Like " + body.current.feelslike + " with a humidity of " + body.current.humidity + "%."
            )
        
    }
})

}

module.exports = forecast

