const path = require("path");

const loadSetting = (dirName) => {
  if (!fs.existsSync(`${dirName}${path.sep}data${path.sep}`)) {
    fs.mkdirSync(`${dirName}${path.sep}data${path.sep}`, { recursive: true });
  }

  process.setting = {};
  const fileSetting = `${dirName}${path.sep}setting.json`;
  if (fs.existsSync(fileSetting)) {
    try {
      const data = fs.readFileSync(fileSetting, { encoding: "utf8" });
      process.setting = data && data?.trim() !== "" ? JSON.parse(data) : {};
    } catch (err) {
      console.logErr("SETTING", err);
      process.setting = {};
    }
  }
};

module.exports = { loadSetting };
