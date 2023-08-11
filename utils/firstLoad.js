const firstLoad = (cacheFile, cb) => {
  try {
    if (fs.existsSync(cacheFile)) {
      cb(JSON.parse(fs.readFileSync(cacheFile, { encoding: "utf8" })));
    }
  } catch (err) {
    console.log(err);
    cb(undefined);
  }
};

module.exports = { firstLoad };
