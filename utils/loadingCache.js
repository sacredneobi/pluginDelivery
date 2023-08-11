const axios = require("axios");
const fs = require("fs");

const loading = async (cacheFile, setting) => {
  const newItem = [];

  // fs.writeFileSync(cacheFile, JSON.stringify(newItem));

  return newItem;
};

const loadingCache = (time, cb) => {
  setInterval(async () => {
    console.logDebug("INTERVAL", "reloading cache");
    loading(cacheFile, defSetting).then((data) => {
      cb(data);
    });
  }, time);
};

module.exports = { loadingCache, loading };
