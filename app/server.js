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
    console.log(weatherData)
}

getInfoForLocation([{name:'new york', postal_code:'10013'}, {name:'london', postal_code:'WC2N 5DU'}])

module.exports = {
    getInfoForLocation,
    getWeatherData,
    getTime
}
