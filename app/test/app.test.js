const expect = require('chai').expect
const {getTime} = require('../server.js')

describe('getTime()', () => {
  it('should get current time info for location',  async () => {
    const location = "London"  
    const res = await getTime(location)
    expect(res).to.exist
    expect(res.data.request[0].query).to.equal(location)
  });
});
    
