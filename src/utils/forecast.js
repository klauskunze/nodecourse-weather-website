const request = require('postman-request')


const forecast= (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=96ec9c274a66433b14551d970a910bd6&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, { body }) => {
    
        if(error) {
        callback('Unable to connect to weatherstack', undefined)
    } else if(body.error) {
        callback('Unable to find location', undefined)
    } else {
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees F. It feels like ' + body.current.feelslike + ' degrees F. The humidity is ' + body.current.humidity + ' percent')    
            
            // console.log('Weather: ' + body.current.weather_descriptions[0])
            // console.log('It is currently ' + body.current.temperature + ' degrees F')
            // console.log('It feels like ' + body.current.feelslike + ' degrees F')

        }

    })
}



module.exports = forecast
