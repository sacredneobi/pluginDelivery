const { EventEmitter } = require("events");
const fs = require("fs");

console.logSuccess = function (name, ...args) {
  console.log(`\x1b[32m[SUCCESS][PLUGIN][${name}]\x1b[0m:`, ...args);
};

console.logErr = function (name, ...args) {
  console.log(`\x1b[31m[ERROR][PLUGIN][${name}]\x1b[0m:`, ...args);
};

console.logDone = function (name, ...args) {
  console.log(`\x1b[34m[DONE][PLUGIN][${name}]\x1b[0m:`, ...args);
};

console.logDebug = function (name, ...args) {
  console.log(`----------------------------------------`);
  console.log(`\x1b[34m[DEBUG][PLUGIN][${name}]\x1b[0m:`, ...args);
  console.log(`----------------------------------------`);
};

class PluginEvent extends EventEmitter {
  _isDebug = false;

  constructor(plugin) {
    super();
    this.init(plugin);
  }

  init(plugin) {
    console.logDone("LOADING", plugin.name);
    process.on("message", async (data) => {
      const { eventId, eventName, ...other } = data;

      if (this._isDebug) {
        console.logDebug("GET DATA PLUGIN");
        console.log(JSON.stringify(data));
      }

      const event = (data) => {
        if (this._isDebug) {
          console.logDebug("SEND DATA PLUGIN");
          console.log(JSON.stringify(eventId, ...data));
        }
        process.send({ eventId, data });
      };

      this.emit(eventName, other, event);
    });

    this.on("getName", (data, event) => {
      event(plugin);
      this._isDebug = data?.isDebug ? data?.isDebug : false;
    });
  }
}

let config = {
  name: "getAddress",
  version: "-.-.-",
  description: "test module",
};

if (fs.existsSync(`${__dirname}/package.json`)) {
  try {
    config = JSON.parse(fs.readFileSync(`${__dirname}/package.json`, "utf8"));
  } catch (error) {
    console.logErr(error);
  }
}

const pluginEvent = new PluginEvent({
  name: config.caption,
  version: config.version,
  description: config.description,
  icon: config.icon,
});

const myArgs = process.argv.slice(2);

if (myArgs.includes("isSingle")) {
  console.logDone(" SINGLE ", `run as single project`);

  setTimeout(() => {
    pluginEvent.emit("getData", config?.testData, (data) => {
      console.logDone("TO MAIN");
      console.log(JSON.stringify(data, null, 2));
    });
  }, 1000);

  if (config?.testData?.interval) {
    const { time } = config?.testData?.interval;

    console.logDone("INTERVAL", `set interval to ${time} ms`);

    setInterval(() => {
      const { isSingle, ...other } = config?.testData ? config?.testData : {};
      if (isSingle) {
        pluginEvent.emit("getData", other, (data) => {
          console.log("\x1b[34m[PLUGIN][TO MAIN]:\x1b[0m");
          console.log(JSON.stringify(data, null, 2));
        });
      }
    }, time);
  }
}

module.exports = pluginEvent;
