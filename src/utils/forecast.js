const request = require('request')

const forecast = ((latitude, longitude,callback) => {
    const url2 = 'https://api.weatherstack.com/current?access_key=75a6f63bbb4b4ad001a621ebf3742c97&query='+latitude+','+longitude+'&units=f'
    const url = 'https://api.positionstack.com/v1/reverse?access_key=42446958b89bf41c602e59fa5d5d6e5a&query='+latitude+','+longitude
    const url3 = 'https://api.weatherbit.io/v2.0/current?lat='+latitude+'&lon='+longitude+'&key=787a3e01b9e34cb280e6d71cbc37e2de&include=minutely'


    request({url:url3,json:true}, (error,response) => {
        //console.log(response.body.data[0].weather[0].description); 
        
        if(error){
            callback('Unable to connect to forecast services')
            console.log(error)
        }else if(response.body.error){
            
            callback('Unable to locate')
        }else{
            console.log(response.body.data);
            callback(undefined,'It is currently '+response.body.data[0].weather.description+
                ' in '+response.body.data[0].city_name)
        }
    })
})
module.exports = forecast