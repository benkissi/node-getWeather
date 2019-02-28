const expect = require('chai').expect
const {getTime, getWeatherData} = require('../server.js')

describe('getTime()', () => {
  it('should get current time info for location',  async () => {
    const location = "London"  
    const res = await getTime(location)
    expect(res).to.exist
    expect(res.data.request[0].query).to.equal(location)
  });
});

describe('getWeather()', () => {
    it('should get current weather info for location',  async () => {
      const location = "London"
      const res = await getWeatherData(location)
      expect(res).to.exist
      expect(res.data.current_condition[0].temp_C).to.be.a('string')
    });
  });
    
