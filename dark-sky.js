const request = require("request-promise")
const moment = require("moment")
const queryString = require("query-string")

class DarkSky {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.longVal = null
    this.latVal = null
    this.timeVal = null
    this.url = `https://api.darksky.net/forecast/${this.apiKey}/`;
  }
  
  _exists(val) {
    if(!val || parseFloat(val) === 0 ) {
      return false;
    }
    return true;
  }
  
  _addParams() {
    this.url += `${this.latVal},${this.longVal}`
    
    if(this.timeVal) {
      this.url += `,${this.timeVal}`
    }
    return true
  }

  long(longVal) {
    if(this._exists(longVal)){
      this.longVal = longVal
    }
    return this
  }

  lat(latVal) {
    if(this._exists(latVal)){
      this.latVal = latVal
    }
    return this
  }

  time(time) {
    if(this._exists(time)){
      this.timeVal = moment(new Date(time)).format("YYYY-MM-DDTHH:mm:ss")
    } else {
      this.timeVal = null
    }
    return this
  }
  
  async get() {
    if(!this._exists(this.latVal) || !this._exists(this.longVal)){
      console.error("Lat or long value missing!");
    }
    
    this._addParams();

    try {
        let result = await request({ url: this.url, json: true, timeout: 10000 });
        return result;
    } catch (err) {
        console.error(err);
    }
  }
}

module.exports = DarkSky