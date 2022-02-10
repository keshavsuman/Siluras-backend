class MemCache {

    static hset(key, val) {
      this.memCache[key] = val;
    }
  
    static hget(key) {
      let val = null;
      if (this.memCache[key]) {
        val = this.memCache[key];
      }
      return val;
    }
  
    static hdel(set, key) {
      if (this.memCache[set] && this.memCache[set][key]) {
        delete this.memCache[set][key];
      }
    }
  
    static memCache = {};
  }
  

module.exports = MemCache;