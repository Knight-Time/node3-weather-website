const request = require('request')
const geocode = ((address,callback) => {
    const url = 'https://api.positionstack.com/v1/forward?access_key=42446958b89bf41c602e59fa5d5d6e5a&query='+encodeURIComponent(address)

    request({url:url,json:true}, (error,response) =>{
        console.log(response.body.data);
        if(error){
            callback('Unable to connect to location services')
        } else if( typeof response.body.data === 'undefined'){
            callback('Unable to get location data. Try again')
        } else{
            callback(undefined,{
                latitude:response.body.data[0].latitude,
                longitude:response.body.data[0].longitude,
                location:response.body.data[0].name
            })
        }
    })
})
module.exports = geocode