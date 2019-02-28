var axios = require('axios')
const {asyncForEach} = require('./utilities/utilities')

const WORLD_WEATHER_ONLINE_TIME_URL= 'http://api.worldweatheronline.com/premium/v1/tz.ashx?key=6a7631aed25a4edead8173220192802&format=json'
const WORLD_WEATHER_ONLINE_WEATHER_URL= 'http://api.worldweatheronline.com/premium/v1/weather.ashx?key=6a7631aed25a4edead8173220192802&format=json'

const getWeatherData = async (location) => {

  const encodedLocation = encodeURIComponent(location)
  const requestUrl = `${WORLD_WEATHER_ONLINE_WEATHER_URL}&q=${encodedLocation}`
  const res = await axios.get(requestUrl)
  return res.data;

}

const getTime =  async (location) => {

  const encodedLocation = encodeURIComponent(location)
  const requestUrl = `${WORLD_WEATHER_ONLINE_TIME_URL}&q=${encodedLocation}`
  const res = await axios.get(requestUrl);
  return res.data

}

const displayLocationInfo = (weatherData) => {

    weatherData.forEach( data => {
        console.log(`The weather information for ${data.weather.data.request[0].query} is as follows:`)
        console.log(`
            Temperature: ${data.weather.data.current_condition[0].temp_C} degree celcius,
            It feels like: ${data.weather.data.current_condition[0].FeelsLikeC} degree celcius,
            Wind speed: ${data.weather.data.current_condition[0].windspeedKmph} km/h,
            Humidity: ${data.weather.data.current_condition[0].humidity}%,
            Cloud cover: ${data.weather.data.current_condition[0].cloudcover}%,
            Current time: ${data.timeInfo.data.time_zone[0].localtime} UTC,
            Time zone: ${data.timeInfo.data.time_zone[0].zone} 
            --------------------------------------------------------------------------
        `)
    });
}

const getInfoForLocation = async (locations) => {

    let weatherData = [];
    await asyncForEach(locations, async (location) => {
        const weather = await getWeatherData(location.name)
        const timeInfo = await getTime(location.name)
        const weatherDetails = {
            weather,
            timeInfo
        }
        weatherData.push(weatherDetails)        
    })
    displayLocationInfo(weatherData)

}

const locations = [

  {
    name:'new york', 
    postal_code:'10013'
  }, 
  {
    name:'london', 
    postal_code:'WC2N 5DU'
  }

]

getInfoForLocation(locations)

module.exports = {
    getWeatherData,
    getTime
}
