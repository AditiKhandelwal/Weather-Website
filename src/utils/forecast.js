const request =  require('postman-request')

const forecast = (latitude,longitude, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=45bc458a5f0173107b5c5f9612e6ceda&query=${latitude},${longitude}`
   
  // setting json:true will automatically convert the body from string to object
  request({url:url, json:true},  (error, {body}) =>{ // response is replaced with {body} by destructuring object. We are accessing only body property of response object
    if(error){
      callback('Unable to connect to weather services!')
    }
    else if(body.error)
    {
      callback('Unable to find location!')
    }
    else{
      callback(undefined,body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degress out but it feels like ' + body.current.feelslike + ' degree')
    }
     
  });
  }

  module.exports = forecast