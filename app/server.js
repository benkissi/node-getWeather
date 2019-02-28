var axios = require('axios')

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
